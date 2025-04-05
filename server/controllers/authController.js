const authService = require('../services/authService')
const fileParser = require('../utils/fileParser')
const { check, validationResult } = require('express-validator')

// Custom validation function for multipart requests
const validateMultipartData = (userData) => {
  // Create error array if validation fails
  const errors = []

  if (!userData.firstName) {
    errors.push({
      type: 'field',
      msg: 'First name is required',
      path: 'firstName',
      location: 'body'
    })
  }

  if (!userData.lastName) {
    errors.push({
      type: 'field',
      msg: 'Last name is required',
      path: 'lastName',
      location: 'body'
    })
  }

  if (!userData.email || !/^\S+@\S+\.\S+$/.test(userData.email)) {
    errors.push({
      type: 'field',
      msg: 'Please provide a valid email',
      path: 'email',
      location: 'body'
    })
  }

  if (!userData.password) {
    errors.push({
      type: 'field',
      msg: 'Password is required',
      path: 'password',
      location: 'body'
    })
  } else {
    console.log(
      `Password length: ${userData.password.length}, value: "${userData.password}"`
    )
    if (userData.password.length < 8) {
      errors.push({
        type: 'field',
        msg: 'Password must be at least 8 characters long',
        path: 'password',
        location: 'body'
      })
    }

    if (!/\d/.test(userData.password)) {
      errors.push({
        type: 'field',
        msg: 'Password must contain at least one number',
        path: 'password',
        location: 'body'
      })
    }
  }

  console.log('Validation errors:', errors)

  return errors
}

exports.register = async (req, res, next) => {
  try {
    let userData = {}
    let profileImageUrl = null

    if (
      req.headers['content-type'] &&
      req.headers['content-type'].includes('multipart/form-data')
    ) {
      const uploadResult = await fileParser(req)
      profileImageUrl = uploadResult.Location

      userData = uploadResult.fields

      console.log(
        'Raw uploadResult.fields:',
        JSON.stringify(uploadResult.fields, null, 2)
      )

      Object.keys(userData).forEach((key) => {
        if (userData[key] && typeof userData[key] === 'object') {
          if ('value' in userData[key]) {
            userData[key] = userData[key].value.toString().trim()
          } else if (Array.isArray(userData[key])) {
            userData[key] = userData[key][0]
          }
        }
        console.log(`Field ${key}:`, userData[key])
      })

      const validationErrors = validateMultipartData(userData)
      if (validationErrors.length > 0) {
        return res.status(400).json({
          success: false,
          errors: validationErrors
        })
      }
    } else {
      userData = req.body
    }

    if (profileImageUrl) {
      userData.profileImageUrl = profileImageUrl
    }

    const result = await authService.register(userData)

    res.status(201).json({
      success: true,
      token: result.token,
      data: {
        user: {
          id: result.user.id,
          firstName: result.user.firstName,
          lastName: result.user.lastName,
          email: result.user.email,
          profileImageUrl: result.user.profileImageUrl
        }
      }
    })
  } catch (error) {
    next(error)
  }
}

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body
    const result = await authService.login(email, password)

    res.status(200).json({
      success: true,
      token: result.token,
      data: {
        user: {
          id: result.user.id,
          firstName: result.user.firstName,
          lastName: result.user.lastName,
          email: result.user.email,
          role: result.user.role,
          profileImageUrl: result.user.profileImageUrl
        }
      }
    })
  } catch (error) {
    next(error)
  }
}

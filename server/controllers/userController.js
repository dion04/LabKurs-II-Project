const userService = require('../services/userService')
const fileParser = require('../utils/fileParser')

exports.getProfile = async (req, res, next) => {
  try {
    const user = await userService.getProfile(req.user.id)

    res.status(200).json({
      success: true,
      data: {
        user
      }
    })
  } catch (error) {
    next(error)
  }
}

exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await userService.getAllUsers()

    res.status(200).json({
      success: true,
      data: {
        users
      }
    })
  } catch (error) {
    next(error)
  }
}

exports.updateProfile = async (req, res, next) => {
  try {
    let userData = {}

    if (
      req.headers['content-type'] &&
      req.headers['content-type'].includes('multipart/form-data')
    ) {
      const uploadResult = await fileParser(req)

      userData = uploadResult.fields

      // Convert formidable field objects to simple values
      Object.keys(userData).forEach((key) => {
        if (
          userData[key] &&
          typeof userData[key] === 'object' &&
          'value' in userData[key]
        ) {
          userData[key] = userData[key].value
        }
      })

      // Add profile image URL if file was uploaded
      // Use the Location property and also the url property we added as a fallback
      userData.profileImageUrl = uploadResult.Location || uploadResult.url
    } else {
      userData = req.body
    }

    const user = await userService.updateUser(req.user.id, userData)

    res.status(200).json({
      success: true,
      data: {
        user
      }
    })
  } catch (error) {
    next(error)
  }
}

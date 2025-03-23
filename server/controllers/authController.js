const authService = require('../services/authService')

exports.register = async (req, res, next) => {
  try {
    const result = await authService.register(req.body)

    res.status(201).json({
      success: true,
      token: result.token,
      data: {
        user: {
          id: result.user.id,
          firstName: result.user.firstName,
          lastName: result.user.lastName,
          email: result.user.email
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
        user: result.user
      }
    })
  } catch (error) {
    next(error)
  }
}

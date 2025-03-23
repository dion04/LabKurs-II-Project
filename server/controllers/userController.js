const userService = require('../services/userService')

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

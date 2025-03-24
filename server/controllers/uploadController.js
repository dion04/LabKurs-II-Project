const fileParser = require('../utils/fileParser')

exports.uploadFile = async (req, res, next) => {
  try {
    const data = await fileParser(req)
    res.status(200).json({
      success: true,
      data
    })
  } catch (error) {
    next(error)
  }
}

const express = require('express')
const authController = require('../controllers/authController')
const {
  validate,
  userValidationRules
} = require('../middlewares/validationMiddleware')

const router = express.Router()

// Skip validation for multipart/form-data requests
router.post(
  '/register',
  (req, res, next) => {
    if (
      req.headers['content-type'] &&
      req.headers['content-type'].includes('multipart/form-data')
    ) {
      return authController.register(req, res, next)
    }
    // Only apply validation for JSON requests
    return validate(userValidationRules.register)(req, res, next)
  },
  authController.register
)

router.post('/login', validate(userValidationRules.login), authController.login)

module.exports = router

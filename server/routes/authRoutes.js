const express = require('express')
const authController = require('../controllers/authController')
const {
  validate,
  userValidationRules
} = require('../middlewares/validationMiddleware')

const router = express.Router()

router.post(
  '/register',
  validate(userValidationRules.register),
  authController.register
)

router.post('/login', validate(userValidationRules.login), authController.login)

module.exports = router

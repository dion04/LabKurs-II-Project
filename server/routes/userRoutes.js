const express = require('express')
const userController = require('../controllers/userController')

const router = express.Router()

// No need for authenticateToken middleware since ClerkExpressRequireAuth is used at the app level
router.get('/me', userController.getProfile)
router.get('/', userController.getAllUsers)
router.patch('/profile', userController.updateProfile)

module.exports = router

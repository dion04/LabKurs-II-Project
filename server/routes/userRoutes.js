const express = require('express')
const userController = require('../controllers/userController')
const { authenticateToken } = require('../middlewares/authMiddleware')

const router = express.Router()

router.use(authenticateToken)

router.get('/me', userController.getProfile)
router.get('/', userController.getAllUsers)
router.patch('/profile', userController.updateProfile)

module.exports = router

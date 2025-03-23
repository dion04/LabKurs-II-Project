// filepath: server/routes/userRoutes.js
const express = require('express')
const userController = require('../controllers/userController')
const { authenticateToken } = require('../middlewares/authMiddleware')

const router = express.Router()

router.use(authenticateToken)

router.get('/me', userController.getProfile)
router.get('/', userController.getAllUsers)

module.exports = router

const express = require('express')
const uploadController = require('../controllers/uploadController')
const { authenticateToken } = require('../middlewares/authMiddleware')

const router = express.Router()

router.post('/', authenticateToken, uploadController.uploadFile)

module.exports = router

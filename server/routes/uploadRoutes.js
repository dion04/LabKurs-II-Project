const express = require('express')
const uploadController = require('../controllers/uploadController')
const { ClerkExpressRequireAuth } = require('@clerk/clerk-sdk-node')

const router = express.Router()

// Protect upload routes with Clerk authentication
router.post('/', ClerkExpressRequireAuth(), uploadController.uploadFile)

module.exports = router

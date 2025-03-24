const express = require('express')
const authRoutes = require('./authRoutes')
const userRoutes = require('./userRoutes')
const uploadRoutes = require('./uploadRoutes')

const router = express.Router()

router.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server is healthy',
    timestamp: new Date().toISOString()
  })
})

router.use('/auth', authRoutes)
router.use('/users', userRoutes)
router.use('/upload', uploadRoutes)

module.exports = router

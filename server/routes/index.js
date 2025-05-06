const express = require('express')

const userRoutes = require('./userRoutes')
const uploadRoutes = require('./uploadRoutes')
const articleRoutes = require('./articleRoutes')

const router = express.Router()

router.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server is healthy',
    timestamp: new Date().toISOString()
  })
})

router.use('/users', userRoutes)
router.use('/upload', uploadRoutes)
router.use('/articles', articleRoutes)

module.exports = router

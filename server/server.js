require('dotenv').config()
const express = require('express')
const chalk = require('chalk')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const { errorHandler } = require('./middlewares/errorMiddleware')
const routes = require('./routes')
const fileparser = require('./utils/fileParser')
// Initialize Express app
const app = express()

// Load middleware
app.use(helmet())
app.use(cors({ origin: ['http://localhost:5173'] }))
app.use(express.json())
app.use(morgan('dev'))

// API routes
app.use('/api', routes)

// Error handling middleware
app.use(errorHandler)

// Start server
const port = process.env.PORT || 8080
const envName = chalk.greenBright(process.env.APP_ENV)
const dbName = chalk.greenBright(process.env.PGDATABASE)
const url = chalk.blueBright(`http://localhost:${port}/`)

const server = app.listen(port, () => {
  console.log(`Listening on ${url} (env: ${envName}, db: ${dbName})`)
})

// Graceful shutdown
process.once('SIGTERM', () => {
  console.log('SIGTERM received. Shutting down gracefully...')
  server.close(() => {
    console.log('Server closed.')
  })
})

module.exports = server

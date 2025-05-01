require('dotenv').config()
const express = require('express')
const chalk = require('chalk')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const { errorHandler } = require('./middlewares/errorMiddleware')
const routes = require('./routes')
const openApiSpec = require('./openapi')
const swaggerUi = require('swagger-ui-express')
const redoc = require('redoc-express')
const articleRoutes = require('./routes/articles');

const app = express()

// Middleware
app.use(cors({
  origin: ['http://localhost:5173'], // Allow React dev server
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
  credentials: true
}))

app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" }
}))

app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Routes
app.use('/api/articles', articleRoutes);
app.use('/api', routes)

// API Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openApiSpec))
app.use(
  '/docs',
  redoc({
    title: "API Documentation - The People's Voice",
    specUrl: '/api-spec',
    redocOptions: {
      theme: {
        colors: {
          primary: {
            main: '#0058B5'
          }
        }
      }
    }
  })
)

app.get('/api-spec', (req, res) => {
  res.json(openApiSpec)
})

// Error handling
app.use(errorHandler)

const port = process.env.PORT || 8080
const envName = chalk.greenBright(process.env.APP_ENV)
const dbName = chalk.greenBright(process.env.PGDATABASE)
const url = chalk.blueBright(`http://localhost:${port}/`)

const server = app.listen(port, () => {
  console.log(`Listening on ${url} (env: ${envName}, db: ${dbName})`)
  console.log(
    `API Documentation available at ${chalk.blueBright(
      `http://localhost:${port}/docs`
    )}`
  )
})

process.once('SIGTERM', () => {
  console.log('SIGTERM received. Shutting down gracefully...')
  server.close(() => {
    console.log('Server closed.')
  })
})

module.exports = server

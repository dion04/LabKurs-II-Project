const swaggerJsDoc = require('swagger-jsdoc')

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: "The People's Voice API",
      version: '1.0.0',
      description: "API documentation for The People's Voice platform",
      contact: {
        name: 'API Support',
        email: 'support@peoplesvoice.com'
      }
    },
    servers: [
      {
        url: 'http://localhost:8080/api',
        description: 'Development server'
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      }
    }
  },
  apis: ['./routes/*.js', './controllers/*.js'] // Path to the API docs
}

const openApiSpec = swaggerJsDoc(options)
module.exports = openApiSpec

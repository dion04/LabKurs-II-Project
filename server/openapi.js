const swaggerJsDoc = require('swagger-jsdoc')

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: "The People's Voice API",
      version: '1.0.0',
      description:
        "API documentation for The People's Voice platform - Article Management",
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
      schemas: {
        Article: {
          type: 'object',
          required: ['title', 'content', 'authorId', 'authorName'],
          properties: {
            id: {
              type: 'integer',
              description: 'Unique identifier for the article'
            },
            title: {
              type: 'string',
              description: 'Title of the article'
            },
            content: {
              type: 'string',
              description: 'Content of the article'
            },
            summary: {
              type: 'string',
              description: 'Short summary of the article'
            },
            imageUrl: {
              type: 'string',
              description: 'URL to the article image'
            },
            published: {
              type: 'boolean',
              description: 'Whether the article is published'
            },
            authorId: {
              type: 'string',
              description: 'Clerk user ID of the author'
            },
            authorName: {
              type: 'string',
              description: 'Name of the author'
            },
            tags: {
              type: 'array',
              items: {
                type: 'string'
              },
              description: 'Tags associated with the article'
            },
            readTime: {
              type: 'integer',
              description: 'Estimated reading time in minutes'
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'Date and time when the article was created'
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
              description: 'Date and time when the article was last updated'
            }
          }
        }
      },
      securitySchemes: {
        clerkAuth: {
          type: 'apiKey',
          in: 'header',
          name: 'Authorization',
          description: 'Clerk authentication token'
        }
      }
    },
    paths: {
      '/articles': {
        get: {
          summary: 'Get all articles',
          description: 'Retrieve a list of all articles',
          parameters: [
            {
              in: 'query',
              name: 'published',
              schema: {
                type: 'boolean'
              },
              description: 'Filter articles by published status'
            }
          ],
          responses: {
            200: {
              description: 'A list of articles',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      success: {
                        type: 'boolean'
                      },
                      count: {
                        type: 'integer'
                      },
                      data: {
                        type: 'array',
                        items: {
                          $ref: '#/components/schemas/Article'
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        },
        post: {
          summary: 'Create a new article',
          description: 'Create a new article (requires authentication)',
          security: [
            {
              clerkAuth: []
            }
          ],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  required: ['title', 'content'],
                  properties: {
                    title: {
                      type: 'string'
                    },
                    content: {
                      type: 'string'
                    },
                    summary: {
                      type: 'string'
                    },
                    imageUrl: {
                      type: 'string'
                    },
                    published: {
                      type: 'boolean'
                    },
                    tags: {
                      type: 'array',
                      items: {
                        type: 'string'
                      }
                    }
                  }
                }
              }
            }
          },
          responses: {
            201: {
              description: 'Article created successfully',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      success: {
                        type: 'boolean'
                      },
                      data: {
                        $ref: '#/components/schemas/Article'
                      }
                    }
                  }
                }
              }
            },
            400: {
              description: 'Invalid input'
            },
            401: {
              description: 'Unauthorized'
            }
          }
        }
      },
      '/articles/{id}': {
        get: {
          summary: 'Get article by ID',
          description: 'Retrieve a specific article by its ID',
          parameters: [
            {
              in: 'path',
              name: 'id',
              required: true,
              schema: {
                type: 'integer'
              },
              description: 'Article ID'
            }
          ],
          responses: {
            200: {
              description: 'Article found',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      success: {
                        type: 'boolean'
                      },
                      data: {
                        $ref: '#/components/schemas/Article'
                      }
                    }
                  }
                }
              }
            },
            404: {
              description: 'Article not found'
            }
          }
        },
        put: {
          summary: 'Update article',
          description: 'Update an existing article (requires authentication)',
          security: [
            {
              clerkAuth: []
            }
          ],
          parameters: [
            {
              in: 'path',
              name: 'id',
              required: true,
              schema: {
                type: 'integer'
              },
              description: 'Article ID'
            }
          ],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    title: {
                      type: 'string'
                    },
                    content: {
                      type: 'string'
                    },
                    summary: {
                      type: 'string'
                    },
                    imageUrl: {
                      type: 'string'
                    },
                    published: {
                      type: 'boolean'
                    },
                    tags: {
                      type: 'array',
                      items: {
                        type: 'string'
                      }
                    }
                  }
                }
              }
            }
          },
          responses: {
            200: {
              description: 'Article updated successfully',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      success: {
                        type: 'boolean'
                      },
                      data: {
                        $ref: '#/components/schemas/Article'
                      }
                    }
                  }
                }
              }
            },
            400: {
              description: 'Invalid input'
            },
            401: {
              description: 'Unauthorized'
            },
            403: {
              description: 'Forbidden - Not the author of the article'
            },
            404: {
              description: 'Article not found'
            }
          }
        },
        delete: {
          summary: 'Delete article',
          description: 'Delete an article (requires authentication)',
          security: [
            {
              clerkAuth: []
            }
          ],
          parameters: [
            {
              in: 'path',
              name: 'id',
              required: true,
              schema: {
                type: 'integer'
              },
              description: 'Article ID'
            }
          ],
          responses: {
            200: {
              description: 'Article deleted successfully'
            },
            401: {
              description: 'Unauthorized'
            },
            403: {
              description: 'Forbidden - Not the author of the article'
            },
            404: {
              description: 'Article not found'
            }
          }
        }
      },
      '/articles/me/articles': {
        get: {
          summary: 'Get my articles',
          description: 'Get all articles created by the authenticated user',
          security: [
            {
              clerkAuth: []
            }
          ],
          responses: {
            200: {
              description: "A list of the user's articles",
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      success: {
                        type: 'boolean'
                      },
                      count: {
                        type: 'integer'
                      },
                      data: {
                        type: 'array',
                        items: {
                          $ref: '#/components/schemas/Article'
                        }
                      }
                    }
                  }
                }
              }
            },
            401: {
              description: 'Unauthorized'
            }
          }
        }
      },
      '/articles/search': {
        get: {
          summary: 'Search articles',
          description: 'Search articles by query string',
          parameters: [
            {
              in: 'query',
              name: 'query',
              required: true,
              schema: {
                type: 'string'
              },
              description: 'Search query'
            }
          ],
          responses: {
            200: {
              description: 'Search results',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      success: {
                        type: 'boolean'
                      },
                      count: {
                        type: 'integer'
                      },
                      data: {
                        type: 'array',
                        items: {
                          $ref: '#/components/schemas/Article'
                        }
                      }
                    }
                  }
                }
              }
            },
            400: {
              description: 'Invalid search query'
            }
          }
        }
      },
      '/articles/tag/{tag}': {
        get: {
          summary: 'Get articles by tag',
          description: 'Retrieve articles that have a specific tag',
          parameters: [
            {
              in: 'path',
              name: 'tag',
              required: true,
              schema: {
                type: 'string'
              },
              description: 'Tag to filter by'
            }
          ],
          responses: {
            200: {
              description: 'Articles with the specified tag',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      success: {
                        type: 'boolean'
                      },
                      count: {
                        type: 'integer'
                      },
                      data: {
                        type: 'array',
                        items: {
                          $ref: '#/components/schemas/Article'
                        }
                      }
                    }
                  }
                }
              }
            },
            400: {
              description: 'Invalid tag parameter'
            }
          }
        }
      },
      '/upload': {
        post: {
          summary: 'Upload a file',
          description: 'Upload a file to S3 (requires authentication)',
          security: [
            {
              clerkAuth: []
            }
          ],
          requestBody: {
            required: true,
            content: {
              'multipart/form-data': {
                schema: {
                  type: 'object',
                  properties: {
                    file: {
                      type: 'string',
                      format: 'binary'
                    }
                  }
                }
              }
            }
          },
          responses: {
            200: {
              description: 'File uploaded successfully',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      success: {
                        type: 'boolean'
                      },
                      data: {
                        type: 'object',
                        properties: {
                          url: {
                            type: 'string',
                            description: 'URL of the uploaded file'
                          }
                        }
                      }
                    }
                  }
                }
              }
            },
            400: {
              description: 'Invalid input'
            },
            401: {
              description: 'Unauthorized'
            }
          }
        }
      }
    }
  },
  apis: ['./routes/*.js', './controllers/*.js']
}

const openApiSpec = swaggerJsDoc(options)
module.exports = openApiSpec

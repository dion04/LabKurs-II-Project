const express = require('express')
const articleController = require('../controllers/articleController')
const { validate } = require('../middlewares/validationMiddleware')
const { articleValidation } = require('../utils/validations')
const { ClerkExpressRequireAuth } = require('@clerk/clerk-sdk-node')

const router = express.Router()

// Public routes
router.get('/', articleController.getAllArticles)
router.get('/search', articleController.searchArticles)
router.get('/tag/:tag', articleController.getArticlesByTag)
router.get('/:id', articleController.getArticleById)

// Protected routes (require authentication)
router.use(ClerkExpressRequireAuth())
router.get('/me/articles', articleController.getMyArticles)
router.post('/', articleController.createArticle)
router.put(
  '/:id',

  articleController.updateArticle
)
router.delete('/:id', articleController.deleteArticle)

module.exports = router

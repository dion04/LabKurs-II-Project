const articleRepository = require('../repositories/articleRepository')
const { calculateReadTime } = require('../utils/articleUtils')

exports.getAllArticles = async (req, res, next) => {
  try {
    const { published, page = 1, limit = 10 } = req.query
    let options = {}

    // Convert string values to numbers
    const pageNumber = parseInt(page, 10)
    const limitNumber = parseInt(limit, 10)

    // If published query param exists, filter by it
    if (published !== undefined) {
      options.where = { published: published === 'true' }
    }

    const articles = await articleRepository.findAll(options)

    // Return data in the format expected by the client
    res.status(200).json({
      articles: articles,
      totalCount: articles.length,
      page: pageNumber,
      limit: limitNumber
    })
  } catch (error) {
    next(error)
  }
}

exports.getArticleById = async (req, res, next) => {
  try {
    const article = await articleRepository.findById(req.params.id)
    if (!article) {
      return res.status(404).json({
        success: false,
        message: 'Article not found'
      })
    }

    res.status(200).json({
      success: true,
      data: article
    })
  } catch (error) {
    next(error)
  }
}

exports.getMyArticles = async (req, res, next) => {
  try {
    const articles = await articleRepository.findByAuthorId(req.auth.userId)
    res.status(200).json({
      success: true,
      count: articles.length,
      data: articles
    })
  } catch (error) {
    next(error)
  }
}

exports.createArticle = async (req, res, next) => {
  try {
    // Add author data from Clerk
    const articleData = {
      ...req.body,
      authorId: req.auth.userId,
      authorName: `${req.auth.firstName || ''} ${
        req.auth.lastName || ''
      }`.trim()
    }

    // Calculate read time if content is provided
    if (articleData.content) {
      articleData.readTime = calculateReadTime(articleData.content)
    }

    const article = await articleRepository.create(articleData)
    res.status(201).json({
      success: true,
      data: article
    })
  } catch (error) {
    next(error)
  }
}

exports.updateArticle = async (req, res, next) => {
  try {
    const article = await articleRepository.findById(req.params.id)

    // Check if article exists
    if (!article) {
      return res.status(404).json({
        success: false,
        message: 'Article not found'
      })
    }

    // Check if user is the author
    if (article.authorId !== req.auth.userId) {
      return res.status(403).json({
        success: false,
        message: 'You are not authorized to update this article'
      })
    }

    // Update article data
    let updateData = req.body

    // Recalculate read time if content is changed
    if (updateData.content) {
      updateData.readTime = calculateReadTime(updateData.content)
    }

    const updatedArticle = await articleRepository.update(
      req.params.id,
      updateData
    )
    res.status(200).json({
      success: true,
      data: updatedArticle
    })
  } catch (error) {
    next(error)
  }
}

exports.deleteArticle = async (req, res, next) => {
  try {
    const article = await articleRepository.findById(req.params.id)

    // Check if article exists
    if (!article) {
      return res.status(404).json({
        success: false,
        message: 'Article not found'
      })
    }

    // Check if user is the author
    if (article.authorId !== req.auth.userId) {
      return res.status(403).json({
        success: false,
        message: 'You are not authorized to delete this article'
      })
    }

    await articleRepository.delete(req.params.id)
    res.status(200).json({
      success: true,
      data: {}
    })
  } catch (error) {
    next(error)
  }
}

exports.searchArticles = async (req, res, next) => {
  try {
    const { query } = req.query

    if (!query) {
      return res.status(400).json({
        success: false,
        message: 'Search query is required'
      })
    }

    const articles = await articleRepository.search(query)
    res.status(200).json({
      success: true,
      count: articles.length,
      data: articles
    })
  } catch (error) {
    next(error)
  }
}

exports.getArticlesByTag = async (req, res, next) => {
  try {
    const { tag } = req.params

    if (!tag) {
      return res.status(400).json({
        success: false,
        message: 'Tag parameter is required'
      })
    }

    const articles = await articleRepository.findByTag(tag)
    res.status(200).json({
      success: true,
      count: articles.length,
      data: articles
    })
  } catch (error) {
    next(error)
  }
}

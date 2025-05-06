const { Article } = require('../models')

class ArticleRepository {
  async findAll(options = {}) {
    return await Article.findAll(options)
  }

  async findById(id) {
    return await Article.findByPk(id)
  }

  async findByAuthorId(authorId) {
    return await Article.findAll({ where: { authorId } })
  }

  async create(articleData) {
    return await Article.create(articleData)
  }

  async update(id, articleData) {
    const article = await Article.findByPk(id)
    if (!article) return null
    return await article.update(articleData)
  }

  async delete(id) {
    const article = await Article.findByPk(id)
    if (!article) return false
    await article.destroy()
    return true
  }

  async search(query) {
    const { Op } = require('sequelize')
    return await Article.findAll({
      where: {
        [Op.or]: [
          { title: { [Op.iLike]: `%${query}%` } },
          { content: { [Op.iLike]: `%${query}%` } },
          { summary: { [Op.iLike]: `%${query}%` } }
        ]
      }
    })
  }

  async findByTag(tag) {
    const { Op } = require('sequelize')
    return await Article.findAll({
      where: {
        tags: { [Op.contains]: [tag] }
      }
    })
  }
}

module.exports = new ArticleRepository()

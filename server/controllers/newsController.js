const newsArticle = require('../models').newsArticle;

module.exports = {
  async list(req, res) {
    try {
      const articles = await newsArticle.findAll({
        include: ['author'],
        order: [['publishedAt', 'DESC']]
      });
      res.render('news/index', { articles });
    } catch (error) {
      res.status(500).send(error.message);
    }
  },

  async create(req, res) {
    try {
      const { title, content, imageUrl } = req.body;
      const article = await NewsArticle.create({
        title,
        content,
        imageUrl,
        authorId
      });
      res.redirect(`/news/${article.id}`);
    } catch (error) {
      res.status(500).send(error.message);
    }
  },

  async show(req, res) {
    try {
      const article = await NewsArticle.findByPk(req.params.id, {
        include: ['author']
      });
      if (!article) {
        return res.status(404).send('Article not found');
      }
      res.render('news/show', { article });
    } catch (error) {
      res.status(500).send(error.message);
    }
  }
};
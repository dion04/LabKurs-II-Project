const express = require('express');
const router = express.Router();
const { newsArticle: Article } = require('../models');
// Temporarily commenting out auth middleware
// const { authenticateToken, isAdmin } = require('../middlewares/authMiddleware');

// Test route to check model
router.get('/test', async (req, res) => {
  try {
    console.log('Article model:', Article);
    console.log('Article model name:', Article.name);
    console.log('Article table name:', Article.tableName);
    res.json({ 
      modelExists: !!Article,
      modelName: Article.name,
      tableName: Article.tableName
    });
  } catch (err) {
    console.error('Error in test route:', err);
    res.status(500).json({ error: err.message });
  }
});

// Get all articles (public)
router.get('/', async (req, res) => {
  try {
    console.log('Attempting to fetch articles...');
    const articles = await Article.findAll({ 
      order: [['createdAt', 'DESC']],
      raw: true 
    });
    
    console.log('Raw articles from database:', articles);
    console.log('Type of articles:', typeof articles);
    console.log('Is Array?', Array.isArray(articles));
    
    res.setHeader('Content-Type', 'application/json');
    res.json(articles || []);
  } catch (err) {
    console.error('Error in GET /articles:', err);
    res.status(500).json({ error: err.message });
  }
});

// Temporarily removing auth middleware for development
router.post('/', async (req, res) => {
  try {
    const { title, content, imageUrl } = req.body;
    const newArticle = await Article.create({ 
      title, 
      content, 
      imageUrl,
      authorId: 1 // Temporary default author ID
    });
    res.status(201).json(newArticle);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { title, content, imageUrl } = req.body;
    const article = await Article.findByPk(req.params.id);
    
    if (!article) {
      return res.status(404).json({ error: 'Article not found' });
    }
    
    const updated = await article.update({ title, content, imageUrl });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const article = await Article.findByPk(req.params.id);
    
    if (!article) {
      return res.status(404).json({ error: 'Article not found' });
    }
    
    await article.destroy();
    res.sendStatus(204);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

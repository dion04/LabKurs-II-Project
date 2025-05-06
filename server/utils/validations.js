const { body } = require('express-validator')

exports.articleValidation = {
  create: [
    body('title')
      .trim()
      .notEmpty()
      .withMessage('Title is required')
      .isLength({ max: 255 })
      .withMessage('Title cannot exceed 255 characters'),

    body('content').trim().notEmpty().withMessage('Content is required'),

    body('summary')
      .optional()
      .trim()
      .isLength({ max: 500 })
      .withMessage('Summary cannot exceed 500 characters'),

    body('imageUrl')
      .optional()
      .trim()
      .isURL()
      .withMessage('Image URL must be a valid URL'),

    body('published')
      .optional()
      .isBoolean()
      .withMessage('Published status must be a boolean value'),

    body('tags').optional().isArray().withMessage('Tags must be an array')
  ],

  update: [
    body('title')
      .optional()
      .trim()
      .notEmpty()
      .withMessage('Title cannot be empty')
      .isLength({ max: 255 })
      .withMessage('Title cannot exceed 255 characters'),

    body('content')
      .optional()
      .trim()
      .notEmpty()
      .withMessage('Content cannot be empty'),

    body('summary')
      .optional()
      .trim()
      .isLength({ max: 500 })
      .withMessage('Summary cannot exceed 500 characters'),

    body('imageUrl')
      .optional()
      .trim()
      .isURL()
      .withMessage('Image URL must be a valid URL'),

    body('published')
      .optional()
      .isBoolean()
      .withMessage('Published status must be a boolean value'),

    body('tags').optional().isArray().withMessage('Tags must be an array')
  ]
}

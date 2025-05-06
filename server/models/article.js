'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Article extends Model {
    static associate(models) {
      // define association here
    }
  }
  Article.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      summary: {
        type: DataTypes.STRING(500),
        allowNull: true
      },
      imageUrl: {
        type: DataTypes.STRING,
        allowNull: true
      },
      published: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      authorId: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: 'Clerk user ID'
      },
      authorName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      tags: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        defaultValue: []
      },
      readTime: {
        type: DataTypes.INTEGER,
        allowNull: true,
        comment: 'Estimated read time in minutes'
      }
    },
    {
      sequelize,
      modelName: 'Article'
    }
  )
  return Article
}

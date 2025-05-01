module.exports = (sequelize, DataTypes) => {
  const Article = sequelize.define('newsArticle', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    authorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    publishedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    }
  }, {
    tableName: 'newsArticles'
  });

  Article.associate = function(models) {
    Article.belongsTo(models.User, {
      foreignKey: 'authorId',
      as: 'author'
    });
  };

  return Article;
};

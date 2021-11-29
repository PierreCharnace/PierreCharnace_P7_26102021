'use strict';
const {Model, INTEGER} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Post.belongsTo(models.User, {
        foreignKey: {
          allowNull: false
        } 
      });
      models.Post.hasMany(models.Comment);
    }
  };
  Post.init({
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    attachment: DataTypes.STRING,
    

  }, {
    sequelize,
    modelName: 'Post',
    paranoid: true,
  });
  return Post;
};
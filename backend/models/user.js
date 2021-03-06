'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.User.hasMany(models.Post);
      models.User.hasMany(models.Comment);
    }
  };
  User.init({
    email: DataTypes.STRING,
    lastName: DataTypes.STRING,
    firstName: DataTypes.STRING,
    password: DataTypes.STRING,
    profilePictures: DataTypes.STRING,
    isAdmin: DataTypes.BOOLEAN,
    isModo: DataTypes.BOOLEAN,
    deletedAt: DataTypes.BOOLEAN,
    updatedAt: DataTypes.BOOLEAN,
    createdAt: DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: 'User',
    paranoid: true,
  });
  return User;
};
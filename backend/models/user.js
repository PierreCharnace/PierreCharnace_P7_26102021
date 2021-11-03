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
      models.User.hasMany(models.Comment)
    }
  };
  User.init({
    email: DataTypes.STRING,
    lastName: DataTypes.STRING,
    firstName: DataTypes.STRING,
    birthday: DataTypes.INTEGER,
    password: DataTypes.STRING,
    profilePictures: DataTypes.STRING,
    isEnable: DataTypes.BOOLEAN,
    isAdmin: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};
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
      models.User.hasMany(models.Post)
    }
  };
  User.init({
    user_lastName: DataTypes.STRING,
    user_firstName: DataTypes.STRING,
    user_email: DataTypes.STRING,
    user_birthday: DataTypes.INTEGER,
    user_password: DataTypes.STRING,
    user_ProfilePictures: DataTypes.STRING,
    user_isEnable: DataTypes.BOOLEAN,
    user_isAdmin: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};
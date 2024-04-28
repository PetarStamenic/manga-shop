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
    static associate({Cart,Order,Transaction}) {
      this.hasMany(Cart, {foreignKey: "userId"})
      this.hasMany(Order, {foreignKey: "userId"})
      this.hasMany(Transaction,{foreignKey:"userId"})
    }
  }
  User.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    vendor: DataTypes.INTEGER,
    mobile: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      unique: true,
      validate: {
        isEmail: {
          msg: "must be valid email"
        }
      }
    },
    addres: DataTypes.STRING,
    passwordHash: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};
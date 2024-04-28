'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({User,Cart_item}) {
      this.belongsTo(User,{foreignKey:"userId"})
      this.hasMany(Cart_item,{foreignKey:"cartId"})
    }
  }
  Cart.init({
    sessionId: DataTypes.STRING,
    token: DataTypes.STRING,
    status: DataTypes.INTEGER,
    content: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Cart',
  });
  return Cart;
};
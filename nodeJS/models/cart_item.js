'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cart_item extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Cart,Product}) {
      this.belongsTo(Cart,{foreignKey:"cartId"})
      this.hasOne(Product,{foreignKey:"productId"})
    }
  }
  Cart_item.init({
    productId: DataTypes.INTEGER,
    price: DataTypes.FLOAT,
    discount: DataTypes.FLOAT,
    quantity: DataTypes.INTEGER,
    active: DataTypes.INTEGER,
    content: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Cart_item',
  });
  return Cart_item;
};
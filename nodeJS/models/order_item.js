'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order_item extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Order,Product}) {
      this.belongsTo(Order,{foreignKey:"orderId"})
      this.hasOne(Product,{foreignKey:"productId"})
    }
  }
  Order_item.init({
    productId: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,
    content: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Order_item',
  });
  return Order_item;
};
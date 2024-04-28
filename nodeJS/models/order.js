'use strict';
const {
  Model, Transaction
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({User,Order_item,Transaction}) {
      this.belongsTo(User,{foreignKey:"userId"})
      this.hasMany(Order_item,{foreignKey:"orderId"})
      this.hasMany(Transaction,{foreignKey:"orderId"})
    }
  }
  Order.init({
    sessionId: DataTypes.STRING,
    token: DataTypes.STRING,
    status: DataTypes.INTEGER,
    subTotal: DataTypes.FLOAT,
    itemDiscount: DataTypes.FLOAT,
    tax: DataTypes.FLOAT,
    shipping: DataTypes.FLOAT,
    total: DataTypes.FLOAT,
    promo: DataTypes.STRING,
    discount: DataTypes.FLOAT,
    grandTotal: DataTypes.FLOAT,
    content: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};
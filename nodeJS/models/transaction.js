'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({User,Order}) {
      this.belongsTo(User,{foreignKey:"userId"})
      this.belongsTo(Order,{foreignKey:"orderId"})
    }
  }
  Transaction.init({
    code: DataTypes.STRING,
    type: DataTypes.INTEGER,
    mode: DataTypes.INTEGER,
    status: DataTypes.INTEGER,
    content: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Transaction',
  });
  return Transaction;
};
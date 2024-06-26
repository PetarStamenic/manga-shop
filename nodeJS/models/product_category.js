'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product_Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Product,Category}) {
      this.belongsTo(Product,{foreignKey:"productId"})
      this.belongsTo(Category,{foreignKey:"categoryId"})
    }
  }
  Product_Category.init({
  }, {
    sequelize,
    modelName: 'Product_Category',
  });
  return Product_Category;
};
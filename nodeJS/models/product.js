'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Cart_item,Order_item,Product_Category,Product_meta,Rating}) {
      this.belongsTo(Product_meta,{foreignKey:"productId"})
      this.belongsTo(Cart_item,{foreignKey:"productId"})
      this.belongsTo(Order_item,{foreignKey:"productId"})
      this.hasMany(Product_Category,{foreignKey:"productId"})
      this.hasMany(Rating,{foreignKey:"productId"})


    }
  }
  Product.init({
    userId: DataTypes.INTEGER,
    title: DataTypes.STRING,
    metaTitle: DataTypes.STRING,
    slug: DataTypes.STRING,
    summary: DataTypes.STRING,
    type: DataTypes.INTEGER,
    price: DataTypes.FLOAT,
    discount: DataTypes.FLOAT,
    quantity: DataTypes.INTEGER,
    forSale: DataTypes.INTEGER,
    publishedAt: DataTypes.DATE,
    saleStartsAt: DataTypes.DATE,
    saleEndsAt: DataTypes.DATE,
    content: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};
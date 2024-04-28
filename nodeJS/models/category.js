'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Category,Product_Category}) {
      this.belongsToMany(Category,{as: "CategoryCategory",through: "parentId"})
      this.hasMany(Product_Category,{foreignKey:"productId"})
    }
  }
  Category.init({
    title: DataTypes.STRING,
    metaTitle: DataTypes.STRING,
    slug: DataTypes.STRING,
    content: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Category',
  });
  return Category;
};
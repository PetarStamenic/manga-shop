'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Rating extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Rating,Product}) {
      this.belongsToMany(Rating,{as: "parentId",through: "RatingRating"})
      this.belongsTo(Product,{foreignKey:"productId"})
    }
  }
  Rating.init({
    title: DataTypes.STRING,
    ratingValue: DataTypes.INTEGER,
    published: DataTypes.INTEGER,
    publishedAt: DataTypes.DATE,
    content: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Rating',
  });
  return Rating;
};
'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Product_meta',[
      {id:1,productId:10,content:'something'},
      {id:2,productId:9,content:'something'},
      {id:3,productId:7,content:'something'},
      {id:4,productId:8,content:'something'},
      {id:5,productId:3,content:'something'},
      {id:6,productId:4,content:'something'},
      {id:7,productId:5,content:'something'},
      {id:8,productId:1,content:'something'},
      {id:9,productId:6,content:'something'},
      {id:10,productId:2,content:'something'}
    ],{});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};

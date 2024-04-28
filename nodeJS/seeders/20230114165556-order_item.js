'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Order_items',[
      {id:1,productId:5,orderId:1,quantity:1,content:null},
      {id:2,productId:4,orderId:1,quantity:1,content:null},
      {id:3,productId:1,orderId:2,quantity:1,content:null},
      {id:4,productId:2,orderId:3,quantity:1,content:null},
      {id:5,productId:3,orderId:3,quantity:1,content:null},
      {id:6,productId:9,orderId:4,quantity:1,content:null},
      {id:7,productId:8,orderId:4,quantity:1,content:null}
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

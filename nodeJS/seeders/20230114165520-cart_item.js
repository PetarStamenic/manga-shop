'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Cart_items',[
      {id:1,productId:5,cartId:1,price:19.99,discount:0.0,quantity:0,active:0,content:null},
      {id:2,productId:4,cartId:1,price:19.99,discount:0.0,quantity:0,active:0,content:null},
      {id:3,productId:1,cartId:2,price:19.99,discount:0.0,quantity:0,active:0,content:null},
      {id:4,productId:2,cartId:3,price:19.99,discount:0.0,quantity:0,active:0,content:null},
      {id:5,productId:3,cartId:3,price:19.99,discount:0.0,quantity:0,active:0,content:null},
      {id:6,productId:9,cartId:4,price:19.99,discount:0.0,quantity:0,active:0,content:null},
      {id:7,productId:8,cartId:4,price:19.99,discount:0.0,quantity:0,active:0,content:null},
      {id:8,productId:7,cartId:5,price:19.99,discount:0.0,quantity:0,active:0,content:null},
      {id:9,productId:10,cartId:5,price:19.99,discount:0.0,quantity:0,active:0,content:null},
      {id:10,productId:1,cartId:5,price:19.99,discount:0.0,quantity:0,active:0,content:null},
      {id:11,productId:1,cartId:5,price:19.99,discount:0.0,quantity:0,active:0,content:null}
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

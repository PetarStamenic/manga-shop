'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Ratings',[
      {id:1,productId:3,parentId:null,title:'AMAZING',ratingValue:5,published:0,content:'top quality'},
      {id:2,productId:3,parentId:1,title:'you are amazing',ratingValue:5,published:0,content:'top quality'},
      {id:3,productId:2,parentId:null,title:'sugoi',ratingValue:5,published:0,content:'top quality'},
      {id:4,productId:4,parentId:null,title:'indubibadly astaunishing',ratingValue:5,published:0,content:'top quality'},
      {id:5,productId:6,parentId:null,title:'ok',ratingValue:3,published:0,content:'top quality'},
      {id:6,productId:1,parentId:null,title:'AMAZING',ratingValue:5,published:0,content:'top quality'},
      {id:7,productId:7,parentId:null,title:'AMAZING',ratingValue:5,published:0,content:'top quality'},
      {id:8,productId:8,parentId:null,title:'AMAZING',ratingValue:5,published:0,content:'top quality'},
      {id:9,productId:10,parentId:null,title:'AMAZING',ratingValue:5,published:0,content:'top quality'},
      {id:10,productId:9,parentId:null,title:'AMAZING',ratingValue:5,published:0,content:'top quality'},
      {id:11,productId:5,parentId:null,title:'AMAZING',ratingValue:5,published:0,content:'top quality'}
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

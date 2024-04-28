'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Transactions',[
      {id:1,userId:5,orderId:5,code:'651651651',type:1,mode:1,status:2,content:null},
      {id:2,userId:4,orderId:4,code:'651644516',type:0,mode:0,status:1,content:null},
      {id:3,userId:6,orderId:3,code:'651615165',type:0,mode:0,status:1,content:null},
      {id:4,userId:2,orderId:2,code:'651657165',type:0,mode:0,status:1,content:null},
      {id:5,userId:3,orderId:1,code:'654861654',type:0,mode:0,status:1,content:null}
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

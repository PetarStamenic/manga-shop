'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Categories',[
      {id:1,parentId:null,title:'Manga',metatitle:'Manga',slug:'/manga',content:'a book'},
      {id:2,parentId:1,title:'Action',metatitle:'Manga action',slug:'/manga/action',content:'a book filled with actiom'},
      {id:3,parentId:1,title:'Horror',metatitle:'Manga horror',slug:'/manga/horror',content:'a book filled with horror'},
      {id:4,parentId:3,title:'Phychological',metatitle:'Manga horror psychological/horror/psychological',slug:'/manga',content:'a book filled with psychological horror'},
      {id:5,parentId:1,title:'comedy',metatitle:'Manga comedy',slug:'/manga/comedy',content:'a book filled with comedy'},
      {id:6,parentId:1,title:'rural',metatitle:'Manga rural',slug:'/manga/rural',content:'a book in rural setting'}
      ,
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

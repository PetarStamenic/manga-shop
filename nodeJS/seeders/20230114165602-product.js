'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Products',[
      {id:1,userId:1,title:'Higurashi When They Cry',metatitle:'Higurashi When they cry',slug:'/Higurashi+When+They+Cry',summary:'awsome',type:1,price:19.99,discount:0.0,quantity:156,forSale:0,publishedAt:'18-06-22 10:55:09 PM',saleStartsAt:null,saleEndsAt:null,content:'this is amazing'},
      {id:2,userId:1,title:'Higurashi When They Cry: Kai',metatitle:'Higurashi When they cry:kai',slug:'/Higurashi+When+They+Cry+Kai',summary:'awsome',type:1,price:19.99,discount:0.0,quantity:651,forSale:0,publishedAt:'18-06-22 10:55:09 PM',saleStartsAt:null,saleEndsAt:null,content:'this is amazing'},
      {id:3,userId:1,title:'Higurashi When They Cry: Nekogoroshi Chapter',metatitle:'Higurashi When they cry: Nekogoroshi Chapter',slug:'/Higurashi+When+They+Cry+Nekogoroshi+Chapter',summary:'awsome',type:1,price:19.99,discount:0.0,quantity:6546,forSale:0,publishedAt:'18-06-22 10:55:09 PM',saleStartsAt:null,saleEndsAt:null,content:'this is amazing'},
      {id:4,userId:1,title:'Higurashi When They Cry: Rei',metatitle:'Higurashi When they cry : Rei',slug:'/Higurashi+When+They+Cry+Rei',summary:'awsome',type:1,price:19.99,discount:0.0,quantity:6541,forSale:0,publishedAt:'18-06-22 10:55:09 PM',saleStartsAt:null,saleEndsAt:null,content:'this is amazing'},
      {id:5,userId:1,title:'Higurashi When They Cry: Chikai',metatitle:'Higurashi When they cry  Chikai',slug:'/Higurashi+When+They+Cry+Chikai',summary:'awsome',type:1,price:19.99,discount:0.0,quantity:453,forSale:0,publishedAt:'18-06-22 10:55:09 PM',saleStartsAt:null,saleEndsAt:null,content:'this is amazing'},
      {id:6,userId:1,title:'Higurashi When They Cry: Kira',metatitle:'Higurashi When they cry Kira',slug:'/Higurashi+When+They+Cry+Kira',summary:'awsome',type:1,price:19.99,discount:0.0,quantity:76,forSale:0,publishedAt:'18-06-22 10:55:09 PM',saleStartsAt:null,saleEndsAt:null,content:'this is amazing'},
      {id:7,userId:1,title:'Higurashi When They Cry: Outbreak',metatitle:'Higurashi When they cry Outbreak',slug:'/Higurashi+When+They+Cry+Outbreak',summary:'awsome',type:1,price:19.99,discount:0.0,quantity:4536,forSale:0,publishedAt:'18-06-22 10:55:09 PM',saleStartsAt:null,saleEndsAt:null,content:'this is amazing'},
      {id:8,userId:7,title:'Higurashi When They Cry: Gou',metatitle:'Higurashi When they cry Gou',slug:'/Higurashi+When+They+Cry+Gou',summary:'awsome',type:1,price:19.99,discount:0.0,quantity:444,forSale:0,publishedAt:'18-06-22 10:55:09 PM',saleStartsAt:null,saleEndsAt:null,content:'this is amazing'},
      {id:9,userId:7,title:'Higurashi When They Cry: Sotsu',metatitle:'Higurashi When they cry Sotsu',slug:'/Higurashi+When+They+Cry+Sotsu',summary:'awsome',type:1,price:19.99,discount:0.0,quantity:841,forSale:0,publishedAt:'18-06-22 10:55:09 PM',saleStartsAt:null,saleEndsAt:null,content:'this is amazing'},
      {id:10,userId:7,title:'Higurashi When They Cry: Oni',metatitle:'Higurashi When they cry Oni',slug:'/Higurashi+When+They+Cry+Oni',summary:'awsome',type:1,price:19.99,discount:0.0,quantity:9654,forSale:0,publishedAt:'18-06-22 10:55:09 PM',saleStartsAt:null,saleEndsAt:null,content:'this is amazing'}

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

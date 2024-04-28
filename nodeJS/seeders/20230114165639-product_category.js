'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Product_Categories',[
      {id:1,productId:1,categoryId:1},
      {id:2,productId:2,categoryId:1},
      {id:3,productId:3,categoryId:1},
      {id:4,productId:4,categoryId:1},
      {id:5,productId:5,categoryId:1},
      {id:6,productId:6,categoryId:1},
      {id:7,productId:7,categoryId:1},
      {id:8,productId:8,categoryId:1},
      {id:9,productId:9,categoryId:1},
      {id:10,productId:10,categoryId:1},
      {id:11,productId:1,categoryId:2},
      {id:12,productId:2,categoryId:2},
      {id:13,productId:3,categoryId:2},
      {id:14,productId:4,categoryId:2},
      {id:15,productId:5,categoryId:2},
      {id:16,productId:6,categoryId:2},
      {id:17,productId:7,categoryId:2},
      {id:18,productId:8,categoryId:2},
      {id:19,productId:9,categoryId:2},
      {id:20,productId:10,categoryId:2},
      {id:21,productId:1,categoryId:3},
      {id:22,productId:2,categoryId:3},
      {id:23,productId:3,categoryId:3},
      {id:24,productId:4,categoryId:3},
      {id:25,productId:5,categoryId:3},
      {id:26,productId:6,categoryId:3},
      {id:27,productId:7,categoryId:3},
      {id:28,productId:8,categoryId:3},
      {id:29,productId:9,categoryId:3},
      {id:30,productId:10,categoryId:3},
      {id:31,productId:1,categoryId:4},
      {id:32,productId:2,categoryId:4},
      {id:33,productId:3,categoryId:4},
      {id:34,productId:4,categoryId:4},
      {id:35,productId:5,categoryId:4},
      {id:36,productId:6,categoryId:4},
      {id:37,productId:7,categoryId:4},
      {id:38,productId:8,categoryId:4},
      {id:39,productId:9,categoryId:4},
      {id:40,productId:10,categoryId:4},
      {id:41,productId:1,categoryId:6},
      {id:42,productId:2,categoryId:6},
      {id:43,productId:3,categoryId:6},
      {id:44,productId:4,categoryId:6},
      {id:45,productId:5,categoryId:6},
      {id:46,productId:6,categoryId:6},
      {id:47,productId:7,categoryId:6},
      {id:48,productId:8,categoryId:6},
      {id:49,productId:9,categoryId:6},
      {id:50,productId:10,categoryId:6}
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

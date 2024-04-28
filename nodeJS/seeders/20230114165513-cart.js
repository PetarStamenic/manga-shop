'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Carts',[
      {id:1,userId:3,sessionId:'kuysdgfikuasdhbikuhbak',token:'asdas1+65g1a65g16a51g654a1gb654as1bn6w1b61sa6b',status:0,content:null},
      {id:2,userId:2,sessionId:'as65g416asd4g6as46g86as41g',token:'aws65ebg165was1b6541sa6b51s65b196s78b16w5s1v 654srg',status:1,content:null},
      {id:3,userId:6,sessionId:'asdr65g416asd41g6as14g614as65g',token:'erssb15s1bs544dg68w1b6sd4g651v678se4hg',status:1,content:'isporuciti na kucnu adrtesu'},
      {id:4,userId:4,sessionId:'a85ws7rs7bg6wsear1ghae89168b1awe6rgb4aWE',token:'a+de8gb54as56dhg46a1v68a74g61vb6s7ff4hg',status:1,content:'hitno'},
      {id:5,userId:5,sessionId:'a46551f6aq1f651a6g81r61hs651b6ws4reh651sab',token:'a+5dg4q65a41b654a1b6a78d4g61v645ad74gh68541',status:2,content:null}

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

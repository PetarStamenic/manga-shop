'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users',[
      {id:1,firstName:'Petar',lastName:'Stamenic',vendor:1,mobile:'0600176999',email:'pstamenic7721RN@raf.rs',addres:'neka adresa',passwordHash:'5994471abb01112afcc18159f6cc74b4f511b99806da59b3ca'},
      {id:2,firstName:'Keiichi',lastName:'Maebara',vendor:0,mobile:'00001',email:'Keichi@gmail.rs',addres:'neka adresa',passwordHash:'5994471abb01112afcc18159f6cc74b4f511b99806da59b3ca'},
      {id:3,firstName:'Ruka',lastName:'Furude',vendor:0,mobile:'00002',email:'endmysufering@gmail.rs',addres:'neka adresa',passwordHash:'5994471abb01112afcc18159f6cc74b4f511b99806da59b3ca'},
      {id:4,firstName:'Shion',lastName:'Sonozaki',vendor:0,mobile:'64516516',email:'Shion@gmail.rs',addres:'neka adresa',passwordHash:'5994471abb01112afcc18159f6cc74b4f511b99806da59b3ca'},
      {id:5,firstName:'Sakoto',lastName:'Hojo',vendor:0,mobile:'654646541',email:'Sakoto@gmal.rs',addres:'neka adresa',passwordHash:'5994471abb01112afcc18159f6cc74b4f511b99806da59b3ca'},
      {id:6,firstName:'Mion',lastName:'Sonozaki',vendor:0,mobile:'645165416',email:'Mion@gmail.rs',addres:'neka adresa',passwordHash:'5994471abb01112afcc18159f6cc74b4f511b99806da59b3ca'},
      {id:7,firstName:'Rena',lastName:'Ryugu',vendor:1,mobile:'66516',email:'REna@gmail.rs',addres:'neka adresa',passwordHash:'5994471abb01112afcc18159f6cc74b4f511b99806da59b3ca'}
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

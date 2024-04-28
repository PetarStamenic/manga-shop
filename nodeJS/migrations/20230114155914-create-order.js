'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Orders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      sessionId: {
        allowNull: false,
        type: Sequelize.STRING
      },
      token: {
        allowNull: false,
        type: Sequelize.STRING
      },
      status: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      subTotal: {
        allowNull: false,
        type: Sequelize.FLOAT
      },
      itemDiscount: {
        allowNull: false,
        type: Sequelize.FLOAT
      },
      tax: {
        allowNull: false,
        type: Sequelize.FLOAT
      },
      shipping: {
        allowNull: false,
        type: Sequelize.FLOAT
      },
      total: {
        allowNull: false,
        type: Sequelize.FLOAT
      },
      promo: {
        type: Sequelize.STRING
      },
      discount: {
        allowNull: false,
        type: Sequelize.FLOAT
      },
      grandTotal: {
        allowNull: false,
        type: Sequelize.FLOAT
      },
      content: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Orders');
  }
};
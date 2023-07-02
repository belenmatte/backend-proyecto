'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn(
      'Cards',
      'image',
      {
        type: Sequelize.STRING,
        allowNull: false,
      }
    )
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Cards', 'image');
  }
};

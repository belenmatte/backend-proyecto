'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn(
      'Games',
      'playing',
      {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      }
    )
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Games', 'playing');
  }
};

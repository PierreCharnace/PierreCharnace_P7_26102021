'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Posts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },

      idUSERS: { 
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
        model: 'Users',
        key: 'id'
        }
      },
      post_title: {
        type: Sequelize.STRING
      },
      post_content: {
        type: Sequelize.STRING
      },
      post_date: {
        type: Sequelize.INTEGER
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
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Posts');
  }
};
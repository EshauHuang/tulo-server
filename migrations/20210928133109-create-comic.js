"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Comics", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      location: {
        type: Sequelize.ARRAY(Sequelize.STRING),
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      WorkId: {
        type: Sequelize.INTEGER,
        required: true,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Comics");
  },
};

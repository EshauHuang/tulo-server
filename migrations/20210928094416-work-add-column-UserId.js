"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("Works", "UserId", {
      type: Sequelize.INTEGER,
      required: true,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("Works", "UserId");
  },
};

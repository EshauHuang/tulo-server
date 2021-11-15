"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("Users", "intro", {
      type: Sequelize.TEXT,
    });
    await queryInterface.addColumn("Users", "photo", {
      type: Sequelize.STRING,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("Users", "intro");
    await queryInterface.removeColumn("Users", "photo");
  },
};

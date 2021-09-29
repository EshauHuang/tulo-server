"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("Users", "authority", {
      type: Sequelize.ENUM("ADMIN", "NORMAL", "BANNED"),
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("Users", "authority");
  },
};

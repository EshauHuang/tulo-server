"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn("Works", "type", {
      type: Sequelize.ENUM("ART", "COMIC"),
      required: true,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn("Works", "type", {
      type: Sequelize.STRING,
    });
  },
};

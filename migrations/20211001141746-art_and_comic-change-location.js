"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("Arts", "location");
    await queryInterface.removeColumn("Comics", "location");
    await queryInterface.addColumn("Arts", "directory", {
      type: Sequelize.STRING,
    });
    await queryInterface.addColumn("Comics", "directory", {
      type: Sequelize.STRING,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("Arts", "directory");
    await queryInterface.removeColumn("Comics", "directory");
    await queryInterface.addColumn("Arts", "location", {
      type: Sequelize.ARRAY(Sequelize.STRING),
    });
    await queryInterface.addColumn("Comics", "location", {
      type: Sequelize.ARRAY(Sequelize.STRING),
    });
  },
};

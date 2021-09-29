"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Art extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Art.belongsTo(models.Work);
    }
  }
  Art.init(
    {
      location: DataTypes.ARRAY(DataTypes.STRING),
      WorkId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Art",
    }
  );
  return Art;
};

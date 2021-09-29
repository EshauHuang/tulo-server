"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Work extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Work.belongsTo(models.User);
      Work.hasOne(models.Art);
      Work.hasOne(models.Comic);
    }
  }
  Work.init(
    {
      title: DataTypes.STRING,
      tag: DataTypes.STRING,
      UserId: DataTypes.STRING,
      type: {
        type: DataTypes.ENUM("art", "comic"),
      },
    },
    {
      sequelize,
      modelName: "Work",
    }
  );
  return Work;
};

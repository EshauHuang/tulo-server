"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.Work, { as: "works" });
    }
  }
  User.init(
    {
      nickname: DataTypes.STRING,
      username: DataTypes.STRING,
      password: DataTypes.STRING,
      photo: DataTypes.STRING,
      intro: {
        type: DataTypes.TEXT,
        defaultValue: "請多多指教～",
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};

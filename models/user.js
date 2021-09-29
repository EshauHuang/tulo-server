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
      User.hasMany(models.Work);
    }
  }
  User.init(
    {
      nickname: DataTypes.STRING,
      username: DataTypes.STRING,
      password: DataTypes.STRING,
      authority: {
        type: DataTypes.ENUM("ADMIN", "NORMAL", "BANNED"),
        defaultValue: "NORMAL",
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};

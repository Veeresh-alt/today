"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class foreign extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      foreign.hasMany(models.foreignsub, {
        foreignKey: "foreign_id",
        targetKey: "id",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
    }
  }
  foreign.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "foreign",
    }
  );
  return foreign;
};

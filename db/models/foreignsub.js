"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class foreignsub extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      foreignsub.belongsTo(models.foreign, {
        foreignKey: "foreign_id",
        targetKey: "id",
        as: "kali",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
      foreignsub.hasMany(models.address, {
        foreignKey: "mobile_id",
        targetKey: "id",
        alias: "kali",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
      // foreignsub.belongsTo(models.address, {
      //   foreignKey: "id",
      //   targetKey: "mobile_id",
      //   onDelete: "CASCADE",
      //   onUpdate: "CASCADE",
      // });
    }
  }
  foreignsub.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      mobile: DataTypes.STRING,
      foreign_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "foreignsub",
    },
    {
      attributes: ["id", "mobile", "foreign_id"],
    }
  );
  return foreignsub;
};

"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class address extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      address.belongsTo(models.foreignsub, {
        foreignKey: "mobile_id",
        targetKey: "id",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
      // address.belongsTo(models.foreign, {
      //   foreignKey: "mobile_id",
      //   targetKey: "id",
      //   through: "foreignsub",
      //   onDelete: "CASCADE",
      //   onUpdate: "CASCADE",
      // });
    }
  }
  address.init(
    {
      address: DataTypes.STRING,
      mobile_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "address",
    }
  );
  return address;
};

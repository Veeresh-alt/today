require("dotenv").config();
const environment = process.env.NODE_ENV;
const config = require("./database.js")[environment];
const { Sequelize, DataTypes } = require("sequelize");
module.exports = new Sequelize(config);

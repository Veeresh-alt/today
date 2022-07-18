const Sequelize = require("sequelize");
const { join } = require("path");

const db = {};

db.init = ({
  username,
  password,
  name: database,
  host,
  port,
  dialect,
  connectionLimit,
  pool,
  logging,
  operatorsAliases,
  define,
} = {}) => {
  console.log(
    "database",
    username,
    password,
    database,
    host,
    port,
    dialect,
    connectionLimit,
    pool,
    logging,
    operatorsAliases,
    define
  );

  if (db.sequelize) {
    return db.sequelize;
  }

  const sequelize_config = {
      host,
      port,
      dialect,
      connectionLimit,
      pool,
      logging,
      operatorsAliases,
      define,
    },
    sequelize = new Sequelize(database, username, password, sequelize_config);

  db.sequelize = sequelize;

  return db.sequelize;
};

db.checkConnection = async () => {
  if (!db.sequelize) {
    throw new Error("No database initialized");
  }

  try {
    db.sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (e) {
    console.log("Unable to connect to the database:", e);
    throw e;
  }

  return db.sequelize.authenticate();
};

db.Sequelize = Sequelize;
module.exports = db;

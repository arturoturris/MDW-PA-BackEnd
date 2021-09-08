const { Sequelize } = require("sequelize");

const dbName = process.env.DB_NAME,
  dbUser = process.env.DB_USER,
  dbPassword = process.env.DB_PASSWORD,
  host = process.env.DB_HOST,
  dialect = "mysql";

const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
  host,
  dialect,
});

module.exports = {
  sequelize,
};

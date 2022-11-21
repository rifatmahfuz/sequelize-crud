require("dotenv").config();
/**
 * Importing Sequelize.
 */
const Sequelize = require("sequelize");

/**
 * Create a Sequelize instance. This can be done by passing
 * the connection parameters separately to the Sequelize constructor.
 */
/*
const sequelize = new Sequelize("sequelizedemo", "root", "root", {
  host: "localhost",
  dialect: "mysql",
});

*/
const sequelize = new Sequelize(
  `${process.env.DATABASE}`,
  `${process.env.DATABASE_USER}`,
  `${process.env.DATABASE_PASSWORD}`,

  {
    host: `${process.env.DATABASE_HOST}`,
    dialect: "mysql",
  }
);

/**
 * Export the Sequelize instance. This instance can now be
 * used in the app.js file to authenticate and establish a database connection.
 */
module.exports = sequelize;

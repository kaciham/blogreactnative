const { Sequelize, DataTypes } = require("sequelize");

const name = process.env.DB_NAME;
const usernamedb = process.env.DB_USER;
const password = process.env.DB_PASSWORD;
const host = process.env.DB_HOST;

const sequelize = new Sequelize(name, usernamedb, password, {
    host,
    dialect: "mysql",
    // dialectOptions: {
    //   timezone: "Etc/GMT+1",
    // },
    logging: false,
  });
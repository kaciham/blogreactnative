
const { Sequelize } = require('sequelize');
require('dotenv').config();

const name = process.env.DB_NAME;
const usernamedb = process.env.DB_USER;
const password = process.env.DB_PASSWORD;
const host = process.env.DB_HOST;

const sequelize = new Sequelize(name, usernamedb, password, {
  host,
  dialect: 'mysql',
  logging: false,
  port: 3306,
});

module.exports = sequelize;
const sequelize = require('./sequelize');
const Account = require('../models/account');
const Post = require('../models/post');
const Comment = require('../models/comment');

async function syncDatabase() {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');

    await sequelize.sync({ alter: true });
    console.log('Database synchronized successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

module.exports = syncDatabase;
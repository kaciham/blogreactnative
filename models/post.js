const { DataTypes } = require('sequelize');
const sequelize = require('../configs/sequelize')
const Account = require('./account')

const Post = sequelize.define("Post", {
    postId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    title: {
        type: DataTypes.STRING,
        required: true,
    },
    lastName: {
        type: DataTypes.STRING,
        required: true,
    },
    textContent: {
        type: DataTypes.STRING,
        required: false,
    },
    imageContent: {
        type: DataTypes.STRING,
        required: false,
    },
    isDeleted: {
        type: DataTypes.BOOLEAN,
        required: false,
    },
    createdDate: {
        type: DataTypes.DATE,
        required: true,
    },
    updatedDate: {
        type: DataTypes.DATE,
        required: false,
    },
    accountId: {
        type: DataTypes.INTEGER,
        references: {
            model: Account,
            key: 'accountId',
        },
    },
})

Account.hasMany(Post, { foreignKey: 'accountId' });
Post.belongsTo(Account, { foreignKey: 'accountId' });

module.exports = Post;
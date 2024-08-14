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
    accountId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Account,
            key: 'accountId',
        },
        onDelete: 'CASCADE', // If an account is deleted, all associated posts will also be deleted
        onUpdate: 'CASCADE',
    },
}, {
    indexes: [
        {
            fields: ['accountId']
        }
    ]
});
Account.hasMany(Post, { foreignKey: 'accountId' });
Post.belongsTo(Account, { foreignKey: 'accountId' });

module.exports = Post;
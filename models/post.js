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
        allowNull: true,
    },
    textContent: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    imageContent: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    isDeleted: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
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
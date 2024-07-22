const { DataTypes } = require('sequelize');
const sequelize = require('../configs/sequelize')
const Account = require('./account.js')
const Post = require('./post.js')

const Comment = sequelize.define("Comment", {
    commentId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    content: {
        type: DataTypes.STRING,
        required: true,
    },
    createdDate: {
        type: DataTypes.DATE,
        required: true,
    },
    updatedDate: {
        type: DataTypes.DATE,
        required: false,
    },
    postId: {
        type: DataTypes.INTEGER,
        references: {
            model: Post,
            key: 'accountId',
        },
    },
    accountId: {
        type: DataTypes.INTEGER,
        references: {
            model: Account,
            key: 'accountId',
        },
    },
})

Post.hasMany(Comment, { foreignKey: 'postId' });
Comment.belongsTo(Post, { foreignKey: 'postId' });
Account.hasMany(Comment, { foreignKey: 'accountId' });
Comment.belongsTo(Account, { foreignKey: 'accountId' });

module.exports = Comment;
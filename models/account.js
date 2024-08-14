const { DataTypes } = require('sequelize');
const sequelize = require('../configs/sequelize')
const bcrypt = require('bcrypt');

const Account = sequelize.define("Account", {
    accountId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    firstName: {
        type: DataTypes.STRING,
        required: true,
    },
    lastName: {
        type: DataTypes.STRING,
        required: true
    },
    email: {
        type: DataTypes.STRING,
        required: true,
        // unique: true,
        validate: {
            isEmail: true,
        },
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    isDeactivated: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    isDeleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    isDataErased: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    isModerator: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
}, {
    indexes: [
        {
            unique: true,
            fields: ['email']
        }
    ]
});

Account.addHook(
    "beforeCreate",
    account => (account.password = bcrypt.hashSync(account.password, 10))
);

module.exports = Account;

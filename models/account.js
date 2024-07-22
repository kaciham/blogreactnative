const { DataTypes } = require('sequelize');
const sequelize = require('../configs/sequelize')

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
        required: true,
    },
    email: {
        type: DataTypes.STRING,
        required: true,
        unique: true,
        validate: {
            isEmail: true,
        }
    },
    password: {
        type: DataTypes.STRING,
        required: true,
    },
    isDeleted: {
        type: DataTypes.BOOLEAN,
        required: false,
    },
    isDataErased: {
        type: DataTypes.BOOLEAN,
        required: false,
    },
    isModerator: {
        type: DataTypes.BOOLEAN,
        required: false,
    }
})


module.exports = Account;
const Account = require("../models/account");
const sequelize = require("sequelize");

//CREATE
const createAccount = async (accountData) => {
    const { firstName, lastName, email, password } = accountData;

    try {
        const newAccount = await Account.create({
            firstName,
            lastName,
            email,
            password,
            isDeleted: false,
            isDataErased: false,
            isModerator: false
        });

        return newAccount;
    } catch (error) {
        console.error("Error creating account:", error);
        throw error;
    }
};


module.exports = createAccount;
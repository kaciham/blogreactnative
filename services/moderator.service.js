const Account = require("../models/account");
const Comment = require("../models/comment")
const { ValidationError } = require("sequelize");
const jwt = require('jsonwebtoken');

const getAccounts = async (token) => {
    try {
        // Verify and decode the JWT
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        const { email } = decoded.UserInfo;

        // Find the account by the decoded accountId
        const account = await Account.findOne({ where: { email } });

        if (!account) {
            throw new Error('Account not found');
        }

        // Check if the account is a moderator
        if (account.isModerator) {
            // Fetch all accounts where isModerator is false
            const accounts = await Account.findAll({
                where: {
                    isModerator: false
                }
            });
            return accounts;
        } else {
            // Return an empty array if the account is not a moderator
            return [];
        }
    } catch (error) {
        if (error instanceof ValidationError) {
            throw new ValidationError("Validation Error", error.errors);
        } else if (error.message === 'Account(s) not found') {
            throw new Error('Account not found');
        } else if (error.name === "JsonWebTokenError") {
            throw new Error('Invalid token');
        } else if (error.name === "TokenExpiredError") {
            throw new Error('Token expired');
        } else {
            throw new Error('Internal Server Error');
        }
    }
};

const getComments = async (token) => {
    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        const { email } = decoded.UserInfo;
        const account = await Account.findOne({ where: { email } });
        if(account.isModerator) {
            const comments = await Comment.findAll();
            return comments;
        }
        else {
            // Return an empty array if the account is not a moderator
            return [];
        }
    } catch (error) {
        if (error instanceof ValidationError) {
            throw new ValidationError("Validation Error", error.errors);
        } else if (error.message === 'Comment(s) not found') {
            throw new Error('Account not found');
        } else if (error.name === "JsonWebTokenError") {
            throw new Error('Invalid token');
        } else if (error.name === "TokenExpiredError") {
            throw new Error('Token expired');
        } else {
            throw new Error('Internal Server Error');
        }
    }
}

module.exports = {
    getAccounts, getComments
}
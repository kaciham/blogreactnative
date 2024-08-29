const asyncHandler = require('express-async-handler');
const Account = require("../models/account")
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }
    const foundAccount = await Account.findOne({ where: { email } });

    if (!foundAccount) {
        return res.status(401).json({ message: 'Unauthorized' })
    }
    if (foundAccount.isDeleted === true && foundAccount.isDeactivated === true) {
        return res.status(401).json({ message: 'Unauthorized, Account Deleted' })
    }
    if (foundAccount.isDeactivated === true) {
        return res.status(401).json({ message: 'Unauthorized, Account Deactived' })
    }


    const match = await bcrypt.compare(password, foundAccount.password);
    if (!match) return res.status(401).json({ message: 'Unauthorized, wrong password' })

    const accessToken = jwt.sign(
        {
            "UserInfo": {
                "email": foundAccount.email
            }
        }
        ,
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '1d' }
    )

    res.json({ accessToken })
})

const logout = asyncHandler(async (req, res) => {
    // To log out a user, we'll clear the token stored on the client side.
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0)
    });
    res.status(200).json({ message: "Logged out successfully" });
});

module.exports = {
    login, logout
}
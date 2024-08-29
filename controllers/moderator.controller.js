const moderatorService = require("../services/moderator.service");

//READ

const getAccounts = async (req, res) => {
    try {
        // Ensure the Authorization header is present and formatted correctly
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ message: "Authorization token missing or malformed" });
        }

        // Extract the token from the Authorization header
        const token = authHeader.split(' ')[1];

        // Call the service to get accounts, passing the token
        const accounts = await moderatorService.getAccounts(token);

        // Respond with the retrieved accounts
        res.status(200).json(accounts);
    } catch (error) {
        // Handle different error types appropriately
        if (error.name === "ValidationError") {
            return res.status(400).json({ message: "Validation Error", details: error.errors });
        } else if (error.message === "Account not found") {
            return res.status(404).json({ message: "Account not found" });
        } else if (error.name === "JsonWebTokenError") {
            return res.status(401).json({ message: "Invalid token" });
        } else if (error.name === "TokenExpiredError") {
            return res.status(401).json({ message: "Token expired" });
        } else {
            return res.status(500).json({ message: "Internal Server Error" });
        }
    }
}

const getComments = async (req, res) => {
    try {
        // Ensure the Authorization header is present and formatted correctly
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ message: "Authorization token missing or malformed" });
        }

        // Extract the token from the Authorization header
        const token = authHeader.split(' ')[1];

        // Call the service to get accounts, passing the token
        const comments = await moderatorService.getComments(token);

        // Respond with the retrieved accounts
        res.status(200).json(comments);
    } catch (error) {
        // Handle different error types appropriately
        if (error.name === "ValidationError") {
            return res.status(400).json({ message: "Validation Error", details: error.errors });
        } else if (error.message === "Account not found") {
            return res.status(404).json({ message: "Account not found" });
        } else if (error.name === "JsonWebTokenError") {
            return res.status(401).json({ message: "Invalid token" });
        } else if (error.name === "TokenExpiredError") {
            return res.status(401).json({ message: "Token expired" });
        } else {
            return res.status(500).json({ message: "Internal Server Error" });
        }
    }
}


module.exports = {
    getAccounts, getComments
}
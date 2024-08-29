const employeeService = require("../services/employee.service");

//CREATE

const createAccount = async (req, res) => {
    try {
        const accountData = req.body;
        const newAccount = await employeeService.createAccount(accountData);
        return res.status(201).json(newAccount);
    } catch (error) {
        console.error("Error creating account:", error);

        // Send appropriate error response
        if (error.name === "ValidationError") {
            return res.status(400).json({ message: "Validation Error", details: error.errors });
        } else {
            return res.status(500).json({ message: "Internal Server Error" });
        }
    }
}

const createPost = async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const postData = req.body;
        // const { postId } = req.params;
        const newPost = await employeeService.createPost(postData, token);
        return res.status(201).json(newPost);
    } catch (error) {
        console.error("Error creating post:", error);

        // Send appropriate error response
        if (error.name === "ValidationError") {
            return res.status(400).json({ message: "Validation Error", details: error.errors });
        } else {
            return res.status(500).json({ message: "Internal Server Error" });
        }
    }
}

const createComment = async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const commentData = req.body;
        const { postId } = req.params;
        const newComment = await employeeService.createComment(commentData, postId, token);
        return res.status(201).json(newComment);
    }
    catch (error) {
        // Send appropriate error response
        if (error.name === "ValidationError") {
            return res.status(400).json({ message: "Validation Error", details: error.errors });
        } else {
            return res.status(500).json({ message: "Internal Server Error" });
        }
    }
}

//READ

const getAllPosts = async (req, res) => {
    try {
        const allPosts = await employeeService.getPosts();
        res.status(200).json(allPosts);
    } catch (error) {
        if (error.name === "ValidationError") {
            return res.status(400).json({ message: "Validation Error", details: error.errors });
        } else {
            return res.status(500).json({ message: "Internal Server Error" });
        }
    }
}

const getPostbyId = async (req, res) => {
    try {
        const { id } = req.params;
        const foundPost = await employeeService.getPost(id);
        if (!foundPost) {
            return res.status(404).json({ error: "Post not found" });
        }
        res.status(200).json(foundPost);
    } catch (error) {
        if (error.name === "ValidationError") {
            return res.status(400).json({ message: "Validation Error", details: error.errors });
        } else {
            return res.status(500).json({ message: "Internal Server Error" });
        }
    }
}

const getCommentsByPostId = async (req, res) => {
    const { postId } = req.params;

    try {
        const comments = await employeeService.getCommentsByPostId(postId);
        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getPostsByAccountId = async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const postsByAccountId = await employeeService.getPostsByAccountId(token);
        res.status(200).json(postsByAccountId);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }

}
//UPDATE

const updatePost = async (req, res) => {
    try {
        const { postId } = req.params;
        const updatedData = req.body;
        const updatedPost = await employeeService.updatePost(postId, updatedData);
        res.status(200).json(updatedPost);
    } catch (error) {
        if (error.message === 'Post not found') {
            res.status(404).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'Failed to update Post' });
        }
    }
};

const updateComment = async (req, res) => {
    try {
        const { commentId } = req.params;
        const updatedData = req.body;
        const updatedComment = await employeeService.updateComment(commentId, updatedData);
        res.status(200).json(updatedComment);
    } catch (error) {
        if (error.message === 'Comment not found') {
            res.status(404).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'Failed to update comment' });
        }
    }
}

const desactivateAccount = async (req, res) => {
    try {
        const { accountId } = req.params;
        await employeeService.desactivateAccount(accountId);
        res.status(200).json({ "message": "the account is now deactivated" })
    } catch (error) {
        if (error.message === 'Account not found') {
            res.status(404).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'Failed to deactivate account' });
        }
    }
}

const reactivateAccount = async (req, res) => {
    try {
        const { accountId } = req.params;
        await employeeService.reactivateAccount(accountId);
        res.status(200).json({ "message": "the account is now reactivated" })
    } catch (error) {
        if (error.message === 'Account not found') {
            res.status(404).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'Failed to reeactivate account' });
        }
    }
}

const deleteAccount = async (req, res) => {
    try {
        const { accountId } = req.params;
        await employeeService.deleteAccount(accountId);
    } catch (error) {
        if (error.message === 'Account not found') {
            res.status(404).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'Failed to delete account' });
        }
    }
}

const deleteAccountData = async (req, res) => {
    try {
        const { accountId } = req.params;
        await employeeService.deleteAccountData(accountId);
    } catch (error) {
        if (error.message === 'Account not found') {
            res.status(404).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'Failed to deactivate account and erase account data' });
        }
    }
}
//DELETE

const deletePost = async (req, res) => {
    const { postId } = req.params
    try {
        const postDeleted = await employeeService.delelePostById(postId);
        if (!postDeleted) {
            return res.status(404).json({ error: "Post not found or already deleted" })
        }
        res.status(200).json({ message: "Post deleted successfully" })
    } catch (error) {
        if (error.name === "ValidationError") {
            return res.status(400).json({ message: "Validation Error", details: error.errors });
        } else {
            return res.status(500).json({ message: "Internal Server Error" });
        }
    }
}

const deleteComment = async (req, res) => {
    const { commentId } = req.params
    try {
        const commentDeleted = await employeeService.deleteCommentById(commentId);
        if (!commentDeleted) {
            return res.status(404).json({ error: "Post not found or already deleted" })
        }
        res.status(200).json({ message: "Comment deleted successfully" })
    } catch (error) {
        if (error.name === "ValidationError") {
            return res.status(400).json({ message: "Validation Error", details: error.errors });
        } else {
            return res.status(500).json({ message: "Internal Server Error" });
        }
    }
}

module.exports = { createAccount, createPost, createComment, getAllPosts, getPostbyId, getCommentsByPostId, deletePost, deleteComment, updatePost, updateComment, desactivateAccount, deleteAccount, deleteAccountData, reactivateAccount, getPostsByAccountId };     
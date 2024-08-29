const Account = require("../models/account");
const Post = require("../models/post")
const Comment = require("../models/comment")
const { ValidationError } = require("sequelize");
const jwt = require('jsonwebtoken');

// CREATE

const createAccount = async (accountData) => {
    try {

        const { firstName,
            lastName,
            email,
            password } = accountData;

        const newAccount = await Account.create({
            firstName,
            lastName,
            email,
            password,
            isDeactivated: false,
            isDeleted: false,
            isDataErased: false,
            isModerator: false
        });

        return newAccount;
    } catch (error) {
        if (error instanceof ValidationError) {
            console.error("Validation error creating account:", error.errors);
            throw error;
        } else {
            console.error("Error creating account:", error);
            throw error;
        }
    };
}

const createPost = async (postData, token) => {
    try {

        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        const { email } = decoded.UserInfo;
        const account = await Account.findOne({ where: { email } });
        if (!account) {
            throw new Error('Account not found');
        }

        const firstName = `${account.firstName}`;
        const lastName = `${account.lastName}`;
        const accountId = `${account.accountId}`;

        const { title, textContent, imageContent, videoContent } = postData;
        const newPost = await Post.create({
            title,
            textContent,
            imageContent,
            videoContent,
            isDeleted: false,
            firstName: firstName,
            lastName: lastName,
            accountId: accountId

        })
        return newPost;
    }
    catch (error) {
        if (error instanceof ValidationError) {
            console.error("Validation error creating post:", error.errors);
            throw error;
        } else {
            console.error("Error creating post:", error);
            throw error;
        }
    }
}

const createComment = async (commentData, postId, token) => {
    try {
        // Validate inputs if necessary
        if (!commentData || !postId || !token) {
            throw new Error('Invalid input data');
        }

        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        const { email } = decoded.UserInfo;

        const account = await Account.findOne({ where: { email } });
        if (!account) {
            throw new Error('Account not found');
        }

        const { accountId, firstName, lastName } = account;
        const { content } = commentData;

        const newComment = await Comment.create({
            content: content,  // Directly use commentData instead of assigning to another variable
            accountId: accountId,  // Shorthand could be used, but it's explicit here for clarity
            postId: postId
        });

        const result = {
            ...newComment.get({ plain: true }), // Get plain object from Sequelize instance
            firstName: firstName,
            lastName: lastName,
        };
        return result;
    } catch (error) {
        if (error.name === 'ValidationError') {  // Fixed to match Sequelize ValidationError
            console.error("Validation error creating comment:", error.errors);
            throw new Error('Validation Error');
        } else {
            console.error("Error creating comment:", error);
            throw new Error('Internal Server Error');
        }
    }
};

//READ

const getPosts = async () => {
    try {
        const allPosts = await Post.findAll();
        return allPosts;
    } catch (error) {
        if (error instanceof ValidationError) {
            console.error("Validation error creating account:", error.errors);
            throw error;
        } else {
            console.error("Error creating account:", error);
            throw error;
        }
    }
}

const getPost = async (id) => {
    try {
        const getPost = await Post.findByPk(id);
        if (!getPost) {
            throw new Error('Post not found');
        }
        return getPost;
    } catch (error) {
        if (error instanceof ValidationError) {
            console.error("Validation error creating account:", error.errors);
            throw error;
        } else {
            console.error("Error creating account:", error);
            throw error;
        }
    }
}

const getCommentsByPostId = async (postId) => {
    try {
        // Check if the post exists
        const post = await Post.findByPk(postId);
        if (!post) {
            throw new Error('Post not found');
        }

        // Find all comments associated with the postId
        const comments = await Comment.findAll({
            where: { postId },
            include: [{
                model: Account,
                attributes: ['firstName', 'lastName'], // Include post title in the response if needed
            }]
        });

        return comments;
    } catch (error) {
        throw new Error(`Could not fetch comments: ${error.message}`);
    }
};

const getPostsByAccountId = async (token) => {
    try {
        // Verify and decode the JWT token
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        const email = decoded.UserInfo.email;

        // Find the account by email
        const account = await Account.findOne({ where: { email } });
        if (!account) {
            throw new Error('Account not found');
        }

        // Fetch posts using the accountId
        const posts = await Post.findAll({
            where: { accountId: account.accountId }
        });
        if(!posts){
            throw new Error ('no posts for this account')
        }

        return posts;

    } catch (error) {
        throw new Error(`Could not fetch posts: ${error.message}`);
    }
}


//UPDATE

const updatePost = async (id, updatedData) => {
    try {
        // Find the post by ID
        const post = await Post.findByPk(id);
        if (!post) {
            throw new Error('Post not found');
        }
        // Update the post with the new data
        await post.update(updatedData);
        // Return the updated post
        return post;
    } catch (error) {
        if (error instanceof ValidationError) {
            console.error("Validation error updating post:", error.errors);
            throw error;
        } else {
            console.error("Error updating post:", error);
            throw error;
        }
    }
};

const updateComment = async (id, updatedData) => {
    try {
        // Find the post by ID
        const comment = await Comment.findByPk(id);
        if (!comment) {
            throw new Error('Post not found');
        }

        // Update the post with the new data
        await comment.update(updatedData);

        // Return the updated post
        return comment;
    } catch (error) {
        if (error instanceof ValidationError) {
            console.error("Validation error updating post:", error.errors);
            throw error;
        } else {
            console.error("Error updating post:", error);
            throw error;
        }
    }
};

const desactivateAccount = async (id) => {
    try {
        const account = await Account.findByPk(id);
        if (!account) {
            throw new Error('Account not found');
        }
        await account.update({ isDeactivated: true });
    } catch (error) {
        if (error instanceof ValidationError) {
            console.error("Validation error desactivate account:", error.errors);
            throw error;
        } else {
            console.error("Error desactivating account:", error);
            throw error;
        }
    }
}

const reactivateAccount = async (id) => {
    try {
        const account = await Account.findByPk(id);
        if (!account) {
            throw new Error('Account not found');
        }
        if (account.isDeactivated === false) {
            await account.update({ isDeactivated: true });
        }
        else {
            throw new Error('Account already deactivated')
        }

    } catch (error) {
        if (error instanceof ValidationError) {
            console.error("Validation error desactivate account:", error.errors);
            throw error;
        } else {
            console.error("Error desactivating account:", error);
            throw error;
        }
    }
}

const deleteAccount = async (id) => {
    try {
        const account = await Account.findByPk(id);
        if (!account) {
            throw new Error('Account not found');
        }
        await account.update({ isDeleted: true, isDeactivated: true });
    } catch (error) {
        if (error instanceof ValidationError) {
            console.error("Validation error deleted account:", error.errors);
            throw error;
        } else {
            console.error("Error deleting account:", error);
            throw error;
        }
    }
}

const deleteAccountData = async (id) => {
    try {
        const account = await Account.findByPk(id);
        if (!account) {
            throw new Error('Account not found');
        }
        const deleteDataAccount = { password: "", email: "", isDeactivated: true, isDataErased: true, isDeleted: true };
        await account.update(deleteDataAccount);
    } catch (error) {
        if (error instanceof ValidationError) {
            console.error("Validation error deleted account and account data:", error.errors);
            throw error;
        } else {
            console.error("Error deleting account and account data:", error);
            throw error;
        }
    }
}
//DELETE

const delelePostById = async (postId) => {
    try {
        const deleted = await Post.destroy({
            where: { postId }
        });

        if (deleted === 0) {
            throw new Error('Post not found or already deleted');
        }

        return { message: 'Post successfully deleted' };
    } catch (error) {
        if (error instanceof ValidationError) {
            console.error("Validation error creating account:", error.errors);
            throw error;
        } else {
            console.error("Error creating account:", error);
            throw error;
        }
    }
}
const deleteCommentById = async (commentId) => {
    try {
        const deleted = await Comment.destroy({
            where: { commentId }
        });

        if (deleted === 0) {
            throw new Error('Comment not found or already deleted');
        }

        return { message: 'Comment successfully deleted' };
    } catch (error) {
        if (error instanceof ValidationError) {
            console.error("Validation error creating account:", error.errors);
            throw error;
        } else {
            console.error("Error creating account:", error);
            throw error;
        }
    }
}

module.exports = { createAccount, createPost, createComment, getPosts, getPost, getCommentsByPostId, deleteCommentById, delelePostById, updatePost, updateComment, desactivateAccount, deleteAccount, deleteAccountData, reactivateAccount, getPostsByAccountId }
const express = require('express');
const router = express.Router();
const employeeController = require("../controllers/employee.controller.js");
const authController = require("../controllers/auth.controller.js")
const verifyJWT = require('../middlewares/verifyJWT')

router.post("/account", employeeController.createAccount);
router.post("/post", employeeController.createPost);
router.post('/login', authController.login)
router.post('/logout', authController.logout);
router.post('/comment/:postId', employeeController.createComment)

router.get('/posts', employeeController.getAllPosts)
router.get('/post/:id', employeeController.getPostbyId)
router.get('/post/:postId/comments', employeeController.getCommentsByPostId)

router.put('/post/:postId', employeeController.updatePost)
router.put('/comment/:commentId', employeeController.updateComment)
router.put('/account/:accountId', employeeController.desactivateAccount);

router.delete('/post/:postId', employeeController.deletePost);
router.delete('/comment/:commentId', employeeController.deleteComment)

module.exports = router;
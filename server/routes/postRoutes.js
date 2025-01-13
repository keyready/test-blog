const express = require('express');
const router = express.Router();
const PostController = require('../controllers/PostController');
const { authenticateJWT, authorizePostOwner, authorizedAuthor } = require('../middleware/authMiddleware');

router.get('/posts', authorizedAuthor, PostController.getPosts);
router.get('/posts/:id', authenticateJWT, authorizePostOwner, PostController.getPostByPk);

router.post('/posts', authenticateJWT, PostController.createPost);
router.post('/posts/:id', authenticateJWT, authorizePostOwner, PostController.updatePost);

router.delete('/posts/:id', authenticateJWT, authorizePostOwner, PostController.deletePost);

module.exports = router;
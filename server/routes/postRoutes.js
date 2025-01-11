const express = require('express');
const router = express.Router();
const PostController = require('../controllers/PostController');
const { authenticateJWT, authorizePostOwner } = require('../middleware/authMiddleware');

router.post('/posts', authenticateJWT, PostController.createPost);
router.get('/posts', PostController.getPosts);
router.put('/posts/:id', authenticateJWT, authorizePostOwner, PostController.updatePost);
router.delete('/posts/:id', authenticateJWT, authorizePostOwner, PostController.deletePost);

module.exports = router;
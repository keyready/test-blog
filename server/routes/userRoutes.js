const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');
const {authenticateJWT} = require("../middleware/authMiddleware");

router.get('/profile', authenticateJWT, UserController.getUserProfile);
router.post('/users', UserController.createUser);

module.exports = router;
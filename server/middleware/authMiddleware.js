const authService = require('../services/authService');
const {Post} =require('../models')

const authenticateJWT = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1] || req.cookies.accessToken;

    if (!token) {
        return res.status(401).json({ message: 'Access token is required' });
    }

    const userData = authService.verifyAccessToken(token);
    if (!userData) {
        return res.status(403).json({ message: 'Invalid access token' });
    }

    req.user = userData;
    next();
};

const authorizedAuthor = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1] || req.cookies.accessToken;
    req.user = authService.verifyAccessToken(token);
    next()
}

const authorizePostOwner = async (req, res, next) => {
    const postId = req.params.id;
    const userId = req.user.id;

    try {
        const post = await Post.findByPk(postId);
        if (!post) {
            return res.status(404).json({ code: 404, message: 'Post not found' });
        }

        if (post.userId !== userId) {
            return res.status(403).json({ code: 403, message: 'You are not authorized to perform this action' });
        }

        next();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    authenticateJWT,
    authorizePostOwner,
    authorizedAuthor
};
const jwt = require('jsonwebtoken');
const config = require('../config/config.json')[process.env.NODE_ENV || 'development'];

const accessTokenSecret = config.accessTokenSecret;
const refreshTokenSecret = config.refreshTokenSecret;

const generateAccessToken = (user) => {
    return jwt.sign(user, accessTokenSecret, { expiresIn: '15m' });
};

const generateRefreshToken = (user) => {
    return jwt.sign(user, refreshTokenSecret, { expiresIn: '7d' });
};

const verifyAccessToken = (token) => {
    try {
        return jwt.verify(token, accessTokenSecret);
    } catch (err) {
        return null;
    }
};

const verifyRefreshToken = (token) => {
    try {
        return jwt.verify(token, refreshTokenSecret);
    } catch (err) {
        return null;
    }
};

module.exports = {
    generateAccessToken,
    generateRefreshToken,
    verifyAccessToken,
    verifyRefreshToken
};
const { User } = require('../models');
const bcrypt = require('bcryptjs');
const authService = require('../services/authService');

class AuthController {
    static async register(req, res) {
        try {
            const { firstname, lastname, username, password } = req.body;
            const existingUser = await User.findOne({ where: { username } });

            if (existingUser) {
                return res.status(409).json({ message: 'User already exists' });
            }

            await User.create({ firstname, lastname, username, password });
            res.status(201).json({ message: 'User registered successfully' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async login(req, res) {
        try {
            const { username, password } = req.body;
            const user = await User.findOne({ where: { username } });

            if (!user) {
                return res.status(403).json({ message: 'Invalid username or password' });
            }

            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                return res.status(403).json({ message: 'Invalid username or password' });
            }

            const accessToken = authService.generateAccessToken({ id: user.id, username: user.username });
            const refreshToken = authService.generateRefreshToken({ id: user.id, username: user.username });

            user.refreshToken = refreshToken;
            await user.save();

            res.cookie('refreshToken', refreshToken, { httpOnly: true, maxAge: 7 * 24 * 60 * 60 * 1000 });
            res.json({ accessToken });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async logout(req, res) {
        try {
            const { refreshToken } = req.cookies;
            if (!refreshToken) {
                return res.sendStatus(204);
            }

            const user = await User.findOne({ where: { refreshToken } });
            if (!user) {
                return res.sendStatus(204);
            }

            user.refreshToken = null;
            await user.save();

            res.clearCookie('refreshToken');
            res.sendStatus(204);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async refresh(req, res) {
        try {
            const { refreshToken } = req.cookies;
            if (!refreshToken) {
                return res.sendStatus(401);
            }

            const user = await User.findOne({ where: { refreshToken } });
            if (!user) {
                return res.sendStatus(403);
            }

            const userData = authService.verifyRefreshToken(refreshToken);
            if (!userData) {
                return res.sendStatus(403);
            }

            const accessToken = authService.generateAccessToken({ id: user.id, username: user.username });
            res.json({ accessToken });
        } catch (error) {
            console.log(error)
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = AuthController;
const { User } = require('../models');

class UserController {
    static async getUserProfile(req, res) {
        try {
            const { id } = req.user;
            const user = await User.findOne({ where: { id }, attributes: { exclude: ['password', 'refreshToken', 'updatedAt'] } });
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.json(user);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async createUser(req, res) {
        try {
            const user = await User.create(req.body);
            res.status(201).json(user);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = UserController;
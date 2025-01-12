const {Post, User} = require('../models');
const fs = require('fs');
const path = require('path');
const multer = require('multer');
const {Op} = require("sequelize");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadPath = path.join(__dirname, '../uploads');
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, {recursive: true});
        }
        cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({
    storage: storage, limits: {
        fileSize: 50 * 1024 * 1024,
        files: 10
    }
}).array('files');

class PostController {
    static async createPost(req, res) {
        try {
            upload(req, res, async (err) => {
                if (err) {
                    return res.status(500).json({error: err.message});
                }

                const {title, body} = req.body;
                const {id: userId} = req.user

                let files = [];

                let newHTMLBody = body
                if (req.files) {
                    files = req.files.map(file => ({
                        originalName: file.originalname,
                        serverPath: `/uploads/${file.filename}`
                    }));

                    files.forEach(({originalName, serverPath}, index) => {
                        newHTMLBody = newHTMLBody.replace(originalName, serverPath.split('/uploads/')[1]);
                    });
                }

                const post = await Post.create({
                    title,
                    body: newHTMLBody,
                    userId,
                    files: JSON.stringify(files.map(file => file.serverPath))
                });
                res.status(201).json(post);
            });
        } catch (error) {
            console.log(error)
            res.status(500).json({error: error.message});
        }
    }

    static async getPosts(req, res) {
        try {
            const {
                page,
                q,
                order
            } = req.query

            const params = {
                limit: page * 5,
            }
            if (q) {
                params.where = {
                    [Op.or]: [
                        {title: {[Op.iLike]: `%${q}%`}},
                        {body: {[Op.iLike]: `%${q}%`}}
                    ]
                }
                params.limit = undefined
                params.offset = 0
            }

            const {count, rows: posts} = await Post.findAndCountAll({
                include: [{
                    model: User, as: 'user',
                    attributes: {exclude: ['password', 'refreshToken', 'updatedAt']}
                }],
                order: [['createdAt', order]],
                ...params
            });

            res.json({posts, hasMore: count > page * 5});
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    }

    static async updatePost(req, res) {
        try {
            const {id} = req.params;
            const {title, body} = req.body;
            let files = [];

            if (req.files) {
                files = req.files.map(file => `/uploads/${file.filename}`);
            }

            const post = await Post.findByPk(id);
            if (!post) {
                return res.status(404).json({message: 'Post not found'});
            }

            post.title = title;
            post.body = body;
            post.files = JSON.stringify(files);
            await post.save();

            res.json(post);
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    }

    static async deletePost(req, res) {
        try {
            const {id} = req.params;
            const post = await Post.findByPk(id);
            if (!post) {
                return res.status(404).json({message: 'Post not found'});
            }

            await post.destroy();
            res.status(204).send();
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    }
}

module.exports = PostController;
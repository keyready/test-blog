const {User, Post} = require('../models');
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

function replaceFilenames(body, files) {
    let localFiles = [];

    let newHTMLBody = body
    if (files) {
        localFiles = files.map(file => ({
            originalName: file.originalname,
            serverPath: `/uploads/${file.filename}`
        }));

        localFiles.forEach(({originalName, serverPath}, index) => {
            newHTMLBody = newHTMLBody.replace(originalName, serverPath.split('/uploads/')[1]);
        });
    }

    return {newHTMLBody, localFiles}
}

class PostController {
    static async createPost(req, res) {
        try {
            upload(req, res, async (err) => {
                if (err) {
                    return res.status(500).json({error: err.message});
                }

                const {title, body} = req.body;
                const {id: userId} = req.user

                const {localFiles: files, newHTMLBody} = replaceFilenames(body, req.files)

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
                order,
                owner
            } = req.query

            const params = {
                limit: page * 5,
                where: {}
            }

            if (q) {
                params.where = {
                    [Op.or]: [
                        {title: {[Op.iLike]: `%${q}%`}},
                        {body: {[Op.iLike]: `%${q}%`}},
                    ],
                }
                params.limit = undefined
                params.offset = 0
            }

            if (owner === 'own') {
                params.where = {
                    ...params.where,
                    ...(owner === 'own' ? {userId: req.user.id} : {})
                }
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

    static async getPostByPk(req, res) {
        try {
            const {id} = req.params;

            console.log(id)

            const post = await Post.findByPk(id, {raw: true});

            if (!post) {
                return res.status(404).json({message: 'Post not found'});
            }

            res.status(200).json(post);
        } catch (error) {
            console.log(error)
            res.status(500).json({error: error.message});
        }
    }

    static async updatePost(req, res) {
        try {
            upload(req, res, async () => {
                const {id} = req.params;
                const {title, body} = req.body;

                const post = await Post.findByPk(id);
                if (!post) {
                    return res.status(404).json({message: 'Post not found'});
                }

                const {localFiles: files, newHTMLBody} = replaceFilenames(body, req.files)

                post.title = title;
                post.body = newHTMLBody;
                post.files = JSON.stringify(files);
                const newPost = await post.save();

                res.json(newPost);
            })
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
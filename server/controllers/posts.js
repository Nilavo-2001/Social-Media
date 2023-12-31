const post = require('../models/Post');
const handleServerError = require('../utils/serverError');
const comments = require('../models/Comment');
const like = require('../models/Like');

/* CREATE */
const createPost = async (req, res) => {
    try {
        // to improve security
        console.log('called');
        const { userId, description, picturePath } = req.body;
        //const curUser = await user.findById(userId);
        const newPost = new post({
            user: userId,
            description,
            picturePath: (req.file) ? (req.file.filename) : (''),
        });
        await newPost.save();
        const allPosts = await post.find().populate('user', ['firstName', 'lastName', 'picturePath', 'location']);
        console.log(allPosts);
        return res.status(201).json(allPosts);
    } catch (err) {
        handleServerError(res, err, 409);
    }
};

/* READ */
const getFeedPosts = async (req, res) => {
    try {
        const allPosts = await post.find().populate('user', ['firstName', 'lastName', 'picturePath', 'location']).populate('likes').populate('comments');
        console.log(allPosts);
        return res.status(200).json(allPosts);
    } catch (err) {
        handleServerError(res, err, 404);
    }
};

const getUserPosts = async (req, res) => {
    try {
        const { userId } = req.params;
        const curPosts = await post.find({ user: userId }).populate('user', ['firstName', 'lastName', 'picturePath', 'location']).populate('likes');
        console.log(curPosts);
        res.status(200).json(curPosts);
    } catch (err) {
        handleServerError(res, err, 404);
    }
};

// Delete

const delPost = async (req, res) => {
    try {
        const userId = req.user._id;
        const { postId, isProfile } = req.body;
        await post.findByIdAndDelete(postId);
        await comments.deleteMany({
            post: postId
        })
        await like.deleteMany({
            likeable: postId
        })
        if (isProfile) {
            const curPosts = await post.find({ user: userId }).populate('user', ['firstName', 'lastName', 'picturePath', 'location']).populate('likes');
            res.status(200).json(curPosts);
        }
        else {
            const curPosts = await post.find().populate('user', ['firstName', 'lastName', 'picturePath', 'location']).populate('likes');
            res.status(200).json(curPosts);
        }
    } catch (err) {
        handleServerError(res, err, 404);
    }
}

module.exports = { createPost, getFeedPosts, getUserPosts, delPost };

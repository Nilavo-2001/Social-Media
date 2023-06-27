const comments = require('../models/Comment');
const like = require('../models/Like');
const post = require('../models/Post');

const toggleLike = async (req, res) => {
    try {
        const { id } = req.params;
        const { userId, type } = req.body;
        if (type == 'post') {
            // let arr = [];
            const curPost = await post.findById(id);
            const { likes } = await curPost.populate('likes');
            let isLiked = false;
            let likeId = '';
            let index = 0
            for (index = 0; index < likes.length; index++) {
                const { user, _id } = likes[index];
                if (user == userId) {
                    isLiked = true;
                    likeId = _id;
                    break;
                }
            }
            if (isLiked) {
                curPost.likes.splice(index, 1);
                await like.findByIdAndDelete(likeId);
            } else {
                let newLike = await like.create({
                    user: userId,
                    likeable: id,
                    onModel: 'post'
                });
                curPost.likes.push(newLike._id);
            }
            await curPost.save();
            await curPost.populate('user', ['firstName', 'lastName', 'picturePath', 'location']);
            await curPost.populate('likes');
            await curPost.populate('comments');
            res.status(200).json(curPost);
        }
        else if (type == 'comment') {
            const curComment = await comments.findById(id);
            const { likes } = await curComment.populate('likes');
            let isLiked = false;
            let likeId = '';
            for (let index = 0; index < likes.length; index++) {
                const { user, _id } = likes[index];
                if (user == userId) {
                    isLiked = true;
                    likeId = _id;
                    break;
                }
            }
            if (isLiked) {
                curComment.likes.splice(index, 1);
                await like.findByIdAndDelete(likeId);
            } else {
                let newLike = await like.create({
                    user: userId,
                    likeable: id,
                    onModel: 'comment'
                });
                curComment.likes.push(newLike._id);
            }
            await curComment.save();
            res.status(200).json(curComment);
        }
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

module.exports = { toggleLike };
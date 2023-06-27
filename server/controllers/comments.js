const comments = require("../models/Comment");
const post = require("../models/Post");
const handleServerError = require("../utils/serverError");
const createComment = async (req, res) => {
    try {
        const curUser = req.user;
        const user = curUser._id;
        const userName = curUser.firstName + " " + curUser.lastName;
        const { content, postId } = req.body;
        const comment = await comments.create({
            content,
            post: postId,
            user,
            userName
        });
        let curPost = await post.findById(postId);
        curPost.comments.push(comment._id);
        await curPost.save();
        await curPost.populate('user', ['firstName', 'lastName', 'picturePath', 'location']);
        await curPost.populate('likes');
        await curPost.populate('comments');
        console.log(curPost);
        res.status(200).json(curPost);
    } catch (err) {
        handleServerError(res, err, 409);
    }
}

module.exports = createComment;
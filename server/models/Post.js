const mongoose = require('mongoose');

const postSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users'
        },
        location: String,
        description: String,
        picturePath: String,
        likes: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'like'
        }],
        comments: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'comment'
        }],
    },
    { timestamps: true }
);

const post = mongoose.model("post", postSchema);

module.exports = post
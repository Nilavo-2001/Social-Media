const mongoose = require("mongoose");
const commentSchema = new mongoose.Schema(
    {
        content: {
            type: String,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
        },
        userName: {
            type: String
        },
        post: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "post",
        },
        likes: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "like",
            },
        ],
    },
    {
        timestamps: true,
    }
);
const comments = mongoose.model("comment", commentSchema);
module.exports = comments;

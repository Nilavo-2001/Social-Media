const mongoose = require("mongoose");
//schema for polymorphic relationships.
const likeSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
        },
        likeable: { // this reffers to the parent of the like
            type: mongoose.Schema.Types.ObjectId,
            require: true,
            refPath: "onModel", // a dynamic path as the parent is not fixed
        },
        onModel: {
            // this reffers to name of the parent model 
            type: String,
            require: true,
            enum: ["post", "comment"],
        },
    },
    {
        timestamps: true,
    }
);

const like = mongoose.model("like", likeSchema);
module.exports = like;

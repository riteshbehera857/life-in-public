"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const postSchema = new mongoose_1.Schema({
    cover: {
        type: String,
    },
    caption: {
        type: String,
        maxlength: [300, "This number of characters can't be more than 300."]
    },
    body: {
        type: String,
        maxlength: [300, "This number of characters can't be more than 300."]
    },
    comments: [
        {
            type: "ObjectId",
            ref: "Comment",
        },
    ],
    created_by: {
        type: "ObjectId",
        ref: "User",
        required: true,
    },
}, {
    timestamps: true
});
postSchema.pre("/^find/", function (next) {
    this.populate("created_by");
    next();
});
const Post = (0, mongoose_1.model)("Post", postSchema);
exports.default = Post;
//# sourceMappingURL=post.model.js.map
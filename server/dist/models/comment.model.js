"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const commentSchema = new mongoose_1.Schema({
    content: {
        type: String,
        required: true,
    },
    post: {
        type: "ObjectID",
        ref: "Post",
    },
    created_by: {
        type: "ObjectID",
        ref: "User",
    },
});
const Comment = (0, mongoose_1.model)("Comment", commentSchema);
exports.default = Comment;
//# sourceMappingURL=comment.model.js.map
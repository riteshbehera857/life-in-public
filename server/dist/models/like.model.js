"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const likesSchema = new mongoose_1.Schema({
    post: {
        type: "ObjectID",
        ref: "Post"
    },
    user: {
        type: "ObjectID",
        ref: "User"
    }
}, {
    timestamps: true
});
const Likes = (0, mongoose_1.model)("Likes", likesSchema);
exports.default = Likes;
//# sourceMappingURL=like.model.js.map
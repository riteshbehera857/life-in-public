"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const followSchema = new mongoose_1.Schema({
    follower: {
        type: "ObjectId",
        ref: "User"
    },
    following: {
        type: "ObjectId",
        ref: "User"
    }
}, {
    timestamps: true
});
const Follows = (0, mongoose_1.model)("Follows", followSchema);
exports.default = Follows;
//# sourceMappingURL=follow.model.js.map
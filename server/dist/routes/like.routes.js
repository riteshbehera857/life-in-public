"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_handler_1 = __importDefault(require("../middlewares/auth.handler"));
const like_controller_1 = require("./../controller/like.controller");
const router = (0, express_1.Router)();
// router.use(protectRoute)
router.route("/:postID").get(auth_handler_1.default, like_controller_1.getAllLikes).post(like_controller_1.addLike);
exports.default = router;
//# sourceMappingURL=like.routes.js.map
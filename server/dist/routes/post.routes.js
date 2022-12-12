"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const post_controller_1 = require("../controller/post.controller");
const router = express_1.default.Router();
router.route("/").get(post_controller_1.getPosts);
router.route("/:id").get(post_controller_1.getPost).delete(post_controller_1.deletePost);
router.route("/create_post").post(post_controller_1.createPost);
exports.default = router;
//# sourceMappingURL=post.routes.js.map
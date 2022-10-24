"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("../controller/user.controller");
const router = express_1.default.Router();
router.route("/").get(user_controller_1.getCurrentUser);
router.route("/update-likes/:id").patch(user_controller_1.updateUserLikedPosts);
router.route("/update-posts/:id").patch(user_controller_1.updateUserPosts);
exports.default = router;

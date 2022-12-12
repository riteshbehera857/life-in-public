"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createComment = void 0;
const comment_model_1 = __importDefault(require("../models/comment.model"));
const post_model_1 = __importDefault(require("../models/post.model"));
const createComment = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { content, post, created_by } = req.body;
        if (!content || !post || !created_by)
            throw new Error("Please provide all the required fields");
        const comment = yield comment_model_1.default.create({ content, created_by, post });
        yield post_model_1.default.findByIdAndUpdate(post, {
            $push: {
                comments: comment._id,
            },
        });
        res.status(201).json({
            message: "success",
            error: false,
            data: {
                comment,
            },
        });
    }
    catch (error) {
        next(error);
    }
});
exports.createComment = createComment;
//# sourceMappingURL=comment.controller.js.map
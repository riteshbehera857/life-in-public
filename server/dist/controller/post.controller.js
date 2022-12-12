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
exports.deletePost = exports.createPost = exports.getPost = exports.getPosts = void 0;
const cloudinary_1 = require("../cloudinary");
const post_model_1 = __importDefault(require("../models/post.model"));
const files_model_1 = __importDefault(require("../models/files.model"));
const follow_model_1 = __importDefault(require("../models/follow.model"));
const getPosts = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const queryObj = Object.assign({}, req.query);
        const requestedUser = req.query.user;
        const loggedinUser = req.query.currUser;
        const sort = req.query.sort;
        const fields = req.query.fields;
        const excludedFields = ['limit', 'fields'];
        excludedFields.forEach(el => delete queryObj[el]);
        const userFollowing = yield follow_model_1.default.find({
            follower: loggedinUser
        }).distinct('following');
        const followings = [...userFollowing, loggedinUser];
        let queryStr = JSON.stringify(queryObj);
        queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);
        let query = post_model_1.default.find(JSON.parse(queryStr)).populate("created_by");
        if (requestedUser) {
            query = post_model_1.default.find({
                created_by: requestedUser
            }).populate("created_by");
        }
        if (loggedinUser) {
            query = post_model_1.default.find({
                created_by: {
                    $in: followings
                }
            }).populate("created_by");
        }
        if (sort) {
            query = query.sort(`-${sort}`);
        }
        if (fields) {
            const requestedFields = fields.split(",").join(" ");
            query = query.select(requestedFields);
        }
        else {
            query = query.select("-__v");
        }
        const posts = yield query;
        res.status(200).json({
            status: "success",
            error: false,
            data: {
                posts,
            },
        });
    }
    catch (error) {
        next(error);
    }
});
exports.getPosts = getPosts;
const getPost = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const post = yield post_model_1.default.findById(id)
            .populate("created_by")
            .populate({
            path: "comments",
            populate: {
                path: "created_by",
                model: "User",
            },
        });
        res.status(200).json({
            status: "success",
            error: false,
            data: {
                post,
            },
        });
    }
    catch (error) {
        next(error);
    }
});
exports.getPost = getPost;
const createPost = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { caption, likes, body, created_by } = req.body;
        let uploadedFile;
        if (req.body.file) {
            const uploadedResponse = yield cloudinary_1.cloudinary.uploader.upload(req.body.file);
            yield files_model_1.default.create({ file: uploadedResponse === null || uploadedResponse === void 0 ? void 0 : uploadedResponse.secure_url });
            uploadedFile = uploadedResponse === null || uploadedResponse === void 0 ? void 0 : uploadedResponse.secure_url;
        }
        if (!req.body)
            throw new Error("Please fill all the required fields");
        yield post_model_1.default.create({
            cover: uploadedFile ? uploadedFile : null,
            body,
            caption,
            likes,
            created_by,
        });
        res.status(201).json({
            status: "success",
            error: false,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.createPost = createPost;
const deletePost = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        yield post_model_1.default.findByIdAndDelete(id);
        res.status(200).json({
            status: "success",
            error: false,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.deletePost = deletePost;
//# sourceMappingURL=post.controller.js.map
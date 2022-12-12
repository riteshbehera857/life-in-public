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
exports.updateUserLikedPosts = exports.updateUserPosts = exports.updateUser = exports.getUser = exports.getUsers = exports.getCurrentUser = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth_model_1 = __importDefault(require("../models/auth.model"));
const getCurrentUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let token;
        if (req.headers.authorization &&
            req.headers.authorization.startsWith("Bearer")) {
            token = req.headers.authorization.split(" ")[1];
        }
        if (!token) {
            return res.status(401).json({
                status: "falied",
                error: true,
                message: "You'r not logged in, please try again"
            });
        }
        jsonwebtoken_1.default.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                if (err)
                    return res.status(403).json({
                        status: "failed",
                        error: true,
                        message: "forbidden"
                    });
                const user = yield auth_model_1.default.findById(decoded.id);
                if (!user)
                    return res.status(401).json({
                        status: "failed",
                        error: true,
                        message: "Unauthorized"
                    });
                return res.status(200).json({
                    status: "success",
                    error: false,
                    user,
                });
            }
            catch (error) {
                return res.status(401).json({
                    status: "failed",
                    error: true,
                    message: error.message
                });
            }
        }));
    }
    catch (error) {
        next(error);
    }
});
exports.getCurrentUser = getCurrentUser;
const getUsers = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { q } = req.query;
        const queryString = new RegExp(`${q}`);
        const data = yield auth_model_1.default.find({ fakeEmail: { $regex: queryString, $options: 'i' } });
        return res.status(200).json({
            status: "success",
            error: false,
            results: data.length,
            data: {
                data
            }
        });
    }
    catch (error) {
        next(error);
    }
});
exports.getUsers = getUsers;
const getUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({
                status: "failed",
                error: true,
                message: "Please provide an user id"
            });
        }
        const user = yield auth_model_1.default.findById(id);
        return res.status(200).json({
            status: "success",
            error: false,
            user
        });
    }
    catch (error) {
        next(error);
    }
});
exports.getUser = getUser;
const updateUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { username, avatar, fakeEmail } = req.body;
        if (!id) {
            return res.status(404).json({
                status: 'fail',
                error: true
            });
        }
        yield auth_model_1.default.findByIdAndUpdate(id, {
            username: username !== null && username !== void 0 ? username : username,
            avatar: avatar !== null && avatar !== void 0 ? avatar : avatar,
            fakeEmail: fakeEmail !== null && fakeEmail !== void 0 ? fakeEmail : fakeEmail
        });
        res.status(200).json({
            status: 'success',
            error: false
        });
    }
    catch (error) {
        next(error);
    }
});
exports.updateUser = updateUser;
const updateUserPosts = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { postID } = req.body;
        if (!postID)
            throw new Error("No post created");
        const updatedUser = yield auth_model_1.default.findByIdAndUpdate(id, {
            $push: { posts: postID },
        });
        res.status(200).json({
            status: "success",
            error: false,
            data: {
                updatedUser,
            },
        });
    }
    catch (error) {
        next(error);
    }
});
exports.updateUserPosts = updateUserPosts;
const updateUserLikedPosts = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { postID } = req.body;
        if (!postID)
            throw new Error("Please check one more time if you really like that post");
        const updatedUser = yield auth_model_1.default.findByIdAndUpdate({ _id: id }, { $push: { likedPosts: postID } });
        res.status(200).json({
            status: "success",
            error: false,
            data: {
                updatedUser,
            },
        });
    }
    catch (error) {
        next(error);
    }
});
exports.updateUserLikedPosts = updateUserLikedPosts;
//# sourceMappingURL=user.controller.js.map
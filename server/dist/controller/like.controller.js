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
exports.getAllLikes = exports.addLike = void 0;
const like_model_1 = __importDefault(require("./../models/like.model"));
const addLike = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { postID } = req.params;
        const { userID } = req.body;
        if (!postID || !userID) {
            throw new Error("Some error occured, Please try after some time");
        }
        const data = yield like_model_1.default.find({
            user: userID,
            post: postID
        });
        if (data.length) {
            yield like_model_1.default.deleteMany({
                user: userID,
                post: postID
            });
            return res.status(200).json({
                status: "success",
                error: false,
            });
        }
        yield like_model_1.default.create({
            post: postID,
            user: userID
        });
        return res.status(200).json({
            status: "success",
            error: false,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.addLike = addLike;
const getAllLikes = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { postID } = req.params;
        const { userID } = req.query;
        let currentUserLikedOrNot;
        if (!postID)
            throw new Error("Some error occured");
        const userLiked = yield like_model_1.default.find({
            post: postID,
            user: userID
        });
        if (userLiked.length) {
            currentUserLikedOrNot = true;
        }
        else {
            currentUserLikedOrNot = false;
        }
        const data = yield like_model_1.default.find({
            post: postID
        });
        if (!data)
            return res.status(200).json({ status: "success", error: false, data: 'no-content' });
        return res.status(200).json({
            status: "success",
            error: false,
            currentUserLikedOrNot,
            data
        });
    }
    catch (error) {
        next(error);
    }
});
exports.getAllLikes = getAllLikes;
//# sourceMappingURL=like.controller.js.map
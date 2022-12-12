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
exports.addFollow = exports.getFollows = void 0;
const follow_model_1 = __importDefault(require("../models/follow.model"));
const getFollows = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let currentUserFollowingOrNot;
        const userFollowing = yield follow_model_1.default.find({
            follower: req.query.currUser,
            following: req.query.following
        });
        if (userFollowing.length) {
            currentUserFollowingOrNot = true;
        }
        else {
            currentUserFollowingOrNot = false;
        }
        const followers = yield follow_model_1.default.find({
            following: req.query.following
        });
        const following = yield follow_model_1.default.find({
            follower: req.query.following
        });
        return res.status(200).json({
            status: "success",
            error: false,
            currentUserFollowingOrNot,
            data: {
                followers,
                following
            }
        });
    }
    catch (error) {
        next(error);
    }
});
exports.getFollows = getFollows;
const addFollow = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { follower } = req.query;
        const { following } = req.body;
        if (!follower || !following) {
            throw new Error("Some error occured, please try after sometime");
        }
        const data = yield follow_model_1.default.find({
            follower,
            following
        });
        if (data.length) {
            yield follow_model_1.default.deleteMany({
                follower,
                following
            });
            return res.status(200).json({
                status: "success",
                error: false,
            });
        }
        yield follow_model_1.default.create({
            follower,
            following
        });
        return res.status(201).json({
            status: "success",
            error: false,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.addFollow = addFollow;
//# sourceMappingURL=follow.controller.js.map
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
exports.logout = exports.refresh = exports.login = exports.signup = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const helpers_1 = require("../helpers");
const auth_model_1 = __importDefault(require("../models/auth.model"));
const signup = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { firstname, lastname, email, password, cover } = req.body;
        if (!req.body) {
            res.json({
                status: "failed",
                error: true,
                message: "Please fill all the required fields",
            });
        }
        const user = yield auth_model_1.default.findOne({ email });
        if (user) {
            res.json({
                status: "failed",
                error: true,
                message: "A user with this email already exists",
            });
        }
        const newUser = yield auth_model_1.default.create({
            firstname,
            lastname,
            email,
            password,
            cover,
        });
        res.status(201).json({
            status: "success",
            error: false,
            data: { user: newUser },
        });
    }
    catch (error) {
        next(error);
    }
});
exports.signup = signup;
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(401).json({
                status: "failed",
                error: true,
                message: "Please fill all the required fields",
            });
        }
        const user = yield auth_model_1.default.findOne({ email }).select('password');
        if (!user || !(yield (0, helpers_1.compareHash)(password, user.password))) {
            return res.status(401).json({
                status: "failed",
                error: true,
                message: "Invalid email or password, try again",
            });
        }
        const accessToken = (0, helpers_1.assignAccessToken)(user._id, 'ACCESS');
        const refreshToken = (0, helpers_1.assignAccessToken)(user._id, 'REFRESH');
        res.cookie("JWT", refreshToken, {
            path: "/",
            expires: new Date(Date.now() + 24 * 60 * 60 * 1000 * 15),
            httpOnly: true,
            sameSite: "lax",
        });
        res.status(200).json({
            status: "success",
            error: false,
            accessToken,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.login = login;
const refresh = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { JWT } = req.cookies;
    if (!JWT)
        return res.status(401).json({
            status: "failed",
            error: true,
            message: "Unauthorized"
        });
    const refreshToken = JWT;
    jsonwebtoken_1.default.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            console.log("🚀 ~ file: auth.controller.ts ~ line 102 ~ err", err);
            if (err)
                return res.status(403).json({
                    status: "failed",
                    error: true,
                    message: "Forbidden"
                });
            const user = yield auth_model_1.default.findById(decoded.id);
            if (!user)
                return res.status(401).json({
                    status: "failed",
                    error: true,
                    message: "Unathorized"
                });
            const accessToken = (0, helpers_1.assignAccessToken)(user._id, 'ACCESS');
            return res.status(200).json({
                status: "success",
                error: false,
                accessToken
            });
        }
        catch (error) {
            return res.status(404).json({
                status: "failed",
                error: true,
                message: error.message,
            });
        }
    }));
});
exports.refresh = refresh;
const logout = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { JWT } = req.cookies;
        if (!JWT)
            return res.status(204);
        res.clearCookie('JWT', { sameSite: 'lax', httpOnly: true, secure: true });
        return res.status(200).json({
            status: "success",
            error: false,
            message: "User logged out successfully"
        });
    }
    catch (err) {
        next(err);
    }
});
exports.logout = logout;
//# sourceMappingURL=auth.controller.js.map
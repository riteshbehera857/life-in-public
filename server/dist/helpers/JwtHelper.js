"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.assignAccessToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const assignAccessToken = (id, type) => {
    return jsonwebtoken_1.default.sign({ id }, type === 'ACCESS' ? process.env.ACCESS_TOKEN_SECRET : process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: type === 'ACCESS' ? process.env.JWT_EXPIRES_IN_DEV : process.env.JWT_REFRESH_EXPIRES_IN,
    });
};
exports.assignAccessToken = assignAccessToken;
//# sourceMappingURL=JwtHelper.js.map
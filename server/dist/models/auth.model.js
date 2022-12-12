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
const mongoose_1 = require("mongoose");
const validator_1 = __importDefault(require("validator"));
const helpers_1 = require("../helpers");
const userSchema = new mongoose_1.Schema({
    firstname: {
        type: String,
        required: [true, "Firstname is required"],
        select: false,
        maxlength: [40, "The firstname shouldn't be more than 40 characters"]
    },
    lastname: {
        type: String,
        select: false,
        required: [true, "Lastname is required"],
        maxlength: [40, "The lastname shouldn't be more than 40 characters"]
    },
    email: {
        type: String,
        unique: true,
        lowercase: true,
        select: false,
        validate: [validator_1.default.isEmail, "Please provide a valid email"],
    },
    password: {
        type: String,
        required: [true, "Please Provide a password"],
        minlength: 8,
        select: false
    },
    username: String,
    fakeEmail: String,
    avatar: String,
    cover: String,
});
userSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!this.isModified("password"))
            return next();
        this.password = yield (0, helpers_1.createHash)(this.password, 12);
        next();
    });
});
const User = (0, mongoose_1.model)("User", userSchema);
exports.default = User;
//# sourceMappingURL=auth.model.js.map
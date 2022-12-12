"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_controller_1 = require("../controller/auth.controller");
const router = express_1.default.Router();
router.route("/signup").post(auth_controller_1.signup);
router.route("/login").post(auth_controller_1.login);
router.route("/refresh").get(auth_controller_1.refresh);
router.route("/logout").post(auth_controller_1.logout);
exports.default = router;
//# sourceMappingURL=auth.routes.js.map
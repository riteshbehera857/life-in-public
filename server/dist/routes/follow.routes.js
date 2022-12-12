"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const follow_controller_1 = require("../controller/follow.controller");
const router = (0, express_1.Router)();
router.route("/").get(follow_controller_1.getFollows).post(follow_controller_1.addFollow);
exports.default = router;
//# sourceMappingURL=follow.routes.js.map
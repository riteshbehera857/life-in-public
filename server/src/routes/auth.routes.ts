import express from "express";
import { login, signup, refresh, logout } from "../controller/auth.controller";

const router = express.Router();

router.route("/signup").post(signup);
router.route("/login").post(login);
router.route("/refresh").get(refresh);
router.route("/logout").post(logout);

export default router;

import express from "express";
import multer from "multer";
import { createComment } from "../controller/comment.controller";

const router = express.Router();

router.route("/create").post(createComment);

export default router;

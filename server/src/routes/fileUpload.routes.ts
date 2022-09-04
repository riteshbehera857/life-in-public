import express from "express";
import { fileUpload } from "../controller/upload.controller";

const router = express.Router();

router.route("/").post(fileUpload);

export default router;

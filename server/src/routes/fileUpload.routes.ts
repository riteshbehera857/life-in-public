import express from "express";
import multer from "multer";
import { fileUpload } from "../controller/upload.controller";

const router = express.Router();
const multerStorage = multer.memoryStorage();

const upload = multer({
  storage: multerStorage,
});

router.route("/").post(upload.single("file"), fileUpload);

export default router;

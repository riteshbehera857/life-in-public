import express from "express";
import multer from "multer";
import protectRoute from "../middlewares/auth.handler";
import {
  createPost,
  deletePost,
  getPost,
  getPosts,
  updatePostLikes,
} from "../controller/post.controller";

const router = express.Router();

const multerStorage = multer.memoryStorage();

const upload = multer({
  storage: multerStorage,
});

router.route("/").get(getPosts);
router.route("/:id").get(getPost).delete(deletePost);
router.route("/create_post").post(upload.single("cover"), createPost);
router.route("/update-post-likes/:id").patch(updatePostLikes);

export default router;

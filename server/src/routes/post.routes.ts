import express from "express";
import protectRoute from "../middlewares/auth.handler";
import {
  createPost,
  deletePost,
  getPost,
  getPosts,
  updatePostLikes,
  updatePostComment,
} from "../controller/post.controller";

const router = express.Router();

router.route("/").get(getPosts);
router.route("/:id").get(getPost).delete(deletePost);
router.route("/create_post").post(createPost);
router.route("/update-post-likes/:id").patch(updatePostLikes);
router.route("/update-post-comment/:id").patch(updatePostComment);

export default router;

import express from "express";
import {
  getCurrentUser,
  updateUser,
  updateUserLikedPosts,
  updateUserPosts,
} from "../controller/user.controller";

const router = express.Router();

router.route("/").get(getCurrentUser);
router.route("/:id").patch(updateUser)
router.route("/update-likes/:id").patch(updateUserLikedPosts);
router.route("/update-posts/:id").patch(updateUserPosts);

export default router;

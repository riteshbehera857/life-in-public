import { Request, Response, NextFunction } from "express";
import User from "../models/auth.model";

export const updateUserPosts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const { postID } = req.body;
    if (!postID) throw new Error("No post created");
    const updatedUser = await User.findByIdAndUpdate(id, {
      $push: { posts: postID },
    });
    res.status(200).json({
      status: "success",
      error: false,
      data: {
        updatedUser,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const updateUserLikedPosts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const { postID } = req.body;
    if (!postID)
      throw new Error(
        "Please check one more time if you really like that post"
      );
    const updatedUser = await User.findByIdAndUpdate(
      { _id: id },
      { $push: { likedPosts: postID } }
    );

    res.status(200).json({
      status: "success",
      error: false,
      data: {
        updatedUser,
      },
    });
  } catch (error) {
    next(error);
  }
};

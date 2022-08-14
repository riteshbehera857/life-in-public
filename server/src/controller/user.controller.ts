import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../helpers";
import User from "../models/auth.model";

export const getCurrentUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Get the token and check if it exists
    let token;
    let user;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      res.status(401);
      throw new Error("You are not logged in, Please login to get access");
    }
    // validate the token
    const decoded = verifyToken(token);

    //  find user on basis of the decoded token id
    user = await User.findById(decoded.id);

    res.status(200).json({
      status: "success",
      user,
    });
  } catch (error) {
    next(error);
  }
};

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

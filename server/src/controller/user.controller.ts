import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../helpers";
import User from "../models/auth.model";

export const getCurrentUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const cookie = req.headers.cookie;
    const token = cookie.split("=")[1];
    let user;

    if (!token) {
      res.status(401);
      throw new Error("You are not logged in, Please login to get access");
    }

    const decoded = verifyToken(token);

    user = await User.findById(decoded.id);
    res.status(200).json({
      status: "success",
      user,
    });
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (req: Request,
  res: Response,
  next: NextFunction) => {
  try {
    const { id } = req.params
    const {username, avatar, fakeEmail} = req.body
    if (!id) {
      return res.status(404).json({
        status: 'fail',
        error: true
      })
    }
    
    await User.findByIdAndUpdate(id, {
      username: username ?? username,
      avatar: avatar ?? avatar,
      fakeEmail: fakeEmail ?? fakeEmail
    })

    res.status(200).json({
      status: 'success',
      error: false
    })
  } catch (error) {
    next(error)
  }
}

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

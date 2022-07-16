import { Request, Response, NextFunction } from "express";
import sharp from "sharp";
import User from "../models/auth.model";
import Post from "../models/post.model";

const getPosts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const posts = await Post.find();
    res.status(200).json({
      status: "success",
      error: false,
      data: {
        posts,
      },
    });
  } catch (error) {
    next(error);
  }
};

const getPost = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const post = await Post.findById(id).populate({
      path: "likes",
      populate: [
        {
          path: "posts",
          select: "-likes",
          model: "Post",
        },
        {
          path: "likedPosts",
          select: "-likes",
          model: "Post",
        },
      ],
    });
    res.status(200).json({
      status: "success",
      error: false,
      data: {
        post,
      },
    });
  } catch (error) {
    next(error);
  }
};

const createPost = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { caption, likes } = req.body;
    if (!req.file) return next();

    req.body.cover = `life-in-public-${
      req.file.originalname
    }-${Date.now()}.jpeg`;

    await sharp(req.file.buffer)
      .toFormat("jpeg")
      .jpeg({ quality: 90 })
      .toFile(`public/uploads/post_cover/${req.body.cover}`);

    if (!req.body) throw new Error("Please fill all the required fields");

    await Post.create({
      cover: req.file
        ? req.body.cover
        : "https://unsplash.com/photos/JocU2pEsN9Q",
      caption,
      likes,
    });

    res.status(201).json({
      status: "success",
      error: false,
    });
  } catch (error) {
    next(error);
  }
};

const updatePostLikes = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    if (!id) throw new Error("Please provide a valid postID");

    const { userID } = req.body;
    if (!userID) throw new Error("Please provide a valid userID");

    await User.findByIdAndUpdate(id, {
      $push: {
        likes: userID,
      },
    });

    res.status(200).json({
      status: "success",
      error: false,
    });
  } catch (error) {
    next(error);
  }
};

const deletePost = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    await Post.findByIdAndDelete(id);
    res.status(200).json({
      status: "success",
      error: false,
    });
  } catch (error) {
    next(error);
  }
};

export { getPosts, getPost, createPost, updatePostLikes, deletePost };

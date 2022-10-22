import { Request, Response, NextFunction } from "express";
import { cloudinary } from "../../cloudinary";
import User from "../models/auth.model";
import Post from "../models/post.model";
import File from "../models/files.model";

const getPosts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const posts = await Post.find()
      .populate("created_by")
      .populate("likes")
      .sort({ created_at: 1 });
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
    const post = await Post.findById(id)
      .populate("likes")
      .populate("created_by")
      .populate({
        path: "comments",
        populate: {
          path: "created_by",
          model: "User",
        },
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
    const { caption, likes, body, created_by } = req.body;
    let uploadedFile;
    if (req.body.file) {
      const uploadedResponse = await cloudinary.uploader.upload(req.body.file);
      await File.create({ file: uploadedResponse?.secure_url });
      uploadedFile = uploadedResponse?.secure_url;
    }
    if (!req.body) throw new Error("Please fill all the required fields");

    const post = await Post.create({
      cover: uploadedFile ? uploadedFile : null,
      body,
      caption,
      likes,
      created_by,
    });

    await User.findByIdAndUpdate(post.created_by, {
      $push: {
        posts: post._id,
      },
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

    const post = await Post.findOne({ _id: id });

    if (post?.likes?.includes(userID)) {
      try {
        await Post.findByIdAndUpdate(
          id,
          {
            $pull: {
              likes: userID,
            },
          },
          { multi: true }
        );

        return res.status(200).json({
          status: "success",
          error: false,
        });
      } catch (error) {
        next(error);
      }
    } else {
      await Post.findByIdAndUpdate(id, {
        $push: {
          likes: userID,
        },
      });

      await User.findByIdAndUpdate(userID, {
        $push: {
          likedPosts: id,
        },
      });

      res.status(200).json({
        status: "success",
        error: false,
      });
    }
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

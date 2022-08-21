import { Request, Response, NextFunction } from "express";
import Comment from "../models/comment.model";

const createComment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { content, post, created_by } = req.body;
    if (!content || !post || !created_by)
      throw new Error("Please provide all the required fields");

    const comment = await Comment.create({ content, created_by, post });
    res.status(201).json({
      message: "success",
      error: false,
      data: {
        comment,
      },
    });
  } catch (error) {
    next(error);
  }
};

export { createComment };

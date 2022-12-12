import { AppError } from './../utils/appError';
import { IGetUserAuthInfoRequest } from './../middlewares/auth.handler';
import { catchAsync } from './../utils/catchAsync';
import { Response, NextFunction } from 'express';
import Comment from '../models/comment.model';

export const getComment = catchAsync(
  async (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) => {
    const post = req.params.postId;
    const comment = await Comment.find({ post });
    res.status(200).json({
      status: 'success',
      error: false,
      results: comment.length,
      data: {
        comment,
      },
    });
  }
);

export const createComment = catchAsync(
  async (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) => {
    const user = req.user._id;
    const post = req.params.postId;

    const { content } = req.body;
    if (!content)
      return next(
        new AppError(
          "Comment can't be empty, please try again filling the required fields",
          400
        )
      );

    const comment = await Comment.create({ content, post, user });

    res.status(201).json({
      message: 'success',
      error: false,
      data: {
        comment,
      },
    });
  }
);

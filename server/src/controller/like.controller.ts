import { catchAsync } from './../utils/catchAsync';
import { AppError } from './../utils/appError';
import { IGetUserAuthInfoRequest } from './../middlewares/auth.handler';
import { NextFunction, Request, Response } from 'express';
import Like from './../models/like.model';

export const addLike = catchAsync(
  async (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) => {
    const post = req.params.postId;
    const user = req.user._id;

    // console.log({ post, user });

    if (!user) {
      return next(
        new AppError(
          'You are not authorized to perform this action!, please login to try again : line 18++',
          401
        )
      );
    }
    if (!post) {
      return next(
        new AppError(
          'No post found with this requested id!, please try again : line 26+',
          404
        )
      );
    }

    const data = await Like.find({
      user,
      post,
    });

    if (data.length) {
      await Like.deleteMany({
        user,
        post,
      });
      return res.status(200).json({
        status: 'success',
        error: false,
      });
    }

    await Like.create({
      post,
      user,
    });

    return res.status(200).json({
      status: 'success',
      error: false,
    });
  }
);

export const getAllLikes = catchAsync(
  async (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) => {
    const post = req.params.postId;
    const user = req.user._id;

    let currentUserLiked = false;

    if (!user) {
      return next(
        new AppError(
          'You are not authorized to perform this action!, please login to try again : line 70',
          401
        )
      );
    }
    if (!post) {
      return next(
        new AppError(
          'No post found with this requested id!, please try again : line 78',
          404
        )
      );
    }

    const userLiked = await Like.find({
      post,
      user,
    });

    if (userLiked.length) currentUserLiked = true;

    const data = await Like.find({ post });

    return res.status(200).json({
      status: 'success',
      error: false,
      currentUserLiked,
      data: {
        likes: data,
      },
    });
  }
);

import { AppError } from './../utils/appError';
import { IGetUserAuthInfoRequest } from './../middlewares/auth.handler';
import { catchAsync } from './../utils/catchAsync';
import { NextFunction, Request, Response } from 'express';
import Follows from '../models/follow.model';

export const getFollows = catchAsync(
  async (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) => {
    const user = req.user._id;
    const following = req.params.following;

    let currentUserFollowing;

    const userFollowing = await Follows.find({
      follower: user,
      following,
    });

    if (userFollowing.length) {
      currentUserFollowing = true;
    } else {
      currentUserFollowing = false;
    }

    const followers = await Follows.find({
      following,
    });
    const followings = await Follows.find({
      follower: following,
    });

    res.status(200).json({
      status: 'success',
      error: false,
      currentUserFollowing,
      data: {
        followers,
        followings,
      },
    });
  }
);

export const addFollow = catchAsync(
  async (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) => {
    const follower = req.user._id;
    const following = req.params.following;

    if (!follower || !following)
      return next(
        new AppError('followed or following user is not provided', 400)
      );

    await Follows.create({
      follower,
      following,
    });

    return res.status(201).json({
      status: 'success',
      error: false,
    });
  }
);

import { IGetUserAuthInfoRequest } from './../middlewares/auth.handler';
import { Request, Response, NextFunction } from 'express';
import { cloudinary } from '../cloudinary';
import Post from '../models/post.model';
import File from '../models/files.model';
import Follows from '../models/follow.model';
import { catchAsync } from '../utils/catchAsync';
import { AppError } from '..//utils/appError';

export const getPosts = catchAsync(
  async (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) => {
    // const queryObj = { ...req.query };
    const sort: any = req.query.sort;
    const fields: any = req.query.fields;

    const requestedUser = req.params.requestedUser;
    const loggedinUser = req.user._id;

    const loggedinUserFollowings: any = await Follows.find({
      follower: loggedinUser,
    }).distinct('following');

    const followings = [...loggedinUserFollowings, loggedinUser];

    // let queryStr = JSON.stringify(queryObj);
    // queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    let query = Post.find({
      created_by: {
        $in: followings,
      },
    });

    if (requestedUser)
      query = Post.find({
        created_by: requestedUser,
      });

    if (sort) {
      query = query.sort(`-${sort}`);
    } else {
      query = query.sort('-createdAt');
    }

    if (fields) {
      const requestedFields = fields.split(',').join(' ');
      query = query.select(requestedFields);
    } else {
      query = query.select('-__v');
    }

    const posts = await query;

    res.status(200).json({
      status: 'success',
      error: false,
      results: posts.length,
      data: {
        posts,
      },
    });
  }
);

export const getPost = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const post = await Post.findById(id).populate({
      path: 'comments',
      populate: {
        path: 'createdBy',
        model: 'User',
      },
    });

    res.status(200).json({
      status: 'success',
      error: false,
      data: {
        post,
      },
    });
  }
);

export const createPost = catchAsync(
  async (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) => {
    const user = req.user._id;

    if (!Object.keys(req.body).length) {
      return next(new AppError('Please provide all the required fields', 406));
    }

    const newPost = await Post.create({
      ...req.body,
      createdBy: user,
    });

    const post = await Post.find({ _id: newPost._id });

    res.status(201).json({
      status: 'success',
      error: false,
      data: {
        post,
      },
    });
  }
);

export const deletePost = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    await Post.findByIdAndDelete(id);
    res.status(200).json({
      status: 'success',
      error: false,
    });
  }
);

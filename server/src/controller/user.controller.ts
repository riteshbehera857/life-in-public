import { AppError } from './../utils/appError';
import { IGetUserAuthInfoRequest } from './../middlewares/auth.handler';
import { catchAsync } from './../utils/catchAsync';
import { Request, Response, NextFunction } from 'express';
import User from '../models/auth.model';

export const getMe = (
  req: IGetUserAuthInfoRequest,
  res: Response,
  next: NextFunction
) => {
  req.params.id = req.user._id.toString();
  next();
};

export const searchUsers = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { q } = req.query;
    const queryString = new RegExp(`${q}`);

    const data = await User.find({
      fakeEmail: { $regex: queryString, $options: 'i' },
    });

    return res.status(200).json({
      status: 'success',
      error: false,
      results: data.length,
      data: {
        data,
      },
    });
  }
);

export const getUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({
        status: 'failed',
        error: true,
        message: 'Please provide an user id',
      });
    }
    const user = await User.findById(id);
    return res.status(200).json({
      status: 'success',
      error: false,
      user,
    });
  }
);

export const updateUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const { username, avatar, fakeEmail } = req.body;

    if (!id)
      return next(
        new AppError('No user found with this id, please try again later!', 404)
      );

    if (!username || !avatar || !fakeEmail)
      return next(new AppError('Please provide all the fields', 404));

    const user = await User.findById(id);

    if (!user) return next(new AppError("User doesn't exist", 404));

    await User.findByIdAndUpdate(id, {
      ...req.body,
    });

    res.status(200).json({
      status: 'success',
      error: false,
    });
  }
);

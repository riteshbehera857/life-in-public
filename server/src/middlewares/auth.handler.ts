import { IUser } from './../../types.d';
import { AppError } from './../utils/appError';
import { promisify } from 'util';
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/auth.model';
import { catchAsync } from '../utils/catchAsync';

export interface IGetUserAuthInfoRequest extends Request {
  user: IUser;
}

const protectRoute = catchAsync(
  async (req: IGetUserAuthInfoRequest, _res: Response, next: NextFunction) => {
    let token: string;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return next(
        new AppError(
          'You are not logged in!, Please login to continue with the services!',
          401
        )
      );
    }

    const decoded = await promisify(jwt.verify)(
      token,
      process.env.ACCESS_TOKEN_SECRET
    );

    const user: IUser = await User.findById(decoded.id);
    req.user = user;
    next();
  }
);

export default protectRoute;

import { promisify } from 'util';
import { catchAsync } from './../utils/catchAsync';
import { AppError } from './../utils/appError';
import { bodyIsEmpty } from './../helpers/checkBody';
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { assignToken, compareHash } from '../helpers';
import User from '../models/auth.model';

const signup = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    if (bodyIsEmpty(req.body)) {
      return next(new AppError('Please provide all the required fields', 406));
    }

    const user = await User.findOne({ email: req.body.email });

    if (user)
      return next(new AppError('An user with this email already exists', 400));

    await User.create({
      ...req.body,
    });

    res.status(201).json({
      status: 'success',
      error: false,
    });
  }
);

const login = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    if (bodyIsEmpty(req.body)) {
      return next(new AppError('Please fill all the required fields!', 406));
    }

    const user = await User.findOne({ email }).select('password');

    if (!user || !(await compareHash(password, user.password)))
      return next(new AppError('Invalid email or password, try again', 401));

    const accessToken = assignToken(user._id, 'ACCESS');
    const refreshToken = assignToken(user._id, 'REFRESH');

    res.cookie('JWT', refreshToken, {
      path: '/',
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000 * 15),
      httpOnly: true,
      sameSite: 'lax',
    });

    res.status(200).json({
      status: 'success',
      error: false,
      accessToken,
    });
  }
);

const refresh = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { JWT } = req.cookies;

    if (!JWT) return next(new AppError('Unauthorized', 401));

    const refreshToken = JWT;

    const decoded = await promisify(jwt.verify)(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );

    const user = await User.findById(decoded.id);
    const accessToken = assignToken(user._id, 'ACCESS');

    res.status(200).json({
      status: 'success',
      error: false,
      accessToken,
    });
  }
);

const logout = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { JWT } = req.cookies;

    if (!JWT) return next(new AppError('Unauthorized', 401));

    res.clearCookie('JWT', { sameSite: 'lax', httpOnly: true, secure: true });

    return res.status(200).json({
      status: 'success',
      error: false,
      message: 'User logged out successfully',
    });
  }
);

export { signup, login, refresh, logout };

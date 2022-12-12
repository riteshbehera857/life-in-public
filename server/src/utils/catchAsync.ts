import { IGetUserAuthInfoRequest } from './../middlewares/auth.handler';
import { NextFunction, Request, Response } from 'express';

export const catchAsync = (
  fn: (
    req: Request | IGetUserAuthInfoRequest,
    res: Response,
    next: NextFunction
  ) => Promise<any>
) => {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
};

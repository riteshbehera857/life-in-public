import { Response, NextFunction } from 'express';
import { cloudinary } from '../cloudinary';
import { catchAsync } from './../utils/catchAsync';
import { IGetUserAuthInfoRequest } from './../middlewares/auth.handler';
import { AppError } from './../utils/appError';
import File from '../models/files.model';

export const fileUpload = catchAsync(
  async (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) => {
    const user = req.user._id;
    // const test = await cloudinary.v2.uploader.upload(req.file.path);

    console.log(req.file);

    // if (!req.body.file)
    //   return next(new AppError("The file can't be empty", 406));

    const uploadedResponse = await cloudinary.v2.uploader.upload(req.file.path);

    const file = await File.create({
      file: uploadedResponse?.secure_url,
      user,
    });

    res.status(201).json({
      status: 'success',
      error: false,
      data: {
        file,
      },
    });
  }
);

export const fileDelete = catchAsync(
  async (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) => {
    const fileId = req.params.id;

    if (!fileId)
      return next(new AppError('Please provide an valid file Id', 404));

    await File.findByIdAndDelete(fileId);

    res.status(200).json({
      status: 'success',
      error: false,
    });
  }
);

import { Request, Response, NextFunction } from "express";
import { cloudinary } from "../../cloudinary";

export const fileUpload = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.body.file) return next();
    const uploadedResponse = await cloudinary.uploader.upload(req.body.file);

    res.status(201).json({
      status: "success",
      error: false,
      data: uploadedResponse,
    });
  } catch (err) {
    next(err);
  }
};

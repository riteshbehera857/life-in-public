import { Request, Response, NextFunction } from "express";
import sharp from "sharp";
import File from "./../models/files.model";

export const fileUpload = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.file) return next();

    req.body.file = `life-in-public-${
      req.file.originalname
    }-${Date.now()}.jpeg`;

    await sharp(req.file.buffer)
      .toFormat("jpeg")
      .jpeg({ quality: 90 })
      .toFile(`public/uploads/post_cover/${req.body.file}`);

    const file = await File.create({
      file: req.file
        ? req.body.file
        : "https://unsplash.com/photos/JocU2pEsN9Q",
    });

    res.status(201).json({
      status: "success",
      error: false,
      data: file,
    });
  } catch (err) {
    next(err);
  }
};

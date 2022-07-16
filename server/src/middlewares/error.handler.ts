import { Request, Response, NextFunction} from "express";

const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = res.status ? res.status : 500;
  res.json({ message: err.message });
};

export default errorHandler;

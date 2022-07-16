import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../helpers";

const protectRoute = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let token: string;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }
    if (!token)
      throw new Error(
        "You are not logged in!, Please login to continue with the service"
      );
    verifyToken(token);
    next();
  } catch (error) {
    next(error);
  }
};

export default protectRoute;

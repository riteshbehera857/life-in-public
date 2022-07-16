import jwt from "jsonwebtoken";
import { Types } from "mongoose";

const assignToken = (id: Types.ObjectId) => {
  return jwt.sign({ id }, process.env.JWT_SECRET_DEV, {
    expiresIn: process.env.JWT_EXPIRES_IN_DEV,
  });
};

const verifyToken = (token: string) => {
  return jwt.verify(token, process.env.JWT_SECRET_DEV);
};

export { assignToken, verifyToken };

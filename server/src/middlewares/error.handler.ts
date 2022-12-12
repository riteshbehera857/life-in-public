import { AppError } from "../utils/appError";
import { Request, Response, NextFunction, ErrorRequestHandler } from "express";

const sendDevError = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    err: err,
    message: err.message,
    stack: err.stack,
  });
};

const sendProdError = (err, res) => {
  err.isOperational
    ? res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
      })
    : res.status(500).json({
        status: "error",
        message: "Something went wrong, please try again later!",
      });
};

const handleCastError = (err) => {
  const message = `Value ${err.path}:${err.value}`;
  return new AppError(message, 400);
};

const handleDuplicateFieldsError = (err) => {
  const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];
  const message = `Duplicate field value: ${value}, Please try again with another value`;
  return new AppError(message, 400);
};

const handleTokenExpiredError = (err) => {
  const message = `Token has expired, please login to try again`;
  return new AppError(message, 401);
};

const handleJsonWebTokenError = (err) => {
  const message = `Invalid token, please login again!`;
  return new AppError(message, 401);
};

const errorHandler: ErrorRequestHandler = (
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  err.statusCode = +err.statusCode || 500;
  err.status = err.status || "error";

  if (process.env.NODE_ENV === "development") {
    sendDevError(err, res);
  } else if (process.env.NODE_ENV === "production") {
    let error = { ...err };
    if (error.name === "CastError") error = handleCastError(error);
    if (error.code === 11000) error = handleDuplicateFieldsError(error);
    if (error.name === "TokenExpiredError")
      error = handleTokenExpiredError(error);
    if (error.name === "JsonWebTokenError")
      error = handleJsonWebTokenError(error);
    sendProdError(error, res);
  }
};

export default errorHandler;

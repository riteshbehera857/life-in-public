export class AppError extends Error {
  status: string;
  statusCode: number;
  isOperational: boolean;

  constructor(message: string, statusCode?: number) {
    super(message);

    this.statusCode = statusCode;
    this.status = `${
      statusCode && String(statusCode)[0] === "4" ? "fail" : "error"
    }`;
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { config } from "dotenv";
import morgan from 'morgan'
import authRoutes from "./src/routes/auth.routes";
import userRoutes from "./src/routes/user.routes";
import postRoutes from "./src/routes/post.routes";
import commentRoutes from "./src/routes/comment.routes";
import errorHandler from "./src/middlewares/error.handler";

config();
const app = express();
app.use(morgan('dev'))

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json({ limit: "1000mb" }));
app.use(express.urlencoded({ limit: "1000mb", extended: true }));

app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/posts", postRoutes);
app.use("/comment", commentRoutes);

app.all("*", (req: Request, res: Response, next: NextFunction) => {
  const err = new Error(`Can't find ${req.originalUrl} path on the server`);
  next(err);
});

app.use(errorHandler);

export default app;

import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { config } from "dotenv";
import authRoutes from "./src/routes/auth.routes";
import userRoutes from "./src/routes/user.routes";
import postRoutes from "./src/routes/post.routes";
import commentRoutes from "./src/routes/comment.routes";
import fileUpload from "./src/routes/fileUpload.routes";
import errorHandler from "./src/middlewares/error.handler";

config();
const app = express();

app.use(
  cors({
    origin: "*",
  })
);
app.use(cookieParser());
app.use(express.json({ limit: "1000mb" }));
app.use(express.urlencoded({ limit: "1000mb", extended: true }));

app.use(express.static("public"));

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", req.headers.origin);
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/post", postRoutes);
app.use("/upload", fileUpload);
app.use("/comment", commentRoutes);

app.all("*", (req: Request, res: Response, next: NextFunction) => {
  const err = new Error(`Can't find ${req.originalUrl} path on the server`);
  next(err);
});

app.use(errorHandler);

export default app;

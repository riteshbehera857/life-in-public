import express from "express";
import cors from "cors";
import { config } from "dotenv";
import authRoutes from "./src/routes/auth.routes";
import userRoutes from "./src/routes/user.routes";
import postRoutes from "./src/routes/post.routes";
import errorHandler from "./src/middlewares/error.handler";

config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use(express.static("public"));

app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/post", postRoutes);

app.use(errorHandler);

export default app;

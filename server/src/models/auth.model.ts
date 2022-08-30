import { NextFunction } from "express";
import { Schema, model, Types } from "mongoose";
import validator from "validator";
import { IUser } from "../../types";

import { createHash } from "../helpers";

const userSchema = new Schema<IUser>({
  firstname: {
    type: String,
    required: [true, "Firstname is required"],
  },
  lastname: {
    type: String,
    required: [true, "Lastname is required"],
  },
  username: { type: String, default: null },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Please provide a valid email"],
  },
  avatar: {
    type: String,
    default: null,
  },
  password: {
    type: String,
    required: [true, "Please Provide a password"],
    minlength: 8,
  },
  posts: [
    {
      type: Types.ObjectId,
      ref: "Post",
    },
  ],
  likedPosts: [
    {
      type: Types.ObjectId,
      ref: "Post",
    },
  ],
  cover: {
    type: String,
  },
});

userSchema.pre("save", async function (next: NextFunction) {
  if (!this.isModified("password")) return next();
  this.password = await createHash(this.password, 12);
  next();
});

userSchema.pre("/^find/", function (next: NextFunction) {
  this.populate("posts").populate("likedPosts");
  next();
});

const User = model("User", userSchema);

export default User;

import { NextFunction } from "express";
import { Schema, model, Types } from "mongoose";
import validator from "validator";
import { IUser } from "../../types";

import { createHash } from "../helpers";

const userSchema = new Schema<IUser>({
  firstname: {
    type: String,
    required: [true, "Firstname is required"],
    select: false
  },
  lastname: {
    type: String,
    select: false,
    required: [true, "Lastname is required"],
  },
  username: { type: String, default: null },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    select: false,
    validate: [validator.isEmail, "Please provide a valid email"],
  },
  avatar: {
    type: String,
    default: null,
  },
  fakeEmail: {
    type: String,
    default: null
  },
  password: {
    type: String,
    required: [true, "Please Provide a password"],
    minlength: 8,
    select: false
  },
  // posts: [
  //   {
  //     type: "ObjectId",
  //     ref: "Post",
  //   },
  // ],
  // likedPosts: [
  //   {
  //     type: "ObjectId",
  //     ref: "Post",
  //   },
  // ],
  cover: {
    type: String,
  },
});

userSchema.pre("save", async function (next: NextFunction) {
  if (!this.isModified("password")) return next();
  this.password = await createHash(this.password, 12);
  next();
});

// userSchema.pre("/^find/", function (next: NextFunction) {
//   this.populate("posts").populate("likedPosts");
//   next();
// });

const User = model("User", userSchema);

export default User;

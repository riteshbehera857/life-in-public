import { NextFunction } from "express";
import { Schema, model, Types } from "mongoose";
import { IPost } from "../../types";

const postSchema = new Schema<IPost>({
  cover: {
    type: String,
  },
  caption: {
    type: String,
  },
  body: {
    type: String,
  },
  likes: [
    {
      type: Types.ObjectId,
      ref: "User",
    },
  ],
  //   comments: [
  //     {
  //       type: String,
  //       created_by: {
  //         type: "ObjectID",
  //         ref: "User",
  //       },
  //     },
  //   ],
});

postSchema.pre("/^find/", function (next: NextFunction) {
  this.populate("likes");
  next();
});

const Post = model("Post", postSchema);
export default Post;

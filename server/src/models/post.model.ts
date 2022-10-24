import { NextFunction } from "express";
import { Schema, model, ObjectId } from "mongoose";
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
      type: "ObjectId",
      ref: "User",
    },
  ],
  comments: [
    {
      type: "ObjectId",
      ref: "Comment",
    },
  ],
  created_by: {
    type: "ObjectId",
    ref: "User",
    required: true,
  },
}, {
  timestamps: {createdAt: 'created_at'}
});

postSchema.pre("/^find/", function (next: NextFunction) {
  this.populate("likes");
  next();
});

const Post = model("Post", postSchema);
export default Post;

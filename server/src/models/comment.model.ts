import { NextFunction } from "express";
import { Schema, model } from "mongoose";
import { IComment } from "../../types";

const commentSchema = new Schema<IComment>({
  content: {
    type: String,
  },
  post: {
    type: "ObjectID",
    ref: "Post",
  },
  created_by: {
    type: "ObjectID",
    ref: "User",
  },
});

const Comment = model("Comment", commentSchema);
export default Comment;

import { NextFunction } from 'express';
import { Schema, model } from 'mongoose';
import { IComment } from '../../types';

const commentSchema = new Schema<IComment>(
  {
    content: {
      type: String,
      required: [true, "The comment field can't be empty"],
    },
    post: {
      type: 'ObjectID',
      ref: 'Post',
    },
    user: {
      type: 'ObjectID',
      ref: 'User',
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
  }
);

commentSchema.index({ post: 1 });

const Comment = model('Comment', commentSchema);

export default Comment;

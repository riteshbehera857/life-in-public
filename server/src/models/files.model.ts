import { NextFunction } from 'express';
import { Schema, model, Types } from 'mongoose';

const fileSchema = new Schema(
  {
    file: { type: String, required: true },
    user: {
      type: 'ObjectId',
      ref: 'User',
    },
    post: {
      type: 'ObjectId',
      ref: 'Post',
    },
  },
  {
    timestamps: true,
  }
);

const File = model('File', fileSchema);
export default File;

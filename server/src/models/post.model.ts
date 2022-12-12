import { NextFunction } from 'express';
import { Schema, model } from 'mongoose';
import { IPost } from '../../types';

const postSchema = new Schema<IPost>(
  {
    cover: String,
    caption: {
      type: String,
      maxlength: [300, "This number of characters can't be more than 300"],
    },
    body: {
      type: String,
      maxlength: [300, "This number of characters can't be more than 300"],
    },
    createdBy: {
      type: 'ObjectId',
      ref: 'User',
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
  }
);

postSchema.index({ createdBy: 1 });

postSchema.pre('find', function (next: NextFunction) {
  this.populate({
    path: 'createdBy',
    select: { username: 1, fakeEmail: 1, avatar: 1 },
  });
  next();
});

const Post = model('Post', postSchema);
export default Post;

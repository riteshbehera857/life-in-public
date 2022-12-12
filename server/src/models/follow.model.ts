import { NextFunction } from 'express';
import { IFollow } from './../../types.d';
import { Schema, model } from 'mongoose';

const followSchema = new Schema<IFollow>(
  {
    follower: {
      type: 'ObjectId',
      ref: 'User',
    },
    following: {
      type: 'ObjectId',
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

followSchema.index({ following: 1 });

followSchema.pre('find', function (next: NextFunction) {
  this.populate('follower');
  next();
});

const Follows = model('Follows', followSchema);

export default Follows;

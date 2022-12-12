import { Schema, model, Model } from 'mongoose';

const likesSchema = new Schema(
  {
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

likesSchema.index({ post: 1 });

const Likes = model('Likes', likesSchema);

export default Likes;

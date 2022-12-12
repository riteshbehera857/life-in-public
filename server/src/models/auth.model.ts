import { NextFunction } from 'express';
import { Schema, model } from 'mongoose';
import validator from 'validator';
import { IUser } from '../../types';

import { createHash } from '../helpers';

const userSchema = new Schema<IUser>(
  {
    firstname: {
      type: String,
      required: [true, 'Firstname is required'],
      select: false,
      maxlength: [40, "The firstname shouldn't be more than 40 characters"],
    },
    lastname: {
      type: String,
      select: false,
      required: [true, 'Lastname is required'],
      maxlength: [40, "The lastname shouldn't be more than 40 characters"],
    },
    email: {
      type: String,
      unique: true,
      lowercase: true,
      select: false,
      validate: [validator.isEmail, 'Please provide a valid email'],
    },
    password: {
      type: String,
      required: [true, 'Please Provide a password'],
      minlength: 8,
      select: false,
    },
    username: String,
    fakeEmail: String,
    avatar: String,
    cover: String,
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
  }
);

userSchema.index({ fakeEmail: 1 });

userSchema.pre('save', async function (next: NextFunction) {
  if (!this.isModified('password')) return next();
  this.password = await createHash(this.password, 12);
  next();
});

const User = model('User', userSchema);

export default User;

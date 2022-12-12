import jwt from 'jsonwebtoken';
import { Types } from 'mongoose';

const assignToken = (id: Types.ObjectId, type: 'ACCESS' | 'REFRESH') => {
  return jwt.sign(
    { id },
    type === 'ACCESS'
      ? process.env.ACCESS_TOKEN_SECRET
      : process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn:
        type === 'ACCESS'
          ? process.env.JWT_EXPIRES_IN_DEV
          : process.env.JWT_REFRESH_EXPIRES_IN,
    }
  );
};

export { assignToken };

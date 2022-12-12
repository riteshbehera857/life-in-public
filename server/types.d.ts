import { Types } from 'mongoose';

export interface IUser {
  _id: Types.ObjectId;
  firstname: string;
  lastname: string;
  email: string;
  avatar: string;
  username: string;
  password: string;
  cover: string;
  fakeEmail: string;
}

export interface IPost {
  cover?: string;
  caption?: string;
  body?: string;
  createdBy?: {
    type: Types.ObjectId;
  };
  timestamp: boolean;
}

export interface IComment {
  content?: string;
  post: Types.ObjectId;
  user?: Types.ObjectId;
}

export interface IFollow {
  follower: Types.ObjectId;
  following: Types.ObjectId;
}

interface ErrorArgs {
  status?: string;
  statusCode?: number;
}

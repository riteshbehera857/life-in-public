import { Types } from "mongoose";

export interface IUser {
  _id: Types.ObjectId;
  firstname: string;
  lastname: string;
  email: string;
  avatar: string;
  username: string;
  password: string;
  cover: string;
  posts: [Types.ObjectId];
  likedPosts: any[];
}

export interface IPost {
  cover?: string;
  caption?: string;
  body?: string;
  likes?: [Types.ObjectId];
  created_by?: {
    type: Types.ObjectId;
  };
  comments?: [Types.ObjectId];
  created_at?: Date;
}

export interface IComment {
  content?: string;
  post: Types.ObjectId;
  created_by?: Types.ObjectId;
}

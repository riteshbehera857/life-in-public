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
  likedPosts: [Types.ObjectId];
}

export interface IPost {
  file?: string;
  caption?: string;
  body?: string;
  likes?: [Types.ObjectId];
  created_by?: string;
  comments?: [Types.ObjectId];
}

export interface IComment {
  content?: string;
  post: Types.ObjectId;
  created_by?: Types.ObjectId;
}

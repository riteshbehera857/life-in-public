import { Types } from "mongoose";

export interface IUser {
  _id: Types.ObjectId;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  cover: string;
  posts: [Types.ObjectId];
  likedPosts: [Types.ObjectId];
}

export interface IPost {
  cover: string;
  caption: string;
  likes: [Types.ObjectId];
  created_by: string;
  comments: [
    {
      title: string;
      created_by: Types.ObjectId;
    }
  ];
}

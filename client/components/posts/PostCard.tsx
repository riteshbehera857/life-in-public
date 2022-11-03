import React, { useState } from "react";
import PostActions from "./PostActions";
import { IUser, Post } from "../../types";
import PostBody from "./PostBody";
import { useDispatch } from "react-redux";
import { increment } from "../../redux/counter/counterSlice";

interface IProps {
  post: Post;
  handleLike: (id) => Promise<void>;
  liked: boolean;
}

const PostCard = ({ post, handleLike, liked }: IProps) => {
  return (
    <>
      <PostBody post={post} />
      <PostActions post={post} handleLike={handleLike} liked={liked} />
    </>
  );
};

export default PostCard;

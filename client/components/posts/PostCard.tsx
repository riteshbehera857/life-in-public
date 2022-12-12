import React, { useState } from "react";
import PostActions from "./PostActions";
import { IUser, Post } from "../../types";
import PostBody from "./PostBody";
import { useDispatch } from "react-redux";

interface IProps {
  post: Post;
  handleLike: () => void;
  totalLikes: number;
  liked: boolean;
}

const PostCard = ({ post, handleLike, liked, totalLikes }: IProps) => {
  return (
    <>
      <PostBody
        post={post}
        handleLike={handleLike}
        liked={liked}
        totalLikes={totalLikes}
      />
      {post?.body && (
        <PostActions
          post={post}
          handleLike={handleLike}
          liked={liked}
          totalLikes={totalLikes}
        />
      )}
    </>
  );
};

export default PostCard;

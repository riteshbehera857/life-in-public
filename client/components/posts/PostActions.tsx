import React from "react";
import Link from "next/link";
import { Comment, Like, LikeFill } from "@components/ui/icons";
import { useAuthContext } from "@hooks/auth/useAuthContext";
import { Post } from "../../types";
import { useSelector } from "react-redux";
import type { RootState } from "./../../store";
interface IProps {
  post: Post;
  handleLike: (id: string) => void;
  liked: boolean;
}

const PostActions = ({ post, handleLike, liked }: IProps) => {
  return (
    <div className="flex items-center gap-[1rem] mb-[1rem]">
      {liked ? (
        <LikeFill
          onClick={() => handleLike(post?._id)}
          className="cursor-pointer h-12 w-12"
        />
      ) : (
        <Like
          onClick={() => handleLike(post?._id)}
          className="cursor-pointer h-12 w-12"
        />
      )}
      <Link href={`/post/comments/${post?._id}`}>
        <Comment className="cursor-pointer h-12 w-12" />
      </Link>
    </div>
  );
};

export default PostActions;

import React from "react";
import { Comment, Like, LikeFill } from "@components/ui/icons";
import { Post } from "../../types";
import { useRouter } from "next/router";
interface IProps {
  post: Post;
  handleLike: () => void;
  totalLikes: number;
  liked: boolean;
}

const PostActions = ({ post, handleLike, liked, totalLikes }: IProps) => {
  const router = useRouter();
  return (
    <div
      className={`flex items-center gap-[1rem] mb-[1rem] ${
        post?.cover ? "absolute bottom-0 left-4" : ""
      }`}
    >
      <div
        onClick={() => handleLike()}
        className={`flex items-center justify-center gap-2 bg-white cursor-pointer min-w-[8rem] rounded-full p-4 ${
          post?.cover ? "bg-opacity-30" : ""
        }`}
      >
        <>
          {liked ? (
            <LikeFill className="h-10 w-10" />
          ) : (
            <Like className="h-10 w-10" />
          )}
          <p className="text-2xl text-black font-bold">
            {totalLikes ? totalLikes : 0}
          </p>
        </>
      </div>
      <div
        className={`flex items-center bg-white gap-2 rounded-full p-4 ${
          post?.cover ? "bg-opacity-30" : ""
        }`}
      >
        <Comment
          onClick={() => router.push(`/post/comments/${post?._id}`)}
          className="cursor-pointer h-10 w-10"
        />
      </div>
    </div>
  );
};

export default PostActions;

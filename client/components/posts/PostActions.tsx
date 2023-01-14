import React from "react";
import { Comment, Like, LikeFill } from "@components/ui/icons";
import { Post } from "../../types";
import { useRouter } from "next/router";
import cn, { clsx } from "clsx";
import s from "./Post.module.css";
import { BlurView } from "@components/ui/container";
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
      className={cn(s.post_actions, {
        [s.post_with_cover_actions]: post?.cover,
      })}
    >
      {post?.cover ? (
        <BlurView
          type="div"
          onClick={() => handleLike()}
          className="gap-2 cursor-pointer min-w-[8rem] rounded-full"
        >
          <LikeContainer liked={liked} totalLikes={totalLikes} />
        </BlurView>
      ) : (
        <div onClick={() => handleLike()} className={clsx(s.post_likes)}>
          <LikeContainer liked={liked} totalLikes={totalLikes} />
        </div>
      )}
      {post?.cover ? (
        <BlurView
          type="div"
          onClick={() => handleLike()}
          className="cursor-pointer rounded-full"
        >
          <CommentContainer
            post={post}
            onClick={() => router.push(`/post/comments/${post?._id}`)}
          />
        </BlurView>
      ) : (
        <div className={cn(s.post_comment)}>
          <CommentContainer
            post={post}
            onClick={() => router.push(`/post/comments/${post?._id}`)}
          />
        </div>
      )}
    </div>
  );
};

const LikeContainer = ({ liked, totalLikes }) => (
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
);

const CommentContainer = ({ post, onClick }) => (
  <Comment onClick={onClick} className="cursor-pointer h-10 w-10" />
);

export default PostActions;

import { useAuthContext } from "@hooks/auth/useAuthContext";
import { useUser } from "@hooks/auth/useUser";
import { useLike } from "@hooks/post/useLike";
import { usePost } from "@hooks/post/usePost";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Post } from "../../types";
import PostCard from "./PostCard";
import PostInteractions from "./PostInteractions";
import useSWR, { useSWRConfig } from "swr";

interface IProps {
  post: Post;
}

const PostBlock = ({ post }: IProps) => {
  const [totalLikes, setTotalLikes] = useState<number>(0);
  const { refreshPost } = usePost();
  const { user } = useAuthContext();
  const { refreshUser } = useUser();
  const [liked, setLiked] = useState(false);
  const { error, like, refreshLike } = useLike();
  const dispatch = useDispatch();
  const { mutate } = useSWRConfig();

  const fetchLikes = async () => {
    return await axios.get(
      `http://localhost:8000/like/${post?._id}?userID=${user?._id}`
    );
  };

  const { data, error: likeError } = useSWR(
    `http://localhost:8000/like/${post?._id}?userID=${user?._id}`,
    fetchLikes
  );

  const handleLike = async (id) => {
    const res = await like(id, user._id);
    if (!res?.data?.data?.error) {
      const data = await refreshLike(id, user._id);
      mutate(`http://localhost:8000/like/${post?._id}?userID=${user?._id}`);
    }
  };
  return (
    <>
      <PostCard
        post={post}
        handleLike={handleLike}
        liked={data?.data?.currentUserLikedOrNot}
      />
      <PostInteractions post={post} totalLikes={data?.data?.data?.length} />
    </>
  );
};

export default PostBlock;

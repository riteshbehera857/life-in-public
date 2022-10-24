import React, { useState } from "react";
import Image from "next/future/image";
import avatar from "./../../public/images/avatar.svg";
import PostActions from "./PostActions";
import axios from "axios";
import { LIKE } from "../../constants";
import { usePost } from "../../hooks/post/usePost";
import { useAuthContext } from "../../hooks/auth/useAuthContext";
import { useUser } from "../../hooks/auth/useUser";
import { IUser, Post } from "../../types";

interface IProps {
  post: Post;
}

const PostCard = ({ post }: IProps) => {
  const { refreshPost } = usePost();
  const { user } = useAuthContext();
  const { refreshUser } = useUser();
  const [liked, setLiked] = useState(false);

  const handleLike = async (id) => {
    setLiked(true);
    const res = await axios.patch(`${LIKE}/${id}`, {
      userID: user._id,
    });
    await refreshPost();
    await refreshUser();
    if (res?.data?.data?.post?.likes?.includes(user?._id)) {
      setLiked(true);
    } else {
      setLiked(false);
    }
  };
  return (
    <>
      <div className="flex items-center mb-[1rem]">
        <div className="mr-4">
          <Image src={avatar} height="" width="" alt="avatar" />
        </div>
        <div>
          <h3 className="font-medium text-[1.5rem]">
            {post?.created_by?.firstname} {post?.created_by?.lastname}
          </h3>
        </div>
      </div>
      {post?.body && (
        <div className="p-[2rem] mb-[1.5rem] border border-[#E2E8F0] rounded-[10px]">
          <p className="text-[1.5rem]">{post?.body}</p>
        </div>
      )}
      {post?.cover && (
        <div className="mb-[1.5rem] rounded-[10px] overflow-hidden">
          <Image
            src={post?.cover}
            width="360"
            height={250}
            alt={post?.cover}
            loading="lazy"
          />
        </div>
      )}
      <PostActions post={post} handleLike={handleLike} liked={liked} />
    </>
  );
};

export default PostCard;

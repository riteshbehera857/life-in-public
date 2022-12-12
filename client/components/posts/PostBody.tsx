import Text from "@components/ui/text/Text";
import moment from "moment";
import Image from "next/future/image";
import { useRouter } from "next/router";
import React from "react";
import PostActions from "./PostActions";

const PostBody = ({ post, handleLike, liked, totalLikes }) => {
  const router = useRouter();
  return (
    <>
      <div className="flex items-center mb-[1rem] relative">
        <div
          onClick={() => router.push(`/user/${post?.createdBy?.id}`)}
          className={`flex items-center mb-2 cursor-pointer rounded-full p-4 ${
            post?.cover
              ? "absolute top-8 z-50 left-4 bg-[#ffffff] bg-opacity-30"
              : "bg-white"
          }`}
        >
          <div className="mr-4">
            <Image
              src={post?.createdBy?.avatar}
              height={40}
              width={40}
              alt="avatar"
            />
          </div>
          <div className="flex flex-col">
            <Text variant="sectionHeading">{post?.createdBy?.username}</Text>
            <p className="text-[1.2rem] text-[#bbbbbb]">
              {moment(post?.createdAt).format("DD MMM, YYYY")}
            </p>
          </div>
        </div>
      </div>
      {post?.body && (
        <div className="p-[2rem] mb-[1.5rem] border border-[#E2E8F0] rounded-[10px]">
          <p className="text-[1.5rem]">{post?.body}</p>
        </div>
      )}
      {post?.cover && (
        <div className="mb-[1.5rem] rounded-[10px] relative overflow-hidden">
          <Image
            src={post?.cover}
            width="360"
            height={260}
            alt={post?.cover}
            loading="lazy"
          />
          <PostActions
            post={post}
            handleLike={handleLike}
            liked={liked}
            totalLikes={totalLikes}
          />
        </div>
      )}
      {post?.caption ? (
        <p className="mt-4 text-2xl font-bold">{post?.caption}</p>
      ) : (
        ""
      )}
    </>
  );
};

export default React.memo(PostBody);

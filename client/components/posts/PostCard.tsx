import React from "react";
import Image from "next/future/image";
import avatar from "./../../public/images/avatar.svg";
// import { Post } from "../../types";

const PostCard = (post) => {
  return (
    <>
      <div className="flex items-center mb-[1rem]">
        <div className="mr-4">
          <Image src={avatar} height="" width="" alt="avatar" />
        </div>
        <div>
          <h3 className="font-medium text-[1.5rem]">
            {post?.post?.created_by?.firstname}{" "}
            {post?.post?.created_by?.lastname}
          </h3>
        </div>
      </div>
      {post?.post?.body && (
        <div className="p-[2rem] mb-[1.5rem] border border-[#E2E8F0] rounded-[10px]">
          <p className="text-[1.5rem]">{post?.post?.body}</p>
        </div>
      )}
      {post?.post?.cover && (
        <div className="mb-[1.5rem] rounded-[10px] overflow-hidden">
          <Image
            src={post?.post?.cover}
            width="360"
            height={250}
            alt={post?.cover}
            loading="lazy"
          />
        </div>
      )}
    </>
  );
};

export default PostCard;

import Image from "next/future/image";
import React from "react";

const PostBody = ({ post }) => {
  return (
    <>
      <div className="flex items-center mb-[1rem]">
        <div className="mr-4">
          <Image
            src={post?.created_by?.avatar}
            height={50}
            width={50}
            alt="avatar"
          />
        </div>
        <div>
          <h3 className="font-medium text-[1.5rem]">
            {post?.created_by?.username}
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
    </>
  );
};

export default PostBody;

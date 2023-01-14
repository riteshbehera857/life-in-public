import Text from "@components/ui/text/Text";
import axios from "axios";
import moment from "moment";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Post } from "../../types";

interface IProps {
  post: Post;
  totalLikes: number;
}

const PostInteractions = React.memo(({ post, totalLikes }: IProps) => {
  return (
    <>
      <div className="mb-[1rem]">
        <p className="font-bold text-[1.5rem]">
          {post?.created_by?.username}{" "}
          <span className="font-normal">{post?.caption}</span>
        </p>
      </div>
      <div>
        <Link href={`/post/comments/${post._id}`}>
          <p className="text-[1.5rem] cursor-pointer hover:text-[#6b6b6b] transition-colors text-[#bbbbbb]">
            View all comments
          </p>
        </Link>
      </div>
      <div className="">
        <p className="text-[1.5rem] text-[#bbbbbb]">
          {moment(post?.created_at).format("DD MMM, YYYY")}
        </p>
      </div>
    </>
  );
});

PostInteractions.displayName = "PostInteractions";

export default PostInteractions;

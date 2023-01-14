import { BlurView } from "@components/ui/container";
import Image from "next/image";
import React from "react";
import cn from "clsx";
import Text from "@components/ui/text/Text";
import moment from "moment";
import { useRouter } from "next/router";
import { Avatar } from "@components/ui/avatar";
import s from "./Userinfo.module.css";

const UserInfoSwatch = ({ post }) => {
  const router = useRouter();
  return (
    <>
      {post?.cover ? (
        <BlurView
          type="div"
          onClick={() => router.push(`/user/${post?.createdBy?.id}`)}
          className={cn(s.post_with_cover_userinfo, "rounded-full")}
        >
          <Avatar src={post?.createdBy?.avatar} />
          <div className="flex flex-col">
            <Text variant="sectionHeading">{post?.createdBy?.username}</Text>
            <p className="text-[1.2rem] text-[#bbbbbb]">
              {moment(post?.createdAt).format("DD MMM, YYYY")}
            </p>
          </div>
        </BlurView>
      ) : (
        <div
          onClick={() => router.push(`/user/${post?.createdBy?.id}`)}
          className={cn(s.post_userinfo, s.post_without_cover_userinfo)}
        >
          <Avatar src={post?.createdBy?.avatar} />
          <div className="flex flex-col">
            <Text variant="sectionHeading">{post?.createdBy?.username}</Text>
            <p className="text-[1.2rem] text-[#bbbbbb]">
              {moment(post?.createdAt).format("DD MMM, YYYY")}
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default UserInfoSwatch;

{
  /* <BlurView
      type="div"
      onClick={() => router.push(`/user/${post?.createdBy?.id}`)}
      className={cn({
        [s.post_with_cover_userinfo]: post?.cover,
        [s.post_without_cover_userinfo]: !post?.cover,
      })}
    >
      <Avatar src={post?.createdBy?.avatar} />
      <div className="flex flex-col">
        <Text variant="sectionHeading">{post?.createdBy?.username}</Text>
        <p className="text-[1.2rem] text-[#bbbbbb]">
          {moment(post?.createdAt).format("DD MMM, YYYY")}
        </p>
      </div>
    </BlurView> */
}

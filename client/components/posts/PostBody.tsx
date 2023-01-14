import Text from "@components/ui/text/Text";
import moment from "moment";
import Image from "next/future/image";
import { useRouter } from "next/router";
import React from "react";
import PostActions from "./PostActions";
import cn from "clsx";
import s from "./Post.module.css";
import { BlurView } from "@components/ui/container";
import UserInfoSwatch from "@components/profile/UserInfoSwatch";

const PostBody = ({ post, handleLike, liked, totalLikes }) => {
  const router = useRouter();
  return (
    <>
      <div className={cn(s.root)}>
        <UserInfoSwatch post={post} />
        {/* <BlurView
          type="div"
          onClick={() => router.push(`/user/${post?.createdBy?.id}`)}
          className={cn({
            [s.post_with_cover_userinfo]: post?.cover,
            [s.post_without_cover_userinfo]: !post?.cover,
          })}
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
        </BlurView> */}
      </div>
      {post?.body && (
        <div className={cn(s.post_body)}>
          <Text variant="paragraph">{post?.body}</Text>
        </div>
      )}
      {post?.cover && (
        <div className="w-full rounded-[10px] overflow-hidden relative">
          <Image
            src={post?.cover}
            alt={post?.cover}
            loading="lazy"
            height={1000}
            width={1000}
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
        <Text variant="paragraph" className="mt-4 font-bold">
          {post?.caption}
        </Text>
      ) : (
        ""
      )}
    </>
  );
};

export default React.memo(PostBody);

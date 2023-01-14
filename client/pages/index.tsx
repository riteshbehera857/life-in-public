import { Layout } from "../components";

import { useAuthContext } from "@hooks/auth/useAuthContext";
import { usePostContext } from "@hooks/post/usePostContext";
import PostBlock from "@components/posts/PostBlock";
import no_post from "@assets/no_post.svg";
import NoContent from "@components/posts/NoContent";
import PostSkeleton from "@components/ui/skeleton/PostSkeleton";
import { io } from "socket.io-client";
import { useEffect, useState } from "react";
import { useEffectOnce } from "@hooks/helpers/useEfffectOnce";
import { useNotificationContext } from "@hooks/helpers/useNotificationContext";
import { useRouter } from "next/router";

const END_POINT = "http://localhost:8000";
var socket;

const Home = () => {
  const { posts } = usePostContext();
  const { isLoading } = useAuthContext();
  const { user } = useAuthContext();
  const { socket, dispatch } = useNotificationContext();

  useEffectOnce(() => {
    dispatch({ type: "SOCKET", socket: io("http://localhost:8000") });
  });

  useEffect(() => {
    user && socket && socket.emit("initialize", user);
  }, [socket, user]);

  return (
    <div className="px-6 pt-[2.5rem]">
      {!posts ? (
        !isLoading ? (
          <>
            <PostSkeleton />
            <PostSkeleton />
          </>
        ) : (
          <NoContent displayImg={no_post} body="Oops no posts available" />
        )
      ) : (
        posts?.map((post) => (
          <div
            key={post?._id}
            className={`mb-10 last:mb-32 relative ${
              post?.cover ? null : "p-2 px-4 bg-[#f2f2f2]"
            } rounded-rounded-body`}
          >
            <PostBlock post={post} />
          </div>
        ))
      )}
    </div>
  );
};
Home.Layout = Layout;

export default Home;

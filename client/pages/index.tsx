import axios from "axios";
import useSwr, { useSWRConfig } from "swr";
import Link from "next/link";
import moment from "moment";

import { Layout } from "../components";
import { PostCard } from "./../components";
import { LikeFill, Like, Comment } from "@components/ui/icons";

import { useAuthContext } from "@hooks/auth/useAuthContext";
import { GET_POST, LIKE } from "../constants";
import { usePost } from "@hooks/post/usePost";
import { usePostContext } from "@hooks/post/usePostContext";
import PostBlock from "@components/posts/PostBlock";
import no_post from "@assets/no_post.svg";
import Image from "next/future/image";
import NoContent from "@components/posts/NoContent";

const Home = () => {
  const { posts } = usePostContext();

  return (
    <div className="px-6 pt-[2.5rem]">
      {!posts?.length ? (
        <NoContent displayImg={no_post} body="Oops no posts available" />
      ) : (
        posts?.map((post) => (
          <div key={post?._id} className="mb-10 last:mb-32">
            <PostBlock post={post} />
          </div>
        ))
      )}
    </div>
  );
};
Home.Layout = Layout;

export default Home;

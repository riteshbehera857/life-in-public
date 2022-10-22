import axios from "axios";
import useSwr, { useSWRConfig } from "swr";
import Link from "next/link";
import moment from "moment";

import { Layout } from "../components";
import { PostCard } from "./../components";
import { LikeFill, Like, Comment } from "../components/ui/icons";

import { useAuthContext } from "../hooks/useAuthContext";
import { GET_POST, LIKE } from "../constants";

const Home = () => {
  const { mutate } = useSWRConfig();
  const { user } = useAuthContext();

  const fetchPosts = async () => {
    return await axios.get(GET_POST);
  };
  const { data, error } = useSwr(GET_POST, fetchPosts);

  const handleLike = async (id) => {
    await axios.patch(`${LIKE}/${id}`, {
      userID: user._id,
    });
    mutate(GET_POST);
  };

  return (
    <div className="px-6 pt-[2.5rem]">
      {data?.data?.data?.posts
        ?.sort((a: any, b: any) => {
          return (
            new Date(b.created_at).valueOf() - new Date(a.created_at).valueOf()
          );
        })
        .map((post) => (
          <div key={post?._id} className="mb-10 last:mb-32">
            <PostCard post={post} />
            <div className="flex items-center gap-[1rem] mb-[1rem]">
              {user?.likedPosts.includes(post._id) ? (
                <LikeFill
                  onClick={() => handleLike(post._id)}
                  className="cursor-pointer h-12 w-12"
                />
              ) : (
                <Like
                  onClick={() => handleLike(post._id)}
                  className="cursor-pointer h-12 w-12"
                />
              )}
              <Link href={`/post/comments/${post._id}`}>
                <Comment className="cursor-pointer h-12 w-12" />
              </Link>
            </div>
            <div className="">
              <p className="font-bold text-[1.5rem]">
                {post?.likes.length} likes
              </p>
            </div>
            <div className="mb-[1rem]">
              <p className="font-bold text-[1.5rem]">
                {post?.created_by?.firstname}{" "}
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
          </div>
        ))}
    </div>
  );
};
Home.Layout = Layout;

export default Home;

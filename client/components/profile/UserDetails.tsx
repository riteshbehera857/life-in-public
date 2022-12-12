import { useAuthContext } from "@hooks/auth/useAuthContext";
import axios from "axios";
import dayjs from "dayjs";
import Image from "next/future/image";
import useSWR, { mutate } from "swr";
import { Post } from "../../types";

async function fetchFollows(url, accessToken) {
  const res = await axios.get(url);
  return res.data;
}

const UserDetails = ({ user, posts }) => {
  const { user: currentUser, token } = useAuthContext();

  const FOLLOW_URL = `http://localhost:8000/api/v1/user/${user?._id}/follow`;

  const handleFollow = async () => {
    await axios.post(FOLLOW_URL);
    mutate(FOLLOW_URL);
  };
  const { data: followData, error: followError } = useSWR(
    [FOLLOW_URL, token],
    fetchFollows,
    {
      revalidateOnFocus: false,
      refreshInterval: 5000,
    }
  );

  return (
    <div className="px-6">
      <div className="flex flex-col items-center gap-6 mt-5 mb-5">
        <div className="h-[100px] w-[100px] rounded-full bg-slate-100 ring-2 ring-offset-2 ring-accent-primary">
          {!user?.avatar ? (
            <span className="h-[100px] w-[100px] rounded-full bg-slate-100 animate-pulse">
              &nbsp;
            </span>
          ) : (
            <Image
              src={user?.avatar}
              height={200}
              width={200}
              alt={`life-in-public${user?.username}`}
            />
          )}
        </div>
        <div>
          <h1 className="text-[1.5rem] font-bold">{user?.fakeEmail}</h1>
        </div>
      </div>
      <div className="flex items-center justify-between py-4 px-8 mb-4 rounded-rounded-body">
        <div className="text-center w-full relative right-border">
          <p className="text-[2.2rem] font-bold">20</p>
          <p className="text-[1.4rem]">Posts</p>
        </div>
        <div className="text-center w-full relative right-border">
          <p className="text-[2.2rem] font-bold">
            {followData?.data?.followings?.length}
          </p>
          <p className="text-[1.4rem]">Following</p>
        </div>
        <div className="text-center w-full">
          <p className="text-[2.2rem] font-bold">
            {followData?.data?.followers?.length}
          </p>
          <p className="text-[1.4rem]">Followers</p>
        </div>
      </div>
      {user?._id !== currentUser?._id ? (
        <button
          type="button"
          onClick={handleFollow}
          className="w-full py-4 rounded-lg text-white text-3xl font-bold bg-accent-primary ring-2 ring-offset-2 ring-accent-primary"
        >
          {followData?.currentUserFollowingOrNot ? "Following" : "Follow"}
        </button>
      ) : null}
      <div className="mb-32">
        <div className="py-4 relative active-dot mb-8">
          <p className="text-[2rem] text-center font-bold">Posts</p>
        </div>
        {posts?.map((post: Post) => (
          <UserPosts key={post._id} post={post} user={user} />
        ))}
      </div>
    </div>
  );
};

const UserPosts = ({ post, user }) => {
  return (
    <div className="flex items-center justify-between gap-4 mb-8">
      <div className="h-[50px] self-start aspect-square rounded-full bg-slate-100 ring-2 ring-accent-primary">
        <Image src={user?.avatar} height={100} width={100} alt={user?._id} />
      </div>
      <div className="flex-grow">
        <div className="w-full flex items-center justify-between mb-2">
          <span className="text-2xl font-bold">{user?.username}</span>
          <span className="text-2xl inline-block">
            {dayjs(post?.createdAt).format("DD MMM")}
          </span>
        </div>
        <div className="w-full border-2 p-4 rounded-rounded-body">
          {post?.body ? (
            <p className="text-[1.6rem]">{post?.body}</p>
          ) : (
            <div className="rounded-rounded-body overflow-hidden">
              <Image
                src={post?.cover}
                height={200}
                width={360}
                alt={post._id}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDetails;

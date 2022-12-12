import { Layout } from "@components/index";
import PageHeader from "@components/postForm/PageHeader";
// import UserDetails from "@components/profile/UserDetails";
import { ArrowLeft } from "@components/ui/icons";
import FullPageLoader from "@components/ui/loaders/FullPageLoader";
import { GET_POST } from "@constants/index";
import axios from "axios";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import React from "react";
import useSWR from "swr";

const fetchUserPosts = async (url) => {
  const res = await axios.get(url);
  return res.data;
};

const fetchUser = async (url) => {
  const res = await axios.get(url);
  return res.data;
};

const Loading = () => (
  <section className="h-screen w-screen flex items-center justify-center">
    <FullPageLoader />
  </section>
);

const dynamicProps = {
  loading: Loading,
};

const UserDetails = dynamic(() => import("@components/profile/UserDetails"), {
  ...dynamicProps,
});

const User = () => {
  const router = useRouter();
  const { id } = router.query;
  const GET_CURRENT_USER_POSTS = `${GET_POST}?sort=createdAt&user=${id}`;
  const GET_USER = `http://localhost:8000/user/${id}`;

  const { data: userData, error: userError } = useSWR(GET_USER, fetchUser);

  const { data: postData, error: postError } = useSWR(
    GET_CURRENT_USER_POSTS,
    fetchUserPosts
  );

  return (
    <div>
      <PageHeader
        icon={<ArrowLeft className="h-10 w-10 cursor-pointer" />}
        href="/"
        title={userData?.user?.username}
      />
      <UserDetails user={userData?.user} posts={postData?.data?.posts} />
    </div>
  );
};

User.Layout = Layout;

export default User;

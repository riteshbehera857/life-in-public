import Image from "next/future/image";
import React, { ReactElement } from "react";
import { Layout } from "../../components";
import { useAuthContext } from "../../hooks/auth/useAuthContext";
import useSWR from "swr";
import { GET_POST } from "@constants/index";
import axios from "axios";
import type { Post } from "../../types";
import dayjs from "dayjs";
import UserDetails from "@components/profile/UserDetails";
import PageHeader from "@components/postForm/PageHeader";
import { ArrowLeft } from "@components/ui/icons";

const fetchUserPosts = async (url) => {
  const res = await axios.get(url);
  return res.data;
};

const Profile = () => {
  const { user, token } = useAuthContext();
  const GET_CURRENT_USER_POSTS = `http://localhost:8000/api/v1/user/${user?.id}/post`;

  const { data: postData, error: postError } = useSWR(
    [GET_CURRENT_USER_POSTS, token],
    fetchUserPosts
  );

  return (
    <>
      <PageHeader
        title={user?.username}
        href="/"
        icon={<ArrowLeft className="h-10 w-10 cursor-pointer" />}
      />
      <UserDetails posts={postData?.data?.posts} user={user} />
    </>
  );
};

Profile.Layout = Layout;

export default Profile;

import { useAuthContext } from "@hooks/auth/useAuthContext";
import axios from "axios";
import { createContext, useEffect, useReducer, useState } from "react";
import useSWR from "swr";
import { Post, PostResponse } from "../types";

interface PostContext {
  posts: Post[];
  postError: any;
}

export const PostContext = createContext<PostContext>(null);

export const PostContextProvider = ({ children }: any) => {
  const FETCH_POSTS_URL = `http://localhost:8000/api/v1/post`;

  const fetchPosts = async (url) => {
    const res = await axios.get(url);
    return res.data;
  };

  const { data: postData, error: postError } = useSWR(
    FETCH_POSTS_URL,
    fetchPosts,
    {
      revalidateOnFocus: false,
      refreshInterval: 3600000,
    }
  );

  return (
    <PostContext.Provider value={{ posts: postData?.data?.posts, postError }}>
      {children}
    </PostContext.Provider>
  );
};

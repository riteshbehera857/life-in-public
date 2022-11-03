import axios from "axios";
import { createContext, useEffect, useReducer, useState } from "react";
import { Post, PostResponse } from "../types";
// import useRouter from "next/router";

export const PostContext = createContext<any>(null);

export const postReducer = (state: Post, action: any) => {
  switch (action.type) {
    case "POST":
      return { ...state, posts: action.payload };
    case "REFRESH":
      return { posts: action.payload };
    default:
      return state;
  }
};
export const PostContextProvider = ({ children }: any) => {
  const API_URL = `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}${process.env.NEXT_PUBLIC_BACKEND_PORT}${process.env.NEXT_PUBLIC_BACKEND_POST_END_POINT}`;

  const [state, dispatch] = useReducer(postReducer, {
    posts: null,
  });

  useEffect(() => {
    let subscribe = true;
    axios
      .get<PostResponse>(`${API_URL}?sort=createdAt`)
      .then((res) => {
        if (subscribe) {
          if (!state.posts && res.data?.data?.posts) {
            dispatch({ type: "POST", payload: res?.data?.data?.posts });
          }
        }
      })
      .catch((err) => console.error(err));

    return () => {
      subscribe = false;
    };
  }, [state?.posts]);

  // useEffect(() => {
  //   console.log({ state: state?.posts });
  // }, [state?.posts]);

  return (
    <PostContext.Provider value={{ ...state, dispatch }}>
      {children}
    </PostContext.Provider>
  );
};

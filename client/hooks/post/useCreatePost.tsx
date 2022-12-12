import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { usePost } from "./usePost";
import { usePostContext } from "./usePostContext";
import { mutate } from "swr";
import { useAuthContext } from "@hooks/auth/useAuthContext";

export const useCreatePost = () => {
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const router = useRouter();

  const createPost = async (data) => {
    setIsLoading(true);
    setError(null);

    try {
      await axios.post("http://localhost:8000/api/v1/post", {
        ...data,
      });
      mutate(`http://localhost:8000/api/v1/post`);
      setIsLoading(false);
      router.push("/");
    } catch (error) {
      console.log(error, "Error");
      setIsLoading(false);
      setError(error);
    }
  };

  return { createPost, isLoading, error };
};

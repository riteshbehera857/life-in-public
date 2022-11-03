import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { usePost } from "./usePost";
import { usePostContext } from "./usePostContext";

export const useCreatePost = () => {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isSuccess, setIsSuccess] = useState(false);
  const router = useRouter();

  const { dispatch } = usePostContext();
  const { refreshPost } = usePost();

  const createPost = async ({ previewSource, caption, userId, body }) => {
    setIsLoading(true);
    setError(null);

    try {
      const res = await axios.post(
        "http://localhost:8000/posts/create_post",
        {
          file: previewSource ? previewSource : null,
          caption: caption ? caption : null,
          body: body ? body : null,
          created_by: userId,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          onUploadProgress: (progressEvent) => {
            const progress = (progressEvent.loaded / progressEvent.total) * 50;
            setProgress(progress);
          },
          onDownloadProgress: (progressEvent) => {
            const progress =
              50 + (progressEvent.loaded / progressEvent.total) * 50;
            console.log(progress);
            setProgress(progress);
          },
        }
      );
      setIsSuccess(true);
      await refreshPost();
      setIsLoading(false);
      router.push("/");
    } catch (error) {
      setIsLoading(false);
      setError(error);
    }
  };

  return { createPost, isLoading, error, progress, isSuccess };
};

import { LIKE } from "@constants/index";
import { useAuthContext } from "@hooks/auth/useAuthContext";
import axios from "axios";
import React, { useState } from "react";

export const useLike = () => {
  const [error, setError] = useState("");
  // const { token } = useAuthContext();

  const like = async (postId, accessToken) => {
    try {
      const res = await axios.post(
        `http://localhost:8000/api/v1/post/${postId}/like`,
        {
          headers: {
            authorization: `Bearer ${accessToken}`,
          },
        }
      );
      console.log(res, "Line 20");
      return res.data;
    } catch (error) {
      console.log(error, "Like Error...");
      setError(error);
    }
  };

  // const refreshLike = async (id, userID) => {
  //   const res = await axios.get(`${LIKE}/${id}?userID=${userID}`, {
  //     headers: {
  //       authorization: `Bearer ${token}`,
  //     },
  //   });
  //   console.log(res, "Refresh Like response");
  //   //   setError(error);
  //   // console.log(error, "Refresh Like error");
  //   return res;
  // };

  return { error, like };
};

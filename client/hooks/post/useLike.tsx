import { LIKE } from "@constants/index";
import axios from "axios";
import React, { useState } from "react";

export const useLike = () => {
  const [error, setError] = useState("");

  const like = async (id, userId) => {
    try {
      const res = await axios.post(`${LIKE}/${id}`, {
        userID: userId,
      });
      return res;
    } catch (error) {
      setError(error);
    }
  };

  const refreshLike = async (id, userID) => {
    try {
      return await axios.get(`${LIKE}/${id}?userID=${userID}`);
    } catch (error) {
      setError(error);
    }
  };

  return { error, like, refreshLike };
};

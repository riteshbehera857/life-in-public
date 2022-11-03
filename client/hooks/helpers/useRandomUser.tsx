import React, { useState } from "react";
import axios from "axios";

export const useRandomUser = () => {
  const [error, setError] = useState("");

  const options = {
    method: "GET",
    url: "https://random-username-generate.p.rapidapi.com/",
    params: {
      locale: "en_US",
      minAge: "18",
      maxAge: "50",
      domain: "ugener.com",
    },
    headers: {
      "X-RapidAPI-Key": process.env.NEXT_PUBLIC_RAPID_API_KEY,
      "X-RapidAPI-Host": "random-username-generate.p.rapidapi.com",
    },
  };

  const generateRandomUser = async () => {
    try {
      return await axios.request(options);
    } catch (err) {
      setError(err);
    }
  };

  return { error, generateRandomUser };
};

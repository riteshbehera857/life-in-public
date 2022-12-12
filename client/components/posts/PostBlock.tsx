import { useAuthContext } from "@hooks/auth/useAuthContext";
import { useLike } from "@hooks/post/useLike";
import axios from "axios";
import { Post } from "../../types";
import PostCard from "./PostCard";
import PostInteractions from "./PostInteractions";
import useSWR, { useSWRConfig } from "swr";
import { useEffect, useState } from "react";
import { useNotificationContext } from "@hooks/helpers/useNotificationContext";

interface IProps {
  post: Post;
}

axios.defaults.withCredentials = true;

const PostBlock = ({ post }: IProps) => {
  const { user, token, dispatch } = useAuthContext();
  const { socket, notifications, dispatch: notify } = useNotificationContext();
  const { error, like } = useLike();
  const { mutate } = useSWRConfig();
  const [notification, setNotfication] = useState([]);

  const FETCH_LIKE = `http://localhost:8000/api/v1/post/${post?._id}/like`;

  const getRefreshToken = async () => {
    return await axios.get("http://localhost:8000/api/v1/auth/refresh", {
      withCredentials: true,
    });
  };

  // let count = 0;

  useEffect(() => {
    socket &&
      socket.on("likeNotification", (data) => {
        // console.log("Like Data...", data);
        setNotfication((prev) => [...prev, data]);
        // console.log("Notification...", notification);
        // notify({ type: "NOTIFY", notification: data });
      });
  }, [socket]);

  const tryFetchingLikes = async (url) => {
    return await axios.get(url);
  };

  const fetchLikes = async (url) => {
    try {
      const likes = await tryFetchingLikes(url);
      return likes.data;
    } catch (error) {
      if (error.response.status === 401) {
        const {
          data: { accessToken },
        } = await getRefreshToken();
        const likes = await tryFetchingLikes(url);
        dispatch({ type: "LOGIN", token: accessToken });
        return likes.data;
      }
    }
  };

  const { data: likeData, error: likeError } = useSWR(FETCH_LIKE, fetchLikes, {
    revalidateOnFocus: false,
    refreshInterval: 3600000,
  });

  const handleLike = async () => {
    axios
      .post(FETCH_LIKE)
      .then((res) => {
        mutate(FETCH_LIKE);
      })
      .catch((err) => console.log(err, "Error..."));
  };

  return (
    <>
      <PostCard
        post={post}
        handleLike={handleLike}
        totalLikes={likeData?.data?.likes.length}
        liked={likeData?.currentUserLiked}
      />
    </>
  );
};

export default PostBlock;

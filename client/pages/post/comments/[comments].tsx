import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/future/image";
import { useRouter } from "next/router";
import useSwr, { useSWRConfig } from "swr";

import { ArrowLeft, Send } from "../../../components/ui/icons";
import { useAuthContext } from "../../../hooks/auth/useAuthContext";

import avatar from "../../../public/images/avatar.svg";
import { COMMENT, CREATE_COMMENT } from "../../../constants";
import NoContent from "@components/posts/NoContent";
import no_comment from '@assets/no_comment.svg'

const Comments = () => {
  const router = useRouter();
  const param = router?.query?.comments;
  const { mutate } = useSWRConfig();

  const [comment, setComment] = useState<string>("");

  const { user } = useAuthContext();

  const fetchComments = async () => {
    const res = await axios.get(`${COMMENT}/${param}`);
    return res;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post(CREATE_COMMENT, {
      content: comment,
      created_by: user._id,
      post: param,
    });

    setComment("");
    mutate(`${COMMENT}/${param}`);
  };
  const { data, error } = useSwr(`${COMMENT}/${param}`, fetchComments);
  console.log({data})
  //   if (!data) console.log("Loading");
  //   if (data) console.log("Loaded");
    return (
      <div className="px-6">
        <div className="h-[8vh] flex gap-8 items-center">
          <ArrowLeft
            onClick={() => router.push("/")}
            className="h-10 w-10 cursor-pointer"
          />
          <h3 className="text-[2.4rem] font-bold">Comments</h3>
        </div>
          <div className="h-[82vh]">
          {!data?.data?.data?.post?.comments.length ? <NoContent displayImg={no_comment} body="This post has no comments"/> : data?.data?.data?.post?.comments?.map((comment) => (
              <div key={comment._id} className="flex mb-4 items-center">
                <div className="mr-4">
                  <Image src={avatar} height="" width="" alt="avatar" />
                </div>
                <div className="border-2 rounded-md px-2 w-full py-2">
                  <p className="text-xl font-semibold">{comment?.content}</p>
                  <p>
                    {comment?.created_by.firstname}{" "}
                    {comment?.created_by.lastname}
                  </p>
                </div>
              </div>
            ))}
          </div>
        <form
          onSubmit={handleSubmit}
          className="fixed flex items-center gap-4 bottom-2 left-1/2 -translate-x-1/2 w-screen px-6"
        >
          <input
            type="text"
            placeholder="Post a comment"
            name="comment"
            value={comment}
            className="border-2 py-5 px-4 text-[1.4rem] border-accent-primary rounded-lg w-[80%] focus:ring focus:ring-accent-primary focus:outline-none"
            onChange={(e) => setComment(e.target.value)}
          />
          <button className="w-[20%] rounded-full border-2 py-6 border-accent-primary flex items-center justify-center">
            <Send />
          </button>
        </form>
      </div>
    );
};

export default Comments;

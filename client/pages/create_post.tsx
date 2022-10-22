import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { Switch } from "@headlessui/react";
import { ArrowLeft, Delete } from "../components/ui/icons";

import axios from "axios";
import Image from "next/future/image";
import GhostBtnLoader from "../components/ui/loaders/GhostBtnLoader";
import { useAuthContext } from "../hooks/useAuthContext";
import { useCreatePost } from "../hooks/useCreatePost";

const CreatePost = () => {
  const [fileUploadEnabled, setFileUploadEnabled] = useState(false);
  const [previewSource, setPreviewSource] = useState<string>("");
  const [selectedFile, setSelectedFile] = useState<File>();
  const myRef = useRef<null | undefined | HTMLInputElement>();

  const [caption, setCaption] = useState("");
  const [body, setBody] = useState("");

  const { user } = useAuthContext();

  const { createPost, isLoading, error, progress, isSuccess } = useCreatePost();
  console.log("Progress", progress);
  console.log(isSuccess);

  const handleRef = () => {
    myRef.current?.click();
  };

  useEffect(() => {
    if (selectedFile) {
      const reader = new FileReader();
      reader.readAsDataURL(selectedFile);
      reader.onloadend = () => {
        setPreviewSource(reader?.result as string);
      };
    } else {
      setPreviewSource("");
    }
  }, [selectedFile]);

  const handleFileChange = async (e: any) => {
    setSelectedFile(e.target.files[0]);
  };

  const handlePostUpload = async () => {
    await uploadPostHandler();
  };

  const uploadPostHandler = async () => {
    const data = {
      previewSource: previewSource ? previewSource : null,
      caption: caption ? caption : null,
      userId: user?._id ? user?._id : null,
      body: body ? body : null,
    };
    const res = await createPost(data);
    console.log({ res });
  };

  const deletePreview = () => {
    setPreviewSource("");
    setSelectedFile(undefined);
  };

  return (
    <div className="px-6">
      <div className="h-[8vh] flex gap-8 items-center">
        <Link href="/">
          <ArrowLeft className="h-10 w-10 cursor-pointer" />
        </Link>
        <h3 className="text-[2.4rem] font-bold">Create Post</h3>
      </div>
      {!fileUploadEnabled && (
        <div className="mb-4">
          <label htmlFor="textarea" className="text-[18px]">
            Share Something
          </label>
          <textarea
            name=""
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="Tell everyone about your day.."
            id="textarea"
            rows={8}
            className="border-2 p-4 text-[1.5rem] mt-2 focus:ring-2 focus:ring-accent-primary focus:outline-none border-slate-200 w-full rounded-[8px]"
          />
        </div>
      )}
      {fileUploadEnabled && (
        <>
          <div
            onClick={handleRef}
            className={`flex items-center justify-center outline-offset-0 outline-2 outline-dashed outline-accent-primary hover:bg-[#ab3eff1a] transition-opacity duration-150 rounded-rounded-body cursor-pointer mb-6 ${
              previewSource && "p-8"
            }`}
          >
            {previewSource && fileUploadEnabled ? (
              <div className="h-full w-full relative">
                <span
                  onClick={deletePreview}
                  className="absolute z-20 hover:bg-opacity-60 transition-all duration-300 bg-white bg-opacity-30 backdrop-blur-md h-12 w-12 top-2 right-2 rounded-full flex items-center justify-center"
                >
                  <Delete className="h-8" />
                </span>
                <Image
                  height="90"
                  width="360"
                  className="rounded-lg"
                  src={previewSource}
                  alt="Cover"
                />
              </div>
            ) : (
              <label
                className="text-btn-text pointer-events-none cursor-pointer py-40"
                htmlFor="file"
              >
                Select Photo
                <input
                  ref={myRef}
                  type="file"
                  onChange={handleFileChange}
                  name="file"
                  accept="image/*"
                  id="file"
                  hidden
                />
              </label>
            )}
          </div>
          <div>
            <label htmlFor="caption" className="text-[18px] text-[#363636]">
              Caption for the post
            </label>
            <input
              id="caption"
              type="text"
              name="caption"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              className="py-padding-y-input w-full border-2  mt-2 border-accent-primary rounded-rounded-body mb-[12px] text-text-body font-bold px-padding-x-input text-[#000] placeholder:text-[#9d9d9d] focus:outline-[#aa3eff]"
              placeholder="Caption"
            />
          </div>
        </>
      )}
      <Switch.Group>
        <div className="flex items-center justify-between w-full mb-8">
          <Switch.Label className="mr-4 text-[18px]">Upload image</Switch.Label>
          <Switch
            checked={fileUploadEnabled}
            onChange={setFileUploadEnabled}
            className={`${
              fileUploadEnabled ? "bg-accent-primary" : "bg-gray-200"
            } relative inline-flex h-10 w-20 items-center rounded-full transition-colors focus:outline-none`}
          >
            <span
              className={`${
                fileUploadEnabled ? "translate-x-12" : "translate-x-2"
              } inline-block h-6 w-6 transform rounded-full bg-white transition-transform`}
            />
          </Switch>
        </div>
      </Switch.Group>
      <button
        onClick={handlePostUpload}
        className="w-full py-padding-y-btn mt-10 text-center text-btn-text font-bold text-accent-primary border-2 hover:bg-[#ab3eff1a] transition-opacity duration-150
       border-accent-primary rounded-rounded-body mb-2"
      >
        {!isLoading ? "Post" : <GhostBtnLoader />}
      </button>
    </div>
  );
};

export default CreatePost;

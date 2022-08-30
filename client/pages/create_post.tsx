import Link from "next/link";
import React, { ReactElement, useEffect, useRef, useState } from "react";
import { Switch } from "@headlessui/react";
import { ArrowLeft, Delete } from "../components/ui/icons";
import type { NextPageWithLayout } from "./_app";
import { BtnLoder } from "../components";
import axios from "axios";
import { Blob } from "buffer";
import Image from "next/image";

const CreatePost: NextPageWithLayout = () => {
  const [fileUploadEnabled, setFileUploadEnabled] = useState(false);
  const [previewSource, setPreviewSource] = useState<any>("");
  const [fileInputState, setFileInputState] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<string | undefined | Blob>();
  const [uploadedImage, setUploadedImage] = useState("");
  const myRef = useRef<null | undefined | HTMLElement>();
  const handleRef = () => {
    myRef.current.click();
  };

  const handleFileChange = async (e: any) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    previewFile(file);
    await handleFileUpload();
  };

  const previewFile = (file: any) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader?.result);
    };
  };

  const handleFileUpload = async () => {
    if (!selectedFile) return;
    await uploadImageHandler(previewSource);
  };

  const uploadImageHandler = async (base64EncodedImage: any) => {
    try {
      const res = await axios.post("http://localhost:8000/upload", {
        file: base64EncodedImage,
      });
      console.log(res);
    } catch (error) {
      console.error(error);
    }
  };

  const deletePreview = () => {};

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
            placeholder="Tell everyone about your day.."
            id="textarea"
            rows="8"
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
                  height="20"
                  width="20"
                  className="rounded-lg"
                  layout="responsive"
                  src={previewSource}
                  alt="Cover"
                />
              </div>
            ) : (
              <label
                ref={myRef}
                className="text-btn-text pointer-events-none cursor-pointer py-40"
                htmlFor="file"
              >
                Select Photo
                <input
                  type="file"
                  onChange={handleFileChange}
                  value={fileInputState}
                  name="file"
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
        className="w-full py-padding-y-btn mt-10 text-center text-btn-text font-bold text-accent-primary border-2 hover:bg-[#ab3eff1a] transition-opacity duration-150
       border-accent-primary rounded-rounded-body mb-2"
      >
        {!loading ? "Post" : <BtnLoder />}
      </button>
    </div>
  );
};

CreatePost.getLayout = function PageLayout(page: ReactElement) {
  return <>{page}</>;
};

export default CreatePost;

import Link from "next/link";
import React, { ReactElement, useRef } from "react";
import { ArrowLeft } from "../components/ui/icons";
import type { NextPageWithLayout } from "./_app";

const CreatePost: NextPageWithLayout = () => {
  const myRef = useRef<null | undefined | HTMLElement>();
  const handleRef = () => myRef.current.click();

  return (
    <div className="px-6">
      <div className="h-[8vh] flex gap-8 items-center">
        <Link href="/">
          <ArrowLeft className="h-10 w-10 cursor-pointer" />
        </Link>
        <h3 className="text-[2.4rem] font-bold">Create Post</h3>
      </div>
      <div
        onClick={handleRef}
        className="flex items-center justify-center outline-offset-0 outline-2 outline-dashed outline-accent-primary rounded-rounded-body cursor-pointer mb-5"
      >
        <label
          ref={myRef}
          className="text-btn-text cursor-pointer py-40"
          htmlFor="file"
        >
          Select Photo
          <input type="file" name="file" id="file" hidden />
        </label>
      </div>
      <div className="">
        <textarea
          name=""
          placeholder="Tell everyone about your day.."
          id=""
          rows="2"
          className="border-2 p-4 text-[1.5rem] focus:ring-2 focus:ring-accent-primary focus:outline-none border-slate-200 w-full rounded-[8px]"
        />
      </div>
    </div>
  );
};

CreatePost.getLayout = function PageLayout(page: ReactElement) {
  return <>{page}</>;
};

export default CreatePost;

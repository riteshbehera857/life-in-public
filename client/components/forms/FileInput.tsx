import { Delete } from "@components/ui/icons";
import Image from "next/future/image";
import React from "react";

const FileInput = ({
  handleRef,
  previewSource,
  deletePreview,
  myRef,
  onChange,
  label,
}) => {
  return (
    <div
      onClick={handleRef}
      className={`flex items-center justify-center outline-offset-0 outline-2 outline-dashed outline-accent-primary hover:bg-[#ab3eff1a] transition-opacity duration-150 rounded-rounded-body cursor-pointer mb-6 ${
        previewSource && "p-8"
      }`}
    >
      {previewSource ? (
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
          {label}
          <input
            ref={myRef}
            type="file"
            onChange={onChange}
            name="file"
            accept="image/*"
            id="file"
            hidden
          />
        </label>
      )}
    </div>
  );
};

export default FileInput;

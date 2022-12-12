import { Delete } from "@components/ui/icons";
import Image from "next/future/image";
import React, { DragEvent, useState } from "react";
import { useDropzone } from "react-dropzone";
import { BsImageAlt } from "react-icons/bs";

const FileInput = ({
  previewSource,
  deletePreview,
  fileUploading,
  onChange,
  label,
  onDrop,
}) => {
  // const [dragEntered, setDragEntered] = useState<boolean>(false);
  const { getRootProps, getInputProps, isDragActive, acceptedFiles } =
    useDropzone({ onDrop, noClick: previewSource ? true : false });

  return (
    <div
      {...getRootProps({
        className: `flex items-center justify-center outline-offset-0 outline-2 outline-dashed outline-accent-primary hover:bg-[#ab3eff1a] transition-opacity duration-150 rounded-rounded-body cursor-pointer mb-6 ${
          previewSource && "p-8"
        } ${isDragActive && "bg-[#ab3eff1a]"}`,
      })}
    >
      {previewSource ? (
        <Preview previewSource={previewSource} deletePreview={deletePreview} />
      ) : (
        <label
          className={`text-btn-text pointer-events-none cursor-pointer ${
            fileUploading ? "py-36" : "py-40"
          }`}
          htmlFor="file"
        >
          {fileUploading ? (
            <BsImageAlt className="h-20 w-24 animate-pulse" />
          ) : (
            label
          )}
          <input
            onChange={onChange}
            name="file"
            accept="image/*"
            id="file"
            {...getInputProps()}
          />
        </label>
      )}
    </div>
  );
};

const Preview = ({ previewSource, deletePreview }) => (
  <div className="h-full w-full relative">
    <span
      onClick={deletePreview}
      className="absolute z-[100] hover:bg-opacity-60 transition-all duration-300 bg-white bg-opacity-30 backdrop-blur-md h-12 w-12 top-2 right-2 rounded-full flex items-center justify-center"
    >
      <Delete className="h-8" />
    </span>
    <Image
      height="90"
      width="360"
      className="rounded-lg"
      src={previewSource}
      alt="Cover"
      priority
    />
  </div>
);

export default FileInput;

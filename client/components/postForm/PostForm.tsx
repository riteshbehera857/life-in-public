import FileInput from "@components/forms/FileInput";
import Input from "@components/forms/Input";
import TextArea from "@components/forms/TextArea";
import { Delete } from "@components/ui/icons";
import { Switch } from "@headlessui/react";
import Image from "next/future/image";
import React, { Dispatch, MutableRefObject, SetStateAction } from "react";
import MediaUploadForm from "./MediaUploadForm";

interface IProps {
  body: string;
  setBody: Dispatch<SetStateAction<string>>;
  handleRef: () => void;
  previewSource: null | string;
  deletePreview: () => void;
  myRef: MutableRefObject<HTMLInputElement>;
  handleFileChange: (e) => void;
  caption: string;
  setCaption: Dispatch<SetStateAction<string>>;
  fileUploadEnabled: boolean;
  setFileUploadEnabled: Dispatch<SetStateAction<boolean>>;
}

const PostForm: React.FC<IProps> = ({
  body,
  setBody,
  handleRef,
  previewSource,
  deletePreview,
  myRef,
  handleFileChange,
  caption,
  setCaption,
  fileUploadEnabled,
  setFileUploadEnabled,
}) => {
  return (
    <>
      {!fileUploadEnabled && (
        <TextArea
          label="Share Something"
          rows={8}
          className="mb-4"
          value={body}
          placeholder="Tell everyone about your day.."
          onChange={(e) => setBody(e.target.value)}
        />
      )}
      {fileUploadEnabled && (
        <>
          <MediaUploadForm
            handleRef={handleRef}
            previewSource={previewSource}
            deletePreview={deletePreview}
            myRef={myRef}
            handleFileChange={handleFileChange}
            caption={caption}
            handleInputChange={(e) => setCaption(e.target.value)}
          />
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
    </>
  );
};

export default PostForm;

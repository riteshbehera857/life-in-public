import { ArrowLeft } from "@components/ui/icons";
import { GhostBtnLoader } from "@components/ui/loaders";
import { useAuthContext } from "@hooks/auth/useAuthContext";
import { useCreatePost } from "@hooks/post/useCreatePost";
import useUpload from "@hooks/upload/useUpload";
import axios from "axios";
import React, { useEffect, useRef, useState, useCallback } from "react";
import { Button } from "..";
import PageHeader from "./PageHeader";
import PostForm from "./PostForm";
export interface FileResponse {
  _id: string;
  file: string;
  createdAt: Date;
  updatedAt: Date;
  user: string;
}

const CreatePostView = () => {
  const [fileUploadEnabled, setFileUploadEnabled] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File>();
  const { image, preview, uploading, deleteImage } = useUpload(selectedFile);

  const [caption, setCaption] = useState("");
  const [body, setBody] = useState("");

  const { createPost, isLoading, error } = useCreatePost();

  const onDrop = (acceptedFiles) => {
    setSelectedFile(acceptedFiles[0]);
  };

  const handlePostUpload = async () => {
    await uploadPostHandler();
  };

  const uploadPostHandler = async () => {
    const data = {
      cover: image ? image.file : null,
      caption: caption ? caption : null,
      body: body ? body : null,
    };
    await createPost(data);
  };

  const deletePreview = async () => {
    await deleteImage();
    setSelectedFile(null);
  };

  return (
    <div className="px-6 pb-4 flex flex-col h-screen">
      <div className="flex-grow">
        <PageHeader
          href="/"
          title="Create Post"
          icon={<ArrowLeft className="h-10 w-10 cursor-pointer" />}
        />
        <PostForm
          onDrop={onDrop}
          body={body}
          onChange={(e) => setBody(e.target.value)}
          previewSource={preview && preview}
          deletePreview={deletePreview}
          fileUploading={uploading}
          handleFileChange={(e) => setSelectedFile(e.target.files[0])}
          caption={caption}
          onCaptionInputChange={(e) => setCaption(e.target.value)}
          fileUploadEnabled={fileUploadEnabled}
          setFileUploadEnabled={setFileUploadEnabled}
        />
      </div>
      <Button onClick={handlePostUpload} variant="outlined" w="full">
        {!isLoading ? "Post" : <GhostBtnLoader />}
      </Button>
    </div>
  );
};

export default CreatePostView;

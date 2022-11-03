import { GhostBtnLoader } from "@components/ui/loaders";
import { useAuthContext } from "@hooks/auth/useAuthContext";
import { useCreatePost } from "@hooks/post/useCreatePost";
import React, { useEffect, useRef, useState } from "react";
import PageHeader from "./PageHeader";
import PostForm from "./PostForm";

const CreatePostView = () => {
  const [fileUploadEnabled, setFileUploadEnabled] = useState(false);
  const [previewSource, setPreviewSource] = useState<string>("");
  const [selectedFile, setSelectedFile] = useState<File>();
  const myRef = useRef<null | undefined | HTMLInputElement>();

  const [caption, setCaption] = useState("");
  const [body, setBody] = useState("");

  const { user } = useAuthContext();

  const { createPost, isLoading, error, progress, isSuccess } = useCreatePost();

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
    await createPost(data);
  };

  const deletePreview = () => {
    setPreviewSource("");
    setSelectedFile(undefined);
  };

  return (
    <div className="px-6">
      <PageHeader backHref="/" />
      <PostForm
        body={body}
        onChange={(e) => setBody(e.target.value)}
        handleRef={handleRef}
        previewSource={previewSource}
        deletePreview={deletePreview}
        myRef={myRef}
        handleFileChange={(e) => setSelectedFile(e.target.files[0])}
        caption={caption}
        onCaptionInputChange={(e) => setCaption(e.target.value)}
        fileUploadEnabled={fileUploadEnabled}
        setFileUploadEnabled={setFileUploadEnabled}
      />
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

export default CreatePostView;

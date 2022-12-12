import React, { useState, useEffect } from "react";
import type { FileResponse } from "@components/postForm/CreatePostView";
import axios from "axios";

const useUpload = (file: File) => {
  const [image, setImage] = useState<FileResponse>();
  const [preview, setPreview] = useState<string>("");
  const [uploading, setUploading] = useState<boolean>(false);

  const handlePreview = () => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreview(reader?.result as string);
    };
  };

  const deleteImage = async () => {
    await axios.delete(`http://localhost:8000/api/v1/upload/${image?._id}`);
  };

  const upload = async () => {
    setUploading(true);
    const fd = new FormData();
    fd.append("file", file);

    const { data } = await axios.post(
      "http://localhost:8000/api/v1/post/upload",
      fd
    );
    setImage(data?.data?.file);
    handlePreview();
    setUploading(false);
  };

  useEffect(() => {
    if (file) {
      upload();
    }
    if (!file) {
      setPreview(null);
      setImage(null);
      setUploading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [file]);

  return { preview, uploading, image, deleteImage };
};

export default useUpload;

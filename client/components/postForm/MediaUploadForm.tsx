import React from "react";
import FileInput from "@components/forms/FileInput";
import Input from "@components/forms/Input";

const MediaUploadForm = ({
  previewSource,
  deletePreview,
  handleFileChange,
  caption,
  onDrop,
  fileUploading,
  handleInputChange,
}) => {
  return (
    <>
      <FileInput
        onDrop={onDrop}
        previewSource={previewSource}
        deletePreview={deletePreview}
        fileUploading={fileUploading}
        onChange={handleFileChange}
        label="Select Photo"
      />
      <Input
        type="text"
        value={caption}
        label="Caption"
        name="caption"
        onChange={handleInputChange}
        placeholder="Capiton"
      />
    </>
  );
};

export default MediaUploadForm;

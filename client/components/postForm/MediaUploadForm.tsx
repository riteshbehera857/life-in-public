import React from "react";
import FileInput from "@components/forms/FileInput";
import Input from "@components/forms/Input";

const MediaUploadForm = ({
  handleRef,
  previewSource,
  deletePreview,
  myRef,
  handleFileChange,
  caption,
  handleInputChange,
}) => {
  return (
    <>
      <FileInput
        handleRef={handleRef}
        previewSource={previewSource}
        deletePreview={deletePreview}
        myRef={myRef}
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

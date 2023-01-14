import Image from "next/image";
import React from "react";

const Avatar = ({ src }) => {
  return (
    <div className="mr-4">
      <Image src={src} height={40} width={40} alt="avatar" />
    </div>
  );
};

export default Avatar;

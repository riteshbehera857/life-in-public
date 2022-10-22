import axios from "axios";
import React, { useEffect, useState } from "react";
import { BtnLoder, Layout } from "../../components";

const AssignUsernameAvatar = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [avatar, setAvatar] = useState();
  console.log(
    "🚀 ~ file: assign_username_avatar.tsx ~ line 8 ~ AssignUsernameAvatar ~ avatar",
    avatar
  );
  useEffect(() => {
    const handleAvatarAssign = async () => {
      const res = await axios.get(
        "https://avatars.dicebear.com/api/open-peeps/hari.svg"
      );
      setAvatar(res.data);
    };
    handleAvatarAssign();
  }, []);
  return (
    <div className="w-full h-[80vh] flex items-center justify-center">
      <div className="px-6 w-full flex flex-col items-center justify-center">
        <div className="bg-gray-300 h-36 w-36 rounded-full ring-2 ring-accent-primary">
          {/* <img src={avatar} alt="" /> */}
        </div>
        <div className="border-2 w-full text-center rounded-lg py-6 mt-4 border-slate-200 px-4">
          <p className="text-2xl">Ritesh Kumar Behera</p>
        </div>
        <button className="w-full mt-32 py-padding-y-btn text-center text-btn-text font-bold text-white bg-[#aa3eff] rounded-rounded-body mb-2">
          {isLoading ? <BtnLoder /> : "Continue"}
        </button>
      </div>
    </div>
  );
};

AssignUsernameAvatar.Layout = Layout;

export default AssignUsernameAvatar;

import Image from "next/future/image";
import React, { ReactElement } from "react";
import { Layout } from "../../components";
import { useAuthContext } from "../../hooks/auth/useAuthContext";

const Profile = () => {
  const { user } = useAuthContext();

  return (
    <div className="px-6">
      <div className="flex items-center gap-6 mt-5">
        <div className="h-[5rem] w-[5rem] rounded-full bg-slate-100 ring-2 ring-accent-primary">
          <Image src={user?.avatar} height={200} width={200} alt={user?._id} />
        </div>
        <div>
          <h1 className="text-[1.5rem] font-bold">{user?.fakeEmail}</h1>
        </div>
      </div>
    </div>
  );
};

Profile.Layout = Layout;

export default Profile;

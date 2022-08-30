import React, { ReactElement } from "react";
import { Layout } from "../../components";
import { useAuthContext } from "../../hooks/useAuthContext";

const Profile = () => {
  const { user } = useAuthContext();

  return (
    <div className="px-6">
      <div className="flex items-center gap-6 mt-5">
        <div className="h-[5rem] w-[5rem] rounded-full bg-slate-100 ring-2 ring-accent-primary">
          &nbsp;
        </div>
        <div>
          <h1 className="text-[1.5rem] font-bold">{user?.email}</h1>
        </div>
      </div>
    </div>
  );
};

Profile.Layout = Layout;

export default Profile;

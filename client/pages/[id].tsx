import React, { ReactElement } from "react";
import { Navbar } from "../components";
import { useStateContext } from "../context/StateContext";
import type { NextPageWithLayout } from "./_app";

const Profile: NextPageWithLayout = () => {
  const { user } = useStateContext();
  return (
    <div className="px-6">
      <div className="h-[8vh] flex items-center">
        <h1 className="text-[2.4rem] font-bold">
          {user?.firstname} {user?.lastname}
        </h1>
      </div>
      <div className="flex items-center gap-6">
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

Profile.getLayout = function PageLayout(page: ReactElement) {
  return (
    <>
      {page}
      <Navbar />
    </>
  );
};

export default Profile;

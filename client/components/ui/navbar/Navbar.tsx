import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { useStateContext } from "../../../context/StateContext";
import { Add, Bell, Home, HomeFill, Profile, ProfileFill } from "../icons";

const Navbar = () => {
  const router = useRouter();
  const path = router.asPath;

  const { userID } = useStateContext();
  return (
    <div className="bg-white bg-opacity-60 backdrop-blur-sm h-[8vh] border-slate-200 w-full fixed bottom-0 left-0 flex items-center justify-center gap-14 border-t">
      <Link href="/">
        <div className="cursor-pointer">
          {router.pathname === "/" ? (
            <HomeFill className="h-12 w-12" />
          ) : (
            <Home className="h-12 w-12" />
          )}
        </div>
      </Link>
      <Link href="/create_post">
        <div className="cursor-pointer">
          <Add className="h-12 w-12" />
        </div>
      </Link>
      <div>
        <Bell className="h-12 w-12" />
      </div>
      <Link href={`/${userID}`}>
        <div className="cursor-pointer">
          {router.pathname === "/[id]" ? (
            <ProfileFill className="h-12 w-12" />
          ) : (
            <Profile className="h-12 w-12" />
          )}
        </div>
      </Link>
    </div>
  );
};

export default Navbar;

import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { useAuthContext } from "../../../hooks/auth/useAuthContext";
import { Add, Bell, Home, HomeFill, Profile, ProfileFill } from "../icons";
import cn from "clsx";
import s from "./Navbar.module.css";

const Navbar = () => {
  const router = useRouter();

  const { user } = useAuthContext();

  return (
    <nav className={cn(s.nav)}>
      <Link href="/">
        <div className="cursor-pointer">
          {router.pathname === "/" ? (
            <HomeFill className="h-12 w-12" />
          ) : (
            <Home className="h-12 w-12" />
          )}
        </div>
      </Link>
      <Link href="/create">
        <div className="cursor-pointer">
          <Add className="h-12 w-12" />
        </div>
      </Link>
      <div>
        <Bell className="h-12 w-12" />
      </div>
      <Link href={`/${user?._id}`}>
        <div className="cursor-pointer">
          {router?.pathname === "/[id]" ? (
            <ProfileFill className="h-12 w-12" />
          ) : (
            <Profile className="h-12 w-12" />
          )}
        </div>
      </Link>
    </nav>
  );
};

export default Navbar;

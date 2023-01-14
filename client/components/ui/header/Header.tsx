import axios from "axios";
import Image from "next/future/image";
import { useRouter } from "next/router";
import { useState, useRef, useEffect } from "react";
import { useAuthContext } from "../../../hooks/auth/useAuthContext";
import { Logout } from "../icons";
import DropdownArrow from "../icons/DropdownArrow";
import logo from "./../../../public/assets/logo.svg";
import { motion } from "framer-motion";
import Search from "../icons/Search";
import cn from "clsx";
import s from "./Header.module.css";
// import Dropdown from "../dropdown/Dropdown";
import dynamic from "next/dynamic";
import FullPageLoader from "../loaders/FullPageLoader";
import { BlurView } from "../container";

axios.defaults.withCredentials = true;

const Loading = () => (
  <section className="h-screen w-screen flex items-center justify-center">
    <FullPageLoader />
  </section>
);

const dynamicProps = {
  loading: Loading,
};

const Dropdown = dynamic(() => import("../dropdown/Dropdown"), {
  ...dynamicProps,
});

const Header = () => {
  const { user, dispatch } = useAuthContext();
  const [dropdownActive, setDropdownActive] = useState(false);

  const router = useRouter();
  const handleLogout = async () => {
    await axios.post("http://localhost:8000/api/v1/auth/logout", {
      withCredentials: true,
    });
    dispatch({ type: "LOGOUT", payload: null });
    router.push("/auth/login");
  };
  return (
    <>
      <BlurView type="header">
        {router.pathname === `/[id]` ? (
          <h1 className="text-[2.4rem] font-bold">{user?.username}</h1>
        ) : (
          <div className="flex gap-2 items-center justify-center relative h-full">
            <Image
              height={120}
              width={120}
              priority={true}
              src={logo}
              alt={logo}
            />
            <DropdownArrow
              onClick={() => setDropdownActive((prev) => !prev)}
              className="h-10 w-10 cursor-pointer"
            />
          </div>
        )}
        {/* <span onClick={handleLogout} className="cursor-pointer">
        <Logout />
      </span> */}
      </BlurView>
      {dropdownActive ? (
        <Dropdown
          dropdownActive={dropdownActive}
          handleLogout={handleLogout}
          closeDropdown={() => setDropdownActive(false)}
        />
      ) : null}
    </>
  );
};

const SearchResults = ({ user, handleClick }) => (
  <div
    onClick={handleClick}
    className="flex items-center gap-4 mb-2 rounded-lg py-2 px-2 last:mb-0 bg-white w-full"
  >
    <div>
      <Image
        src={user ? user?.avatar : ""}
        alt={user?.username}
        height={40}
        width={40}
      />
    </div>
    <div>
      <p className="text-xl font-bold">{user?.fakeEmail}</p>
      <p>{user?.username}</p>
    </div>
  </div>
);

export default Header;

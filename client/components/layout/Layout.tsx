import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Header from "../ui/header/Header";
import Navbar from "../ui/navbar/Navbar";
import { useRouter } from "next/router";
import { useAuthContext } from "@hooks/auth/useAuthContext";
import FullPageLoader from "@components/ui/loaders/FullPageLoader";
import { useCookies } from "react-cookie";

interface LayoutProp {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProp) => {
  const { user, isLoading, redirected } = useAuthContext();
  const router = useRouter();
  const [path, setPath] = useState("/");
  const [_, setCookie] = useCookies();

  useEffect(() => {
    if (!redirected && !user && isLoading)
      router.push("/auth/login", undefined, { shallow: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, user, redirected]);

  useEffect(() => {
    router.pathname !== "/auth/login" && setPath(router.asPath);
  }, [router]);

  useEffect(() => {
    setCookie("route", path);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [path]);

  if (!user && isLoading)
    return (
      <section className="h-screen w-screen flex items-center justify-center">
        <FullPageLoader />
      </section>
    );

  return (
    <div>
      {router.pathname === "/" ? <Header /> : null}
      {router.pathname !== "/create" ? <Navbar /> : null}
      {children}
    </div>
  );
};

export default Layout;

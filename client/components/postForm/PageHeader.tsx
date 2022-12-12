import { ArrowLeft } from "@components/ui/icons";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

interface HeaderProps {
  href?: string;
  title: string;
  icon: React.ReactNode;
}

const PageHeader = ({ href, icon, title }: HeaderProps) => {
  const router = useRouter();
  return (
    <div className="w-full h-[8vh] px-5 flex items-center gap-4 border-b border-slate-200 sticky z-40 bg-white bg-opacity-60 backdrop-blur-sm top-0 left-0">
      <span onClick={() => router.push(`${href}`)}>{icon}</span>
      <h3 className="text-[2.4rem] font-bold">{title}</h3>
    </div>
  );
};

export default PageHeader;

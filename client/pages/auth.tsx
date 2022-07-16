import { NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";

const Auth: NextPage = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<number>(0);
  const handleActiveTab = (index: number, href: string) => {
    setActiveTab(index);
    router.push(`/${href}`);
  };
  return (
    <div className="bg-[#aa3eff] h-[100vh] xs:h-[100vh]">
      <div className="bg-gradient h-[100vh] xs:h-[100vh]">
        <div className="bg-glass p-[10px] h-full">
          <div className="w-full mb-[88px] xs:mb-[50px]">
            <Image
              src="/images/Auth_img.svg"
              width={408}
              height={416}
              layout="responsive"
              alt="Auth screen image"
            />
          </div>
          <div className="px-[33px] xs:px-[25px]">
            <div className="mb-[13px]">
              <h1 className="font-[Poppins] text-[#656565] font-extrabold text-center text-[27px]">
                <span className="text-[#aa3eff]">Discover</span> the new <br />{" "}
                way of sharing
              </h1>
            </div>
            <div className="mb-[67px] xs:mb-[40px]">
              <p className="font-medium text-[16px] text-center text-[#666666]">
                Now sharing your life became more
                <br />
                hasslefree as we don’t have to care for
                <br />
                our public identity
              </p>
            </div>
            <div
              className={`w-full ${
                activeTab === 0 ? "bg-gradient-x" : "bg-gradient-x-reverse"
              } flex rounded-[16px]`}
            >
              <div
                onClick={() => handleActiveTab(0, "register")}
                className={`w-1/2 px-[47px] ${
                  activeTab === 0 && "bg-white"
                } rounded-[16px] py-[29px] text-center cursor-pointer
              `}
              >
                <p className="text-[#666666] font-medium">Register</p>
              </div>
              <div
                onClick={() => handleActiveTab(1, "login")}
                className={`w-1/2 px-[47px] ${
                  activeTab === 1 && "bg-white"
                } rounded-[16px] py-[29px] text-center cursor-pointer`}
              >
                <p className="text-[#666666] font-medium">SignIn</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;

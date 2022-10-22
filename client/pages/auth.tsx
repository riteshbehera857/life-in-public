import Image from "next/future/image";
import { useRouter } from "next/router";
import { useState } from "react";

const Auth = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<number>(0);
  const handleActiveTab = (index: number, href: string) => {
    setActiveTab(index);
    router.push(`/auth/${href}`);
  };
  return (
    <div>
      <div className="w-3/4 mb-[20px] mx-auto xs:mb-[50px]">
        <Image
          src="/images/Auth_img.svg"
          width={408}
          height={416}
          alt="Auth screen image"
        />
      </div>
      <div className="px-[33px] xs:px-[25px]">
        <div className="mb-[14px]">
          <h1 className="font-[Poppins] text-[#656565] font-extrabold text-center text-[27px]">
            <span className="text-[#aa3eff]">Discover</span> the new <br /> way
            of sharing
          </h1>
        </div>
        <div className="mb-[8rem]">
          <p className="font-medium text-text-body text-center text-[#666666]">
            Now sharing your life became more
            <br />
            hasslefree as we don’t have to care for
            <br />
            our public identity
          </p>
        </div>
        <div
          className={`w-full flex rounded-[16px] bg-slate-100 shadow-md shadow-slate-100`}
        >
          <div
            onClick={() => handleActiveTab(0, "register")}
            className={`w-1/2 ${
              activeTab === 0 && "bg-slate-200"
            } rounded-[16px] py-padding-y-btn cursor-pointer text-center
              `}
          >
            <p className="text-[#666666] text-btn-text font-medium">Register</p>
          </div>
          <div
            onClick={() => handleActiveTab(1, "login")}
            className={`w-1/2 ${
              activeTab === 1 && "bg-slate-200"
            } rounded-[16px] py-padding-y-btn cursor-pointer text-center`}
          >
            <p className="text-[#666666] text-btn-text font-medium">SignIn</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;

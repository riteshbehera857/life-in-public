import Link from "next/link";
import React, { useState } from "react";

import { ILogin } from "../types";

const Login = () => {
  const [loginData, setLoginData] = useState<ILogin>({
    email: "",
    password: "",
  });
  const handleInput = (e: React.BaseSyntheticEvent) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  return (
    <div className="bg-[#aa3eff] h-[100vh] xs:h-[100vh]">
      <div className="bg-gradient h-[100vh] xs:h-[100vh]">
        <div className="bg-glass p-[10px] h-full px-[33px] xs:px-[25px] pt-[22rem] xs:pt-[12rem]">
          <div className="mb-10">
            <h1 className="font-[Poppins] font-extrabold text-[27px] text-[#656565] mb-[18px]">
              Hello 👋
            </h1>
            <p className="font-bold text-[#666666]">
              Welcome back,
              <br />
              you have been missed
            </p>
          </div>
          <div className="w-full">
            <form className="w-full">
              <input
                type="text"
                name="email"
                value={loginData.email}
                onChange={handleInput}
                className="py-[29px] w-full rounded-[16px] mb-[12px] pl-4 font-bold text-[#9d9d9d] focus:outline-[#aa3eff]"
                placeholder="Email Address"
              />
              <input
                type="password"
                name="password"
                value={loginData.password}
                onChange={handleInput}
                className="py-[29px] w-full rounded-[16px] pl-4 font-bold text-[#9d9d9d] focus:outline-[#aa3eff] mb-[74px]"
                placeholder="Password"
              />

              <button className="w-full py-[29px] text-center font-bold text-white text-[20px] bg-[#aa3eff] rounded-[16px] mb-2">
                Sign In
              </button>
              <p className="font-bold text-center">
                Not a member?{" "}
                <Link href="/register">
                  <span className="text-[#aa3eff]">Register</span>
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

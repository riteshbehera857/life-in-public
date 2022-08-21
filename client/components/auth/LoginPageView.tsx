import axios from "axios";
import Link from "next/link";
import React, { SyntheticEvent, useEffect, useState } from "react";
import { useLogin } from "../../hooks/useLogin";

import { ILogin } from "./../../types";

import { BtnLoder, Button } from "./../";
import { Eye, EyeOff } from "../ui/icons";
import { useRouter } from "next/router";

const LoginPageView = () => {
  const router = useRouter();
  const [loginData, setLoginData] = useState<ILogin>({
    email: "",
    password: "",
  });
  // const [loading, setLoading] = useState(false);
  // const [error, setError] = useState<string | null | undefined>(null);
  const [passwordType, setPasswordType] = useState(true);
  // const { setLoggedIn, setToken } = useStateContext();
  const { login, error, isLoading } = useLogin();

  const handleInput = (e: React.BaseSyntheticEvent) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const clear = () => {
    setLoginData({ email: "", password: "" });
  };

  useEffect(() => {
    console.log(isLoading ? "Loading..." : "Not Loading...");
  }, [isLoading]);

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    await login(loginData.email, loginData.password);
  };

  return (
    <div className="pt-[17.4rem]">
      <div className="px-[33px] xs:px-[25px]">
        <div className="mb-10">
          <h1 className="font-[Poppins] font-extrabold text-[27px] text-[#656565] mb-[18px]">
            Hello 👋
          </h1>
          <p className="font-bold text-text-body text-[#666666]">
            Welcome back,
            <br />
            you have been missed
          </p>
        </div>
        {error && (
          <div>
            <p>{error}</p>
          </div>
        )}
        <div className="w-full">
          <form onSubmit={handleSubmit} className="w-full">
            <input
              type="email"
              name="email"
              value={loginData.email}
              onChange={handleInput}
              className="py-padding-y-input w-full border border-accent-primary rounded-rounded-body mb-[12px] text-text-body font-bold px-padding-x-input text-[#9d9d9d] focus:outline-[#aa3eff]"
              placeholder="Email Address"
            />
            <div className="relative mb-[74px]">
              <input
                type={passwordType ? "password" : "text"}
                name="password"
                value={loginData.password}
                onChange={handleInput}
                className="py-padding-y-input border border-accent-primary text-text-body w-full rounded-rounded-body px-padding-x-input font-bold text-[#9d9d9d] focus:outline-[#aa3eff]"
                placeholder="Password"
              />
              <span
                onClick={() => setPasswordType((prev) => !prev)}
                className="absolute top-1/2 -translate-y-1/2 right-[2.2rem] cursor-pointer"
              >
                {passwordType ? <Eye /> : <EyeOff />}
              </span>
            </div>

            <button className="w-full py-padding-y-btn text-center text-btn-text font-bold text-white bg-[#aa3eff] rounded-rounded-body mb-2">
              {isLoading ? <BtnLoder /> : "Sign In"}
            </button>
            <p className="font-bold text-text-body cursor-pointer text-center">
              Not a member?{" "}
              <Link href="/auth/register">
                <span className="text-[#aa3eff]">Register</span>
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPageView;

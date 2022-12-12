import React, { SyntheticEvent, useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";

import { useAuthContext } from "@hooks/auth/useAuthContext";
import { useLogin } from "@hooks/auth/useLogin";
import { useUser } from "@hooks/auth/useUser";

import { ILogin } from "./../../types";
import { BtnLoder } from "@components/ui/loaders";
import { Eye, EyeOff } from "@components/ui/icons";
import { GET_USER } from "../../constants";
import Input from "@components/forms/Input";
import { Button } from "..";

const LoginPageView = () => {
  const [error, setError] = useState(false);
  const router = useRouter();
  const { refreshUser } = useUser();

  const [loginData, setLoginData] = useState<ILogin>({
    email: "",
    password: "",
  });
  const [passwordType, setPasswordType] = useState(true);

  const {
    login,
    error: loginError,
    isLoading,
    setIsLoading,
    setError: setLoginError,
  } = useLogin();

  const handleInput = (e: React.BaseSyntheticEvent) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const clear = () => {
    setLoginData({ email: "", password: "" });
  };

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    const data = await login(loginData.email, loginData.password);

    if (data?.error) {
      setError(true);
      setLoginError(data?.message);
      setIsLoading(false);
      setTimeout(() => {
        setError(false);
      }, 4000);
      return;
    }

    if (data?.accessToken) await refreshUser(data?.accessToken);
    setIsLoading(false);
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
        <div className="w-full">
          <form onSubmit={handleSubmit} className="w-full">
            <Input
              type="email"
              name="email"
              label="Email Address"
              placeholder="Email Address"
              value={loginData.email}
              onChange={handleInput}
              error={error}
            />
            <div className="relative">
              <Input
                type={passwordType ? "password" : "text"}
                name="password"
                label="Password"
                placeholder="Password"
                value={loginData.password}
                onChange={handleInput}
                error={error}
              />
              <span
                onClick={() => setPasswordType((prev) => !prev)}
                className="absolute top-1/2 -translate-y-1/2 right-[2.2rem] cursor-pointer"
              >
                {passwordType ? <Eye /> : <EyeOff />}
              </span>
              {error && loginError && (
                <p className="font-bold absolute top-[calc(100% + 2rem)] text-2xl text-red-600">
                  ⛔ {loginError}
                </p>
              )}
            </div>
            <Button variant="contained" w="full">
              {isLoading ? <BtnLoder /> : "Sign In"}
            </Button>
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

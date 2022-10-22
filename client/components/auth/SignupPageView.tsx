import Link from "next/link";
import { useRouter } from "next/router";
import { useState, BaseSyntheticEvent, SyntheticEvent } from "react";
import { BtnLoder } from "./../";
import { ILogin, IRegisterResponse } from "./../../types";
import { Eye, EyeOff } from "../ui/icons";
import { useSignup } from "./../../hooks/useSignup";

interface ISignup extends ILogin {
  firstname: string;
  lastname: string;
}

const SignupPageView = () => {
  const router = useRouter();
  const [signupData, setSignupData] = useState<ISignup>({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });
  const { signup, error, isLoading } = useSignup();
  // const [error, setError] = useState<string | null | undefined>(null);
  // const [loading, setLoading] = useState<boolean>(false);
  const [passwordType, setPasswordType] = useState(true);

  const clear = () => {
    setSignupData({
      firstname: "",
      lastname: "",
      email: "",
      password: "",
    });
  };

  const handleInput = (e: BaseSyntheticEvent) => {
    console.log(e);
    setSignupData({ ...signupData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    await signup(
      signupData.firstname,
      signupData.lastname,
      signupData.email,
      signupData.password
    );
  };

  return (
    <div className="pt-28">
      <div className="px-[33px] xs:px-[25px]">
        <div className="mb-10">
          <h1 className="font-[Poppins] font-extrabold text-[27px] text-[#656565] mb-[18px]">
            Hello 👋
          </h1>
          <p className="font-bold text-text-body text-[#666666]">
            Welcome,
            <br />
            to the new way of sharing
          </p>
        </div>
        {error && (
          <div>
            <p>{error}</p>
          </div>
        )}
        <div className="w-full">
          <form onSubmit={handleSubmit} className="w-full">
            <div className="w-full gap-3 flex justify-between font-[inherit]">
              <input
                type="text"
                name="firstname"
                value={signupData.firstname}
                onChange={handleInput}
                className="py-padding-y-input w-full rounded-rounded-body mb-[12px] text-text-body font-bold border border-accent-primary px-padding-x-input text-[#9d9d9d] focus:outline-[#aa3eff]"
                placeholder="Firstname"
              />
              <input
                type="text"
                name="lastname"
                value={signupData.lastname}
                onChange={handleInput}
                className="py-padding-y-input w-full border border-accent-primary rounded-rounded-body mb-[12px] text-text-body font-bold px-padding-x-input text-[#9d9d9d] focus:outline-[#aa3eff]"
                placeholder="Lastname"
              />
            </div>
            <input
              type="text"
              name="email"
              value={signupData.email}
              onChange={handleInput}
              className="py-padding-y-input w-full border border-accent-primary rounded-rounded-body mb-[12px] text-text-body font-bold px-padding-x-input text-[#9d9d9d] focus:outline-[#aa3eff]"
              placeholder="Email Address"
            />
            <div className="relative mb-[74px]">
              <input
                type={passwordType ? "password" : "text"}
                name="password"
                value={signupData.password}
                onChange={handleInput}
                className="py-padding-y-input w-full border border-accent-primary rounded-rounded-body text-text-body font-bold px-padding-x-input text-[#9d9d9d] focus:outline-[#aa3eff]"
                placeholder="Password"
              />
              <span
                onClick={() => setPasswordType((prev) => !prev)}
                className="absolute top-1/2 -translate-y-1/2 right-[2.2rem] cursor-pointer"
              >
                {passwordType ? <Eye /> : <EyeOff />}
              </span>
            </div>
            <button
              type="submit"
              className="w-full py-padding-y-btn text-center text-btn-text font-bold text-white bg-[#aa3eff] rounded-rounded-body mb-2"
            >
              {isLoading ? <BtnLoder /> : "Register"}
            </button>
            <p className="font-bold text-text-body cursor-pointer text-center">
              Already a member?{" "}
              <Link href="/auth/login">
                <span className="text-[#aa3eff]">Sign In</span>
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignupPageView;

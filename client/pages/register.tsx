import Link from "next/link";
import { useState, BaseSyntheticEvent } from "react";

import { ILogin } from "../types";

interface ISignup extends ILogin {
  firstname: string;
  lastname: string;
}

const Register = () => {
  const [signupData, setSignupData] = useState<ISignup>({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });

  const handleInput = (e: BaseSyntheticEvent) => {
    console.log(e);
    setSignupData({ ...signupData, [e.target.name]: e.target.value });
  };

  return (
    <div className="bg-[#aa3eff] h-auto xs:h-[100vh]">
      <div className="bg-gradient h-auto xs:h-[100vh]">
        <div className="bg-glass p-[10px] h-full px-[33px] xs:px-[25px] pt-[16rem] xs:pt-[6rem]">
          <div className="mb-10">
            <h1 className="font-[Poppins] font-extrabold text-[27px] text-[#656565] mb-[18px]">
              Hello 👋
            </h1>
            <p className="font-bold text-[#666666]">
              Welcome,
              <br />
              to the new way of sharing
            </p>
          </div>
          <div className="w-full">
            <form className="w-full">
              <div className="w-full gap-3 flex justify-between mb-[12px] font-[inherit]">
                <input
                  type="text"
                  name="firstname"
                  value={signupData.firstname}
                  onChange={handleInput}
                  className="py-[29px] w-full rounded-[16px] pl-4 font-bold text-[#9d9d9d] focus:outline-[#aa3eff]"
                  placeholder="Firstname"
                />
                <input
                  type="text"
                  name="lastname"
                  value={signupData.lastname}
                  onChange={handleInput}
                  className="py-[29px] w-full rounded-[16px] pl-4 font-bold text-[#9d9d9d] focus:outline-[#aa3eff]"
                  placeholder="Lastname"
                />
              </div>
              <input
                type="text"
                name="email"
                value={signupData.email}
                onChange={handleInput}
                className="py-[29px] w-full rounded-[16px] mb-[12px] pl-4 font-bold text-[#9d9d9d] focus:outline-[#aa3eff]"
                placeholder="Email Address"
              />
              <input
                type="password"
                name="password"
                value={signupData.password}
                onChange={handleInput}
                className="py-[29px] w-full rounded-[16px] pl-4 font-bold text-[#9d9d9d] focus:outline-[#aa3eff] mb-[74px]"
                placeholder="Password"
              />

              <button className="w-full py-[29px] text-center font-bold text-white text-[20px] bg-[#aa3eff] rounded-[16px] mb-2">
                Register
              </button>
              <p className="font-bold text-center">
                Already a member?{" "}
                <Link href="/login">
                  <span className="text-[#aa3eff]">Sign In</span>
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;

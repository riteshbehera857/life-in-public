import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Layout } from "@components/index";
import { useRandomUser } from "@hooks/helpers/useRandomUser";
import { useAuthContext } from "@hooks/auth/useAuthContext";
import { useUser } from "@hooks/auth/useUser";
import { ArrowRight } from "@components/ui/icons";
import { CircularLoader } from "@components/ui/loaders";
import Image from "next/future/image";

const AssignUsernameAvatar = () => {
  const router = useRouter();
  const id = router.query.id;
  const [isLoading, setIsLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [avatar, setAvatar] = useState("");
  const [fakeEmail, setFakeEmail] = useState("");
  const { error, generateRandomUser } = useRandomUser();
  const { user } = useAuthContext();
  const { refreshUser } = useUser();

  useEffect(() => {
    let subscribed = true;
    generateRandomUser()
      .then((res) => {
        console.log("Res", res);
        if (subscribed) {
          setUsername(res?.data?.items?.username);
          setAvatar(
            `https://api.multiavatar.com/${res?.data?.items?.username}.svg`
          );
          setFakeEmail(res?.data?.items?.email_fake);
        }
      })
      .catch((err) => console.log(err, "Avatar Error"));
    return () => {
      subscribed = false;
    };
  }, []);

  const handleUpdateUser = async () => {
    setIsLoading(true);
    try {
      const res = await axios.patch(`http://localhost:8000/user/${id}`, {
        username,
        avatar,
        fakeEmail,
      });
      await refreshUser();
      setIsLoading(false);
      router.push("/");
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full h-[80vh] flex items-center justify-center">
      <div className="px-6 w-full flex flex-col items-center justify-center">
        <div className="bg-gray-300 h-36 w-36 rounded-full ring-2 ring-accent-primary">
          {avatar && (
            <Image src={avatar ?? avatar} alt="" height={200} width={200} />
          )}
        </div>
        <div className="border-2 w-full text-center rounded-lg py-6 mt-4 border-slate-200 px-4">
          <p className="text-2xl">{username ?? username}</p>
        </div>
        <button
          type="button"
          onClick={handleUpdateUser}
          className="w-24 h-24 flex items-center justify-center mt-32 text-center text-white bg-[#aa3eff] rounded-full mb-2"
        >
          {isLoading ? <CircularLoader /> : <ArrowRight className="h-12" />}
        </button>
      </div>
    </div>
  );
};

export default AssignUsernameAvatar;

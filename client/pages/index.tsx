import type { NextPage } from "next";
import Image from "next/image";
import { LikeFill, Like, Comment } from "../components/ui/icons";
import avatar from "./../public/images/avatar.svg";

const Home: NextPage = () => {
  return (
    <div className="h-[90vh] px-6 pt-[2.5rem]">
      <div className="mb-10">
        <div className="flex items-center mb-[1rem]">
          <div className="mr-4">
            <Image src={avatar} height="" width="" alt="avatar" />
          </div>
          <div>
            <h3 className="font-medium text-[1.5rem]">Ritesh Kumar Behera</h3>
          </div>
        </div>
        <div className="p-[2rem] mb-[1.5rem] border border-[#E2E8F0] rounded-[8px]">
          <p className="text-[1.5rem]">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
            tempora beatae aliquid odio, qui quos temporibus, dolor tempore, cum
            laudantium non nam modi! Repudiandae incidunt, modi quod nihil eum
            quibusdam? Lorem, ipsum dolor sit amet consectetur adipisicing elit.
          </p>
        </div>
        <div className="flex items-center gap-[1rem] mb-[1rem]">
          <Like className="cursor-pointer h-12 w-12" />
          <Comment className="cursor-pointer h-12 w-12" />
        </div>
        <div className="">
          <p className="font-bold text-[1.5rem]">2000 likes</p>
        </div>
        <div className="mb-[1rem]">
          <p className="font-bold text-[1.5rem]">
            riteshbehera857{" "}
            <span className="font-normal">Good Food Good Mood</span>
          </p>
        </div>
        <div>
          <p className="text-[1.5rem] text-[#bbbbbb]">View all comments</p>
        </div>
        <div>
          <p className="text-[1.5rem] text-[#bbbbbb]">26 Jan, 2022</p>
        </div>
      </div>
      <div className="">
        <div className="flex items-center mb-[1rem]">
          <div className="mr-4">
            <Image src={avatar} height="" width="" alt="avatar" />
          </div>
          <div>
            <h3 className="font-medium text-[1.5rem]">Ritesh Kumar Behera</h3>
          </div>
        </div>
        <div className="p-[2rem] mb-[1.5rem] border border-[#E2E8F0] rounded-[8px]">
          <p className="text-[1.5rem]">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
            tempora beatae aliquid odio, qui quos temporibus, dolor tempore, cum
            laudantium non nam modi! Repudiandae incidunt, modi quod nihil eum
            quibusdam? Lorem, ipsum dolor sit amet consectetur adipisicing elit.
          </p>
        </div>
        <div className="flex items-center gap-[1rem] mb-[1rem]">
          <Like className="cursor-pointer h-12 w-12" />
          <Comment className="cursor-pointer h-12 w-12" />
        </div>
        <div className="">
          <p className="font-bold text-[1.5rem]">2000 likes</p>
        </div>
        <div className="mb-[1rem]">
          <p className="font-bold text-[1.5rem]">
            riteshbehera857{" "}
            <span className="font-normal">Good Food Good Mood</span>
          </p>
        </div>
        <div>
          <p className="text-[1.5rem] text-[#bbbbbb]">View all comments</p>
        </div>
        <div>
          <p className="text-[1.5rem] text-[#bbbbbb]">26 Jan, 2022</p>
        </div>
      </div>
    </div>
  );
};

export default Home;

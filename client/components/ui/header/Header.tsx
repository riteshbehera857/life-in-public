import Image from "next/image";
import logo from "./../../../public/assets/logo.svg";

const Header = () => {
  return (
    <nav className="w-full h-[8vh] pl-5 flex items-center border-b border-slate-200 sticky z-40 bg-white bg-opacity-[20] top-0 left-0">
      <div className="w-2/5">
        <Image height="" layout="responsive" width="" src={logo} alt="" />
      </div>
    </nav>
  );
};

export default Header;

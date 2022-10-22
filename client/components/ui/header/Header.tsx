import Image from "next/future/image";
import { useRouter } from "next/router";
import { useAuthContext } from "../../../hooks/useAuthContext";
import { Logout } from "../icons";
import logo from "./../../../public/assets/logo.svg";

const Header = () => {
  const { user, dispatch } = useAuthContext();
  const router = useRouter();
  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch({ type: "LOGOUT", payload: null });
    router.push("/auth/login");
  };
  return (
    <nav className="w-full h-[8vh] px-5 flex items-center justify-between border-b border-slate-200 sticky z-40 bg-white bg-opacity-60 backdrop-blur-sm top-0 left-0">
      {router.pathname === `/[id]` ? (
        <h1 className="text-[2.4rem] font-bold">
          {user?.firstname} {user?.lastname}
        </h1>
      ) : (
        <div className="w-2/5">
          <Image height="" width="" src={logo} alt={logo} />
        </div>
      )}
      <span onClick={handleLogout} className="cursor-pointer">
        <Logout />
      </span>
    </nav>
  );
};

export default Header;

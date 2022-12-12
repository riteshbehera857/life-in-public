import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import Search from "../icons/Search";
import ClickOutside from "../../../lib/click-outside/click-outside";

const Dropdown = ({ closeDropdown, handleLogout, ...props }) => {
  const [results, setResults] = useState([]);
  const dropdownRef = useRef<HTMLDivElement | null>();
  const router = useRouter();

  useEffect(() => {
    const handleCloseDropdown = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        event.path[0].localName !== "svg"
      ) {
        closeDropdown && closeDropdown();
      }
    };
    document.addEventListener("click", handleCloseDropdown, true);

    return () => {
      document.removeEventListener("click", handleCloseDropdown, true);
    };
  }, [closeDropdown]);

  return (
    <ClickOutside onClick={closeDropdown()}>
      <motion.div
        animate={{ opacity: [0, 0.5, 1], y: [10, 0] }}
        transition={{ duration: 0.3 }}
        ref={dropdownRef}
        style={{ left: "50%", translateX: "-50%" }}
        className="bg-[#e4e4e4] absolute top-[7rem] z-[999] w-[70%] cursor-pointer rounded-lg bg-opacity-40 backdrop-blur-md"
      >
        <div onClick={handleLogout} className="py-6 border-b-2">
          <h1 className="text-3xl font-bold text-center">Logout</h1>
        </div>
        <div className="relative py-6">
          <div>
            <Search className="absolute h-10 w-10 top-1/2 left-4 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Username or email"
              onChange={async (e) => {
                const { value } = e.target;
                const res = await axios.get(
                  `http://localhost:8000/user/search?q=${value}`
                );
                setResults(res.data?.data?.data);
              }}
              className="w-full h-full bg-transparent text-center text-3xl focus:outline-none"
            />
          </div>

          {/* {results && (
          <div className="flex flex-col absolute top-[105%] w-full p-2 bg-[#e4e4e4] z-[999] cursor-pointer rounded-lg">
            {results?.map((user) => (
              <SearchResults
                key={user?._id}
                handleClick={() => router.push(`/user/${user?._id}`)}
                user={user}
              />
            ))}
          </div>
        )} */}
        </div>
      </motion.div>
    </ClickOutside>
  );
};

export default Dropdown;

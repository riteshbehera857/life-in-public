import { useEffect } from "react";

const useClickOutside = (ref, cb) => {
  useEffect(() => {
    const handleCloseDropdown = (event) => {
      if (
        ref.current &&
        !ref.current.contains(event.target) &&
        event.path[0].localName !== "svg"
      ) {
        cb && cb();
      }
    };
    document.addEventListener("click", handleCloseDropdown, true);

    return () => {
      document.removeEventListener("click", handleCloseDropdown, true);
    };
  }, [ref]);
};

export default useClickOutside;

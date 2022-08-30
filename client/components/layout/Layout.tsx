import Header from "../ui/header/Header";
import Navbar from "../ui/navbar/Navbar";

const Layout = ({ children }: any) => {
  return (
    <div>
      <Header />
      <Navbar />
      {children}
    </div>
  );
};

export default Layout;

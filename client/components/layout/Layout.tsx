import { Header, Navbar } from "../";

const Layout = ({ children }) => {
  return (
    <div>
      <Header />
      {children}
      <Navbar />
    </div>
  );
};

export default Layout;

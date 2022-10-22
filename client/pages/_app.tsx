import "../styles/globals.css";
import { AuthContextProvider } from "../context/AuthContext";
import { PostContextProvider } from "../context/PostContext";
import { CookiesProvider } from "react-cookie";

const Noop: React.FC = ({ children }: any) => <>{children}</>;

function MyApp({ Component, pageProps }) {
  const Layout = (Component as any).Layout || Noop;

  const AnyComponent = Component as any;

  return (
    <CookiesProvider>
      <AuthContextProvider>
        <PostContextProvider>
          <Layout>
            <AnyComponent {...pageProps} />
          </Layout>
        </PostContextProvider>
      </AuthContextProvider>
    </CookiesProvider>
  );
}

export default MyApp;

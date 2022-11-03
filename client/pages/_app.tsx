import "../styles/globals.css";
import { AuthContextProvider } from "../context/AuthContext";
import { PostContextProvider } from "../context/PostContext";
import { CookiesProvider } from "react-cookie";
import { store } from "./../store";
import { Provider } from "react-redux";

const Noop: React.FC = ({ children }: any) => <>{children}</>;

function MyApp({ Component, pageProps }) {
  const Layout = (Component as any).Layout || Noop;

  const AnyComponent = Component as any;

  return (
    <CookiesProvider>
      <AuthContextProvider>
        <PostContextProvider>
          <Provider store={store}>
            <Layout>
              <AnyComponent {...pageProps} />
            </Layout>
          </Provider>
        </PostContextProvider>
      </AuthContextProvider>
    </CookiesProvider>
  );
}

export default MyApp;

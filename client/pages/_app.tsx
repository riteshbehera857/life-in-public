import "../styles/globals.css";
import type { AppProps } from "next/app";
import { AuthContextProvider } from "../context/AuthContext";
import { Header, Layout, Navbar } from "../components";
import { NextPage } from "next";
import { ReactElement, ReactNode } from "react";
import { CookiesProvider } from "react-cookie";

export type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const Noop: React.FC = ({ children }: any) => <>{children}</>;

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const Layout = (Component as any).Layout || Noop;

  const AnyComponent = Component as any;

  return (
    // <CookiesProvider>
    <AuthContextProvider>
      <Layout>
        <AnyComponent {...pageProps} />
      </Layout>
    </AuthContextProvider>
    // </CookiesProvider>
  );
}

export default MyApp;

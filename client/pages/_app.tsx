import "../styles/globals.css";
import type { AppProps } from "next/app";
import { AuthContext } from "../context/StateContext";
import { Header, Layout, Navbar } from "../components";
import { NextPage } from "next";
import { ReactElement, ReactNode } from "react";

export type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  if (Component.getLayout) {
    return Component.getLayout(
      <AuthContext>
        <Component {...pageProps} />
      </AuthContext>
    );
  }
  return (
    <AuthContext>
      <Layout>
        <Header />
        <Navbar />
        <Component {...pageProps} />
      </Layout>
    </AuthContext>
  );
}

export default MyApp;

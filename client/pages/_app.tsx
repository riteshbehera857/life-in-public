import "../styles/globals.css";
import type { AppProps } from "next/app";
import { AuthContext } from "../context/StateContext";
import { Layout } from "../components";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthContext>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AuthContext>
  );
}

export default MyApp;

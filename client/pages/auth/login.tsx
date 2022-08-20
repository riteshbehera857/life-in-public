import { ReactElement } from "react";
import { LoginPageView } from "../../components";
import type { NextPageWithLayout } from "../_app";

const Login: NextPageWithLayout = () => {
  return <LoginPageView />;
};

Login.getLayout = function PageLayout(page: ReactElement) {
  return <>{page}</>;
};

export default Login;

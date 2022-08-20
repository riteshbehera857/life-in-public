import { ReactElement } from "react";
import { SignupPageView } from "../../components";
import type { NextPageWithLayout } from "../_app";

const Register: NextPageWithLayout = () => {
  return <SignupPageView />;
};

Register.getLayout = function PageLayout(page: ReactElement) {
  return <>{page}</>;
};

export default Register;

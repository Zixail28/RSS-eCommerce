import { Navigate } from "react-router-dom";
import { useAppSelector } from "../hooks/hooks";

import Layout from "../pages/Layout";

export const PrivateRoute = () => {
  const { isAuth } = useAppSelector((state) => state.auth);
  return isAuth ? <Layout /> : <Navigate to="/login" />;
};

import { Navigate, Outlet, useLocation } from "react-router";
import useAuth from "../hooks/useAuth";

const PrivetRoute = () => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (user) {
    return <Outlet />;
  }

  return <Navigate to={"/login"} state={location.pathname} />;
};

export default PrivetRoute;

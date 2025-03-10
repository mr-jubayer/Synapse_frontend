import { Navigate, Outlet } from "react-router";
import useAuth from "../hooks/useAuth";

const UnauthorizedAccess = () => {
  const { user, loading } = useAuth();

  if (loading) return <h2>Loading</h2>;

  if (user) return <Navigate to={"/"} />;
  return <Outlet />;
};

export default UnauthorizedAccess;

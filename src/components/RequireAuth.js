import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const RequireAuth = ({ allowedRoles }) => {
  const { auth } = useAuth();
  const location = useLocation();

  const curRole = localStorage.getItem("role");
  const curAccessToken = localStorage.getItem("token");
  return allowedRoles.includes(curRole) ? (
    <Outlet />
  ) : curAccessToken ? (
    <Navigate to="/home" state={{ from: location }} replace />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;

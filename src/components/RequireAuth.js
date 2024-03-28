import { useLocation, Navigate, Outlet } from "react-router-dom";

import { useSelector } from "react-redux";

const RequireAuth = ({ allowedRoles }) => {
  //data gula nile context api lagbe na
  const auth = useSelector((state) => state?.user?.currentUser);
  console.log(auth);
  const location = useLocation();

  return auth?.role?.find((role) => allowedRoles?.includes(role)) ? (
    <Outlet />
  ) : auth?.user ? (
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;

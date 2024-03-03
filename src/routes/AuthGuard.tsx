import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useAuth } from "hooks";
import type { RoleType } from "types";

const AuthGuard = ({allowedRoles}: {allowedRoles: RoleType[]} ) => {
    const { role: auth } = useAuth()
    const location = useLocation();

    return allowedRoles.find((role) => auth === role) ? (
        <Outlet />
    ) : <Navigate to="/" state={{ from: location }} replace />
};

export default AuthGuard;
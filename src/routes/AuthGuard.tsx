import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useAuth } from "hooks";

type IRole = 'admin' | 'editor' | 'user' | 'guest';

const AuthGuard = ({allowedRoles}: {allowedRoles: IRole[]} ) => {
    const { role: auth } = useAuth()
    const location = useLocation();

    return allowedRoles.find((role) => auth === role) ? (
        <Outlet />
    ) : <Navigate to="/" state={{ from: location }} replace />
};

export default AuthGuard;
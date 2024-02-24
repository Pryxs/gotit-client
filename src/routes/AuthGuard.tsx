import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useAuth } from "hooks";

type IRole = 'admin' | 'editor' | 'user' | 'guest';

const AuthGuard = ({allowedRoles}: {allowedRoles: IRole[]} ) => {
    const auth = useAuth()
    console.log(auth)
    const location = useLocation();

    return allowedRoles.find((role) => auth === role) ? (
        <Outlet />
    ) : <Navigate to="/home" state={{ from: location }} replace />
};

export default AuthGuard;
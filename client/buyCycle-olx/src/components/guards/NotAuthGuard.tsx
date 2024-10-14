import { useContext } from "react";
import AuthContext from "../../contexts/authContext";
import { Navigate, Outlet } from "react-router-dom";



export default function NotAuthGuard() {
    const { isAuthenticated }: any = useContext(AuthContext);

    if (isAuthenticated) {
        return <Navigate to='/error' />;
    }

    return (
        <>
            <Outlet />
        </>
    )
}
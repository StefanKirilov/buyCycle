import { useContext, useEffect } from "react";

import * as userService from '../../services/userService';
import { useNavigate } from "react-router-dom";
import AuthContext from "../../contexts/authContext";

export default function Logout() {
    const navigate = useNavigate();
    const { logoutHandler } : any = useContext(AuthContext);

    useEffect(() => {
        userService.logout()
        .then(() => logoutHandler())
        .catch(() => navigate('/'));
    },[]);
    return null;
}
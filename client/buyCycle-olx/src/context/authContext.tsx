import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import { bake_cookie, read_cookie, delete_cookie } from "sfcookies";

import * as userService from "../services/userService";

const AuthContext = createContext("");

let cookie = read_cookie("auth");
// console.log(cookie);

export const AuthProvider = ({ children }: any) => {
  const navigate = useNavigate();
  const [auth, setAuth] = useState<any>(read_cookie("auth"));

  const loginSubmitHandler = async (data: any) => {
    const result = await userService.login(data);
    setAuth(result);

    bake_cookie("auth", result);

    navigate("/");
  };

  const registerSubmitHandler = async (data: any) => {
    const result = await userService.register(data);
    setAuth(result);

    bake_cookie("auth", result);

    navigate("/");
  };

  const logoutHandler = async () => {
    setAuth({});

    delete_cookie("auth");

    //
    // bake_cookie('shop', []);

    navigate("/");
  };

  const editProfileSubmitHandler = async (data: any) => {
    const result = await userService.editProfile(data);

    setAuth(result);

    bake_cookie("auth", result);
  };

  const values: any = {
    loginSubmitHandler,
    registerSubmitHandler,
    logoutHandler,
    editProfileSubmitHandler,
    userId: auth._id,
    email: auth.email,
    username: auth.username,
    isAuthenticated: !!auth.accessToken,
  };
  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export default AuthContext;

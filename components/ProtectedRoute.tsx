import { useAppDispatch } from "@/core/store";
import { logInAnonymously } from "@/redux/loginSlice/slice";
import { getLoggedUser } from "@/redux/signUp/slice";
import { ROUTES } from "@/utils/routes";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useAppDispatch();
  const userId = "loggedin"; //global.window && window.sessionStorage.getItem("authToken");
  const routes = useRouter();
  useEffect(() => {
    if (!userId) {
      dispatch(logInAnonymously());
      routes.push(ROUTES.LOGIN);
    } else {
      dispatch(getLoggedUser());
    }
  }, [dispatch, routes, userId]);
  return <>{userId ? children : <></>}</>;
};

export default ProtectedRoute;

import { useAppDispatch, useAppSelector } from "@/core/store";
import { getLoggedUserData } from "@/redux/getLoggedUser/slice";
import { logInAnonymously } from "@/redux/loginSlice/slice";
import { ROUTES } from "@/utils/routes";
import { NoSsr } from "@mui/material";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useAppDispatch();
  const userId = global.window && window.sessionStorage.getItem("authToken");
  const routes = useRouter();
  const user = useAppSelector((state) => state.loggedUser.user);
  useEffect(() => {
    if (!userId) {
      user.companyId.length &&
        sessionStorage.setItem("companyId", user.companyId);
      dispatch(logInAnonymously());
      routes.push(ROUTES.LOGIN);
    } else {
      dispatch(getLoggedUserData()).then(() => {
        sessionStorage.setItem("companyId", user.companyId);
      });
    }
  }, [dispatch, routes, userId, user.companyId]);
  return (
    <NoSsr>
      <>{userId && children}</>
    </NoSsr>
  );
};

export default ProtectedRoute;

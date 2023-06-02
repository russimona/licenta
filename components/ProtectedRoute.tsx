import { useAppDispatch } from "@/core/store";
import { getAllProjectData } from "@/redux/getAllProjects/slice";
import { getLoggedUserData } from "@/redux/getLoggedUser/slice";
import { getNationalDaysOff } from "@/redux/getNationalDaysOff/slice";
import { logInAnonymously } from "@/redux/loginSlice/slice";
import { ROUTES } from "@/utils/routes";
import { NoSsr } from "@mui/material";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useAppDispatch();
  const userId = global.window && window.sessionStorage.getItem("authToken");
  const routes = useRouter();
  useEffect(() => {
    if (!userId) {
      dispatch(logInAnonymously());
      routes.push(ROUTES.LOGIN);
    } else {
      dispatch(getLoggedUserData());
      dispatch(getAllProjectData());
      dispatch(getNationalDaysOff());
    }
  }, [dispatch, routes, userId]);
  return (
    <NoSsr>
      <>{userId && children}</>
    </NoSsr>
  );
};

export default ProtectedRoute;

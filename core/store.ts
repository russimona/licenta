import { addFreeDaysReducer } from "@/redux/addFreeDays/slice";
import { addNewProjectReducer } from "@/redux/addNewProject/slice";
import { allProjectDataReducer } from "@/redux/getAllProjects/slice";
import { allUserDataReducer } from "@/redux/getAllUsers/slice";
import { daysOffReducer } from "@/redux/getFreeDays/slice";
import { loggedUserDataReducer } from "@/redux/getLoggedUser/slice";
import { nationalDaysOffReducer } from "@/redux/getNationalDaysOff/slice";
import { selectedProjectDataReducer } from "@/redux/getSelectedProject/slice";
import { loginReducer } from "@/redux/loginSlice/slice";
import { logOutReducer } from "@/redux/logOut/slice";
import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";

export const store = configureStore({
  reducer: {
    loggedUser: loggedUserDataReducer,
    logIn: loginReducer,
    signOut: logOutReducer,
    nationalDaysOff: nationalDaysOffReducer,
    daysOff: daysOffReducer,
    requestDaysOff: addFreeDaysReducer,
    allUsers: allUserDataReducer,
    newProject: addNewProjectReducer,
    projects: allProjectDataReducer,
    selectedProject: selectedProjectDataReducer,
  },
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// use these instead of useDispatch and useSelector.
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

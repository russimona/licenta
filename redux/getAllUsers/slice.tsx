import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ReduxThunkStatuses } from "@/utils/reduxThunkStatuses";
import { STRINGS } from "@/utils/strings";
import getUserData from "@/services/getLoggedUserInfo";
import getAllUsers from "@/services/getAllUsers";
import { ILoggedUserData } from "@/utils/interface";

const initialState = {
  status: "idle",
  error: "",
  user: [] as ILoggedUserData[],
};

export const getAllUserData = createAsyncThunk("getAllUserData", async () => {
  try {
    const uid = sessionStorage.getItem("authToken") ?? "";
    const result = getAllUsers();
    return result;
  } catch (e) {
    throw new Error(e as string);
  }
});

const allUserData = createSlice({
  name: "loggedAllData",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllUserData.pending, (state) => {
      state.status = ReduxThunkStatuses.PENDING;
    });
    builder.addCase(getAllUserData.fulfilled, (state, action) => {
      state.status = ReduxThunkStatuses.FULFILLED;
      state.user = action.payload;
    });
    builder.addCase(getAllUserData.rejected, (state, { error }) => {
      state.error = error.message || STRINGS.GENERIC_ERROR_MESSAGE;
      state.status = ReduxThunkStatuses.REJECTED;
    });
  },
});

export const allUserDataActions = allUserData.actions;
export const allUserDataReducer = allUserData.reducer;

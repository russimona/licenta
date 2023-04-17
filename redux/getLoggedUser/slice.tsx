import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ReduxThunkStatuses } from "@/utils/reduxThunkStatuses";
import { STRINGS } from "@/utils/strings";
import { getLoggedUserInfo } from "@/services/getLoggedUserInfo";

const initialState = {
  status: "idle",
  error: "",
  user: {
    uid: "",
    email: "",
    firstName: "",
    lastName: "",
    firstTimeEntering: false,
  },
};

export const getLoggedUserData = createAsyncThunk("getAllEvents", async () => {
  try {
    return getLoggedUserInfo();
  } catch (e) {
    throw new Error(e as string);
  }
});

const loggedUserData = createSlice({
  name: "loggedUserData",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getLoggedUserData.pending, (state) => {
      state.status = ReduxThunkStatuses.PENDING;
    });
    builder.addCase(getLoggedUserData.fulfilled, (state, action) => {
      state.status = ReduxThunkStatuses.FULFILLED;
      state.user.email = action.payload?.email;
      state.user.firstName = action.payload?.firstName;
      state.user.lastName = action.payload?.lastName;
      state.user.uid = sessionStorage.getItem("authToken") ?? "";
    });
    builder.addCase(getLoggedUserData.rejected, (state, { error }) => {
      state.error = error.message || STRINGS.GENERIC_ERROR_MESSAGE;
      state.status = ReduxThunkStatuses.REJECTED;
    });
  },
});

export const loggedUserDataActions = loggedUserData.actions;
export const loggedUserDataReducer = loggedUserData.reducer;

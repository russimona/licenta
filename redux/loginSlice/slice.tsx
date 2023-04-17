import { ILoginData } from "@/utils/interface";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ReduxThunkStatuses } from "@/utils/reduxThunkStatuses";
import { STRINGS } from "@/utils/strings";
import { logIn } from "@/services/logIn";

const initialState = {
  status: "idle",
  error: "",
};

export const logInUser = createAsyncThunk(
  "getAllEvents",
  async (props: ILoginData) => {
    try {
      logIn(props);
    } catch (e) {
      throw new Error(e as string);
    }
  }
);

const logInUserData = createSlice({
  name: "logInUserData",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(logInUser.pending, (state) => {
      state.status = ReduxThunkStatuses.PENDING;
    });
    builder.addCase(logInUser.fulfilled, (state) => {
      state.status = ReduxThunkStatuses.FULFILLED;
    });
    builder.addCase(logInUser.rejected, (state, { error }) => {
      state.error = error.message || STRINGS.GENERIC_ERROR_MESSAGE;
      state.status = ReduxThunkStatuses.REJECTED;
    });
  },
});

export const predictionDataActions = logInUserData.actions;
export const predictionDataReducer = logInUserData.reducer;

import { ISignUpData } from "@/utils/interface";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ReduxThunkStatuses } from "@/utils/reduxThunkStatuses";
import { STRINGS } from "@/utils/strings";
import { signUp } from "@/services/signUp";

const initialState = {
  status: "idle",
  error: "",
};

export const signUpUser = createAsyncThunk(
  "getAllEvents",
  async (props: ISignUpData) => {
    try {
      signUp(props);
    } catch (e) {
      throw new Error(e as string);
    }
  }
);

const signUpUserData = createSlice({
  name: "signUpUserData",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(signUpUser.pending, (state) => {
      state.status = ReduxThunkStatuses.PENDING;
    });
    builder.addCase(signUpUser.fulfilled, (state, action) => {
      state.status = ReduxThunkStatuses.FULFILLED;
    });
    builder.addCase(signUpUser.rejected, (state, { error }) => {
      state.error = error.message || STRINGS.GENERIC_ERROR_MESSAGE;
      state.status = ReduxThunkStatuses.REJECTED;
    });
  },
});

export const predictionDataActions = signUpUserData.actions;
export const predictionDataReducer = signUpUserData.reducer;

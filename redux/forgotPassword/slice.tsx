import { IResetPasswordData } from "@/utils/interface";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ReduxThunkStatuses } from "@/utils/reduxThunkStatuses";
import { STRINGS } from "@/utils/strings";
import { resetPassword } from "@/services/forgotPassword";

const initialState = {
  status: "idle",
  error: "",
};

export const resetPasswordUser = createAsyncThunk(
  "resetPassword",
  async (props: IResetPasswordData) => {
    try {
      resetPassword(props);
    } catch (e) {
      throw new Error(e as string);
    }
  }
);

const seretPasswordUserData = createSlice({
  name: "resetPasswordUserData",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(resetPasswordUser.pending, (state) => {
      state.status = ReduxThunkStatuses.PENDING;
    });
    builder.addCase(resetPasswordUser.fulfilled, (state) => {
      state.status = ReduxThunkStatuses.FULFILLED;
    });
    builder.addCase(resetPasswordUser.rejected, (state, { error }) => {
      state.error = error.message || STRINGS.GENERIC_ERROR_MESSAGE;
      state.status = ReduxThunkStatuses.REJECTED;
    });
  },
});

export const predictionDataActions = seretPasswordUserData.actions;
export const predictionDataReducer = seretPasswordUserData.reducer;

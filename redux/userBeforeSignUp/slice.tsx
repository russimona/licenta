import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ReduxThunkStatuses } from "@/utils/reduxThunkStatuses";
import { STRINGS } from "@/utils/strings";
import {
  IUserBeforeSignUpData,
  sendUserDataBeforeSignUpHandler,
} from "@/services/addUserBeforeSignup";

const initialState = {
  status: "idle",
  error: "",
};

export const addUserBeforeSignUp = createAsyncThunk(
  "addFreeDays ",
  async (props: IUserBeforeSignUpData) => {
    try {
      sendUserDataBeforeSignUpHandler(props);
    } catch (e) {
      console.log(e);

      throw new Error(e as string);
    }
  }
);

const addUserBeforeSignUpSlice = createSlice({
  name: "addFreeDays Data",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addUserBeforeSignUp.pending, (state) => {
      state.status = ReduxThunkStatuses.PENDING;
    });
    builder.addCase(addUserBeforeSignUp.fulfilled, (state) => {
      state.status = ReduxThunkStatuses.FULFILLED;
    });
    builder.addCase(addUserBeforeSignUp.rejected, (state, { error }) => {
      state.error = error.message || STRINGS.GENERIC_ERROR_MESSAGE;
      state.status = ReduxThunkStatuses.REJECTED;
    });
  },
});

export const addUserBeforeSignUpActions = addUserBeforeSignUpSlice.actions;
export const addUserBeforeSignUpReducer = addUserBeforeSignUpSlice.reducer;

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ReduxThunkStatuses } from "@/utils/reduxThunkStatuses";
import { STRINGS } from "@/utils/strings";
import { TEvent } from "react-full-year-scheduler/dist/lib/utils/types";
import { addNationalDays } from "@/services/addNationalDaysOff";

const initialState = {
  status: "idle",
  error: "",
};

export const addNationalDaysOff = createAsyncThunk(
  "addNatioalDaysOff",
  async (props: TEvent) => {
    try {
      addNationalDays(props);
    } catch (e) {
      throw new Error(e as string);
    }
  }
);

const addNationalDaysOffData = createSlice({
  name: "addNationalDaysOffData",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addNationalDaysOff.pending, (state) => {
      state.status = ReduxThunkStatuses.PENDING;
    });
    builder.addCase(addNationalDaysOff.fulfilled, (state) => {
      state.status = ReduxThunkStatuses.FULFILLED;
    });
    builder.addCase(addNationalDaysOff.rejected, (state, { error }) => {
      state.error = error.message || STRINGS.GENERIC_ERROR_MESSAGE;
      state.status = ReduxThunkStatuses.REJECTED;
    });
  },
});

export const addNationalDaysOffActions = addNationalDaysOffData.actions;
export const addNationalDaysOffReducer = addNationalDaysOffData.reducer;

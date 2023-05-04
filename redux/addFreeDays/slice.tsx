import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ReduxThunkStatuses } from "@/utils/reduxThunkStatuses";
import { STRINGS } from "@/utils/strings";
import { TEvent } from "react-full-year-scheduler/dist/lib/utils/types";
import { addFreeDays as addFreeDaysService } from "@/services/addFreeDay";
import { IAddFreeDays } from "@/utils/interface";

const initialState = {
  status: "idle",
  error: "",
};

export const addFreeDays = createAsyncThunk(
  "addFreeDays ",
  async (props: IAddFreeDays) => {
    try {
      addFreeDaysService(props);
    } catch (e) {
      throw new Error(e as string);
    }
  }
);

const addFreeDaysData = createSlice({
  name: "addFreeDays Data",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addFreeDays.pending, (state) => {
      state.status = ReduxThunkStatuses.PENDING;
    });
    builder.addCase(addFreeDays.fulfilled, (state) => {
      state.status = ReduxThunkStatuses.FULFILLED;
    });
    builder.addCase(addFreeDays.rejected, (state, { error }) => {
      state.error = error.message || STRINGS.GENERIC_ERROR_MESSAGE;
      state.status = ReduxThunkStatuses.REJECTED;
    });
  },
});

export const addFreeDaysActions = addFreeDaysData.actions;
export const addFreeDaysReducer = addFreeDaysData.reducer;

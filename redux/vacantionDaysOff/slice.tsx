import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ReduxThunkStatuses } from "@/utils/reduxThunkStatuses";
import { STRINGS } from "@/utils/strings";
import dayjs from "dayjs";
import getNationalDaysService from "@/services/getNationalDaysOff";
import { TEvent } from "@/utils/interface";

const initialState = {
  status: "idle",
  error: "",
  event: [] as TEvent[],
};

export const getNationalDaysOff = createAsyncThunk(
  "getNationalDaysOffData",
  async () => {
    try {
      const result = await getNationalDaysService();
      const events: TEvent[] = result.map((item) => {
        return {
          eventName: item.eventName,
          startDate: dayjs(item.startDate),
          endDate: dayjs(item.endDate),
          eventBgColor: item.eventBgColor,
          eventTextColor: item.eventTextColor,
          status: item.status,
        };
      });

      return events as TEvent[];
    } catch (e) {
      throw new Error(e as string);
    }
  }
);

const nationalDaysOffData = createSlice({
  name: "nationalDaysOffData",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getNationalDaysOff.pending, (state) => {
      state.status = ReduxThunkStatuses.PENDING;
    });
    builder.addCase(getNationalDaysOff.fulfilled, (state, action) => {
      const result = [] as TEvent[];
      action?.payload.forEach((item) => {
        result.push({
          startDate: item.startDate,
          endDate: item.endDate,
          eventName: item.eventName,
          eventBgColor: item.eventBgColor,
          eventTextColor: item.eventTextColor,
          status: item.status,
        });
      });
      state.event = result;
    });
    builder.addCase(getNationalDaysOff.rejected, (state, { error }) => {
      state.error = error.message || STRINGS.GENERIC_ERROR_MESSAGE;
      state.status = ReduxThunkStatuses.REJECTED;
    });
  },
});

export const nationalDaysOffActions = nationalDaysOffData.actions;
export const nationalDaysOffReducer = nationalDaysOffData.reducer;

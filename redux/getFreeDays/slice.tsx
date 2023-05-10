import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ReduxThunkStatuses } from "@/utils/reduxThunkStatuses";
import { STRINGS } from "@/utils/strings";
import dayjs from "dayjs";
import { TEvent } from "@/utils/interface";
import getDaysOffService from "@/services/getDaysOff";

const initialState = {
  status: "idle",
  error: "",
  event: [] as TEvent[],
};

export const getDaysOff = createAsyncThunk("getdaysOffData", async () => {
  try {
    const result = await getDaysOffService();
    const events: TEvent[] = [];
    result.map((item) => {
      events.push({
        eventName: item.eventName,
        startDate: dayjs(item.startDate),
        endDate: dayjs(item.endDate),
        eventBgColor: item.eventBgColor,
        eventTextColor: item.eventTextColor,
      });
    });

    return events;
  } catch (e) {
    throw new Error(e as string);
  }
});

const daysOffData = createSlice({
  name: "daysOffData",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getDaysOff.pending, (state) => {
      state.status = ReduxThunkStatuses.PENDING;
    });
    builder.addCase(getDaysOff.fulfilled, (state, action) => {
      state.event = action?.payload;
    });
    builder.addCase(getDaysOff.rejected, (state, { error }) => {
      state.error = error.message || STRINGS.GENERIC_ERROR_MESSAGE;
      state.status = ReduxThunkStatuses.REJECTED;
    });
  },
});

export const daysOffActions = daysOffData.actions;
export const daysOffReducer = daysOffData.reducer;

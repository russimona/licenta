import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ReduxThunkStatuses } from "@/utils/reduxThunkStatuses";
import { STRINGS } from "@/utils/strings";
import dayjs from "dayjs";
import { TEvent, TEventNotification } from "@/utils/interface";
import getDaysOffService from "@/services/getDaysOff";
import { FREE_DAYS_STATUS } from "@/utils/freeDaysStatus";
import { Colors } from "@/utils/colors";
import getDaysOffNotificationService from "@/services/getDaysOffNotification";

const initialState = {
  status: "idle",
  error: "",
  event: [] as TEventNotification[],
};

export const getDaysOffNotification = createAsyncThunk(
  "getdaysOffData",
  async () => {
    try {
      const result = await getDaysOffNotificationService();
      const events: TEventNotification[] = [];
      result.map((item) => {
        events.push({
          eventName: item.eventName,
          startDate: dayjs(item.startDate),
          endDate: dayjs(item.endDate),
          eventBgColor:
            item.status === FREE_DAYS_STATUS.APPROVED
              ? item.eventTextColor
              : item.status === FREE_DAYS_STATUS.PENDING
              ? Colors.gray
              : Colors.white,
          eventTextColor: item.eventTextColor,
          status: item.status,
          uid: item.uid,
          id: item.id,
        });
      });
      console.log(result[0].status === FREE_DAYS_STATUS.PENDING);

      return events;
    } catch (e) {
      throw new Error(e as string);
    }
  }
);

const daysOffNotificationData = createSlice({
  name: "daysOffData",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getDaysOffNotification.pending, (state) => {
      state.status = ReduxThunkStatuses.PENDING;
    });
    builder.addCase(getDaysOffNotification.fulfilled, (state, action) => {
      state.event = action?.payload;
    });
    builder.addCase(getDaysOffNotification.rejected, (state, { error }) => {
      state.error = error.message || STRINGS.GENERIC_ERROR_MESSAGE;
      state.status = ReduxThunkStatuses.REJECTED;
    });
  },
});

export const daysOffNotificationDataActions = daysOffNotificationData.actions;
export const daysOffNotificationDataReducer = daysOffNotificationData.reducer;

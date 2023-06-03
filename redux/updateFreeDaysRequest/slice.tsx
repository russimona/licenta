import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ReduxThunkStatuses } from "@/utils/reduxThunkStatuses";
import { STRINGS } from "@/utils/strings";
import { TEvent, TEventNotification } from "@/utils/interface";
import { updateFreeDayRequestService } from "@/services/updateFreeDay";

const initialState = {
  status: "idle",
  error: "",
};

export const updateFreeDaysRequest = createAsyncThunk(
  "updateFreeDaysRequest ",
  async (props: {
    request: TEventNotification;
    response: string;
    email: string;
  }) => {
    try {
      updateFreeDayRequestService(props);
    } catch (e) {
      throw new Error(e as string);
    }
  }
);

const updateFreeDaysRequestData = createSlice({
  name: "updateFreeDaysRequest Data",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(updateFreeDaysRequest.pending, (state) => {
      state.status = ReduxThunkStatuses.PENDING;
    });
    builder.addCase(updateFreeDaysRequest.fulfilled, (state) => {
      state.status = ReduxThunkStatuses.FULFILLED;
    });
    builder.addCase(updateFreeDaysRequest.rejected, (state, { error }) => {
      state.error = error.message || STRINGS.GENERIC_ERROR_MESSAGE;
      state.status = ReduxThunkStatuses.REJECTED;
    });
  },
});

export const updateFreeDaysRequestActions = updateFreeDaysRequestData.actions;
export const updateFreeDaysRequestReducer = updateFreeDaysRequestData.reducer;

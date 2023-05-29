import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ReduxThunkStatuses } from "@/utils/reduxThunkStatuses";
import { STRINGS } from "@/utils/strings";
import { INewTicket, ITaskStatus } from "@/utils/interface";
import { setTicketsStatusService } from "@/services/setTicketsStatusService";

const initialState = {
  status: "idle",
  error: "",
};

export const setTicketsStatus = createAsyncThunk(
  "setTicketsStatus",
  async (props: { projectId: string; tasks: ITaskStatus[] }) => {
    try {
      setTicketsStatusService({
        projectId: props.projectId,
        tasks: props.tasks,
      });
    } catch (e) {
      throw new Error(e as string);
    }
  }
);

const setTicketsStatusData = createSlice({
  name: "setTicketsStatusData",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(setTicketsStatus.pending, (state) => {
      state.status = ReduxThunkStatuses.PENDING;
    });
    builder.addCase(setTicketsStatus.fulfilled, (state) => {
      state.status = ReduxThunkStatuses.FULFILLED;
    });
    builder.addCase(setTicketsStatus.rejected, (state, { error }) => {
      state.error = error.message || STRINGS.GENERIC_ERROR_MESSAGE;
      state.status = ReduxThunkStatuses.REJECTED;
    });
  },
});

export const setTicketsStatusActions = setTicketsStatusData.actions;
export const setTicketsStatusReducer = setTicketsStatusData.reducer;

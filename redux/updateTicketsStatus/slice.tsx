import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ReduxThunkStatuses } from "@/utils/reduxThunkStatuses";
import { STRINGS } from "@/utils/strings";
import { INewTicket } from "@/utils/interface";

const initialState = {
  status: "idle",
  error: "",
};

export const updateTicketStatus = createAsyncThunk(
  "updateTicketStatus",
  async (props: { projectId: string; task: INewTicket }) => {
    try {
      updateTicketStatus({ projectId: props.projectId, task: props.task });
    } catch (e) {
      throw new Error(e as string);
    }
  }
);

const updateTicketStatusData = createSlice({
  name: "updateTicketStatusData",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(updateTicketStatus.pending, (state) => {
      state.status = ReduxThunkStatuses.PENDING;
    });
    builder.addCase(updateTicketStatus.fulfilled, (state) => {
      state.status = ReduxThunkStatuses.FULFILLED;
    });
    builder.addCase(updateTicketStatus.rejected, (state, { error }) => {
      state.error = error.message || STRINGS.GENERIC_ERROR_MESSAGE;
      state.status = ReduxThunkStatuses.REJECTED;
    });
  },
});

export const updateTicketStatusActions = updateTicketStatusData.actions;
export const updateTicketStatusReducer = updateTicketStatusData.reducer;

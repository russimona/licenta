import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ReduxThunkStatuses } from "@/utils/reduxThunkStatuses";
import { STRINGS } from "@/utils/strings";
import { ITaskStatus } from "@/utils/interface";
import { moveTicketService } from "@/services/moveTicketService";

const initialState = {
  status: "idle",
  error: "",
};

export const moveTickets = createAsyncThunk(
  "moveTickets",
  async (props: { projectId: string; task: ITaskStatus[] }) => {
    try {
      moveTicketService({ projectId: props.projectId, task: props.task });
    } catch (e) {
      throw new Error(e as string);
    }
  }
);

const moveTicketsData = createSlice({
  name: "moveTicketsData",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(moveTickets.pending, (state) => {
      state.status = ReduxThunkStatuses.PENDING;
    });
    builder.addCase(moveTickets.fulfilled, (state) => {
      state.status = ReduxThunkStatuses.FULFILLED;
    });
    builder.addCase(moveTickets.rejected, (state, { error }) => {
      state.error = error.message || STRINGS.GENERIC_ERROR_MESSAGE;
      state.status = ReduxThunkStatuses.REJECTED;
    });
  },
});

export const moveTicketsActions = moveTicketsData.actions;
export const moveTicketsReducer = moveTicketsData.reducer;

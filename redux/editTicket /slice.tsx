import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ReduxThunkStatuses } from "@/utils/reduxThunkStatuses";
import { STRINGS } from "@/utils/strings";
import { INewTicket, ITaskStatus } from "@/utils/interface";
import { editTicketService } from "@/services/editTicketService";

const initialState = {
  status: "idle",
  error: "",
};

export const editTicketStatus = createAsyncThunk(
  "editTicketStatus",
  async (props: { projectId: string; task: ITaskStatus[] }) => {
    try {
      editTicketService({ projectId: props.projectId, task: props.task });
    } catch (e) {
      throw new Error(e as string);
    }
  }
);

const editTicketStatusData = createSlice({
  name: "editTicketStatusData",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(editTicketStatus.pending, (state) => {
      state.status = ReduxThunkStatuses.PENDING;
    });
    builder.addCase(editTicketStatus.fulfilled, (state) => {
      state.status = ReduxThunkStatuses.FULFILLED;
    });
    builder.addCase(editTicketStatus.rejected, (state, { error }) => {
      state.error = error.message || STRINGS.GENERIC_ERROR_MESSAGE;
      state.status = ReduxThunkStatuses.REJECTED;
    });
  },
});

export const editTicketStatusActions = editTicketStatusData.actions;
export const editTicketStatusReducer = editTicketStatusData.reducer;

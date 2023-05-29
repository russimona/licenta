import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ReduxThunkStatuses } from "@/utils/reduxThunkStatuses";
import { STRINGS } from "@/utils/strings";
import { INewTicket, IProject, ITicketItem } from "@/utils/interface";
import { addNewTicketService } from "@/services/addTicket";

const initialState = {
  status: "idle",
  error: "",
};

export const addNewTicket = createAsyncThunk(
  "addNewTicket ",
  async (props: { projectId: string; task: INewTicket }) => {
    try {
      addNewTicketService({ projectId: props.projectId, task: props.task });
    } catch (e) {
      throw new Error(e as string);
    }
  }
);

const addNewTicketData = createSlice({
  name: "addNewTicket Data",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addNewTicket.pending, (state) => {
      state.status = ReduxThunkStatuses.PENDING;
    });
    builder.addCase(addNewTicket.fulfilled, (state) => {
      state.status = ReduxThunkStatuses.FULFILLED;
    });
    builder.addCase(addNewTicket.rejected, (state, { error }) => {
      state.error = error.message || STRINGS.GENERIC_ERROR_MESSAGE;
      state.status = ReduxThunkStatuses.REJECTED;
    });
  },
});

export const addNewTicketActions = addNewTicketData.actions;
export const addNewTicketReducer = addNewTicketData.reducer;

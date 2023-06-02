import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ReduxThunkStatuses } from "@/utils/reduxThunkStatuses";
import { STRINGS } from "@/utils/strings";
import { IProject, ITicketItem } from "@/utils/interface";
import { addNewMemberProjectService } from "@/services/addNewMemberProjet";

const initialState = {
  status: "idle",
  error: "",
};

export const addNewMemberProject = createAsyncThunk(
  "addNewMemberProject",
  async (props: { projectId: string; newMembers: string[] }) => {
    try {
      addNewMemberProjectService({
        projectId: props.projectId,
        newMembers: props.newMembers,
      });
    } catch (e) {
      throw new Error(e as string);
    }
  }
);

const addNewMemberProjectData = createSlice({
  name: "addNewMemberProject Data",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addNewMemberProject.pending, (state) => {
      state.status = ReduxThunkStatuses.PENDING;
    });
    builder.addCase(addNewMemberProject.fulfilled, (state) => {
      state.status = ReduxThunkStatuses.FULFILLED;
    });
    builder.addCase(addNewMemberProject.rejected, (state, { error }) => {
      state.error = error.message || STRINGS.GENERIC_ERROR_MESSAGE;
      state.status = ReduxThunkStatuses.REJECTED;
    });
  },
});

export const addNewMemberProjectActions = addNewMemberProjectData.actions;
export const addNewMemberProjectReducer = addNewMemberProjectData.reducer;

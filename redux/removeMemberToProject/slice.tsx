import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ReduxThunkStatuses } from "@/utils/reduxThunkStatuses";
import { STRINGS } from "@/utils/strings";
import { IProject, ITicketItem } from "@/utils/interface";
import { removeMemberProjectService } from "@/services/removeMemberProjet";

const initialState = {
  status: "idle",
  error: "",
};

export const removeMemberProject = createAsyncThunk(
  "removeMemberProject",
  async (props: { projectId: string; members: string[] }) => {
    try {
      removeMemberProjectService({
        projectId: props.projectId,
        members: props.members,
      });
    } catch (e) {
      throw new Error(e as string);
    }
  }
);

const removeMemberProjectData = createSlice({
  name: "removeMemberProject Data",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(removeMemberProject.pending, (state) => {
      state.status = ReduxThunkStatuses.PENDING;
    });
    builder.addCase(removeMemberProject.fulfilled, (state) => {
      state.status = ReduxThunkStatuses.FULFILLED;
    });
    builder.addCase(removeMemberProject.rejected, (state, { error }) => {
      state.error = error.message || STRINGS.GENERIC_ERROR_MESSAGE;
      state.status = ReduxThunkStatuses.REJECTED;
    });
  },
});

export const removeMemberProjectActions = removeMemberProjectData.actions;
export const removeMemberProjectReducer = removeMemberProjectData.reducer;

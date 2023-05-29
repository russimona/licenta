import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ReduxThunkStatuses } from "@/utils/reduxThunkStatuses";
import { STRINGS } from "@/utils/strings";
import { IProject } from "@/utils/interface";
import getSelectedProjectService from "@/services/getSelectedProjectService";

const initialState = {
  status: "idle",
  error: "",
  project: {} as IProject,
};

export const getSelectedProject = createAsyncThunk(
  "getSelectedProject",
  async (props: { projectId: string }) => {
    try {
      const result = await getSelectedProjectService({
        projectId: props.projectId,
      });

      return result;
    } catch (e) {
      console.log(e);

      throw new Error(e as string);
    }
  }
);

const selectedProjectData = createSlice({
  name: "allData",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getSelectedProject.pending, (state) => {
      state.status = ReduxThunkStatuses.PENDING;
    });
    builder.addCase(getSelectedProject.fulfilled, (state, action) => {
      state.status = ReduxThunkStatuses.FULFILLED;
      state.project = action.payload ?? ({} as IProject);
    });
    builder.addCase(getSelectedProject.rejected, (state, { error }) => {
      state.error = error.message || STRINGS.GENERIC_ERROR_MESSAGE;
      state.status = ReduxThunkStatuses.REJECTED;
    });
  },
});

export const selectedProjectDataActions = selectedProjectData.actions;
export const selectedProjectDataReducer = selectedProjectData.reducer;

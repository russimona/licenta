import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ReduxThunkStatuses } from "@/utils/reduxThunkStatuses";
import { STRINGS } from "@/utils/strings";
import { INewProject } from "@/utils/interface";
import { addNewProject as addNewProjectService } from "@/services/addNewProject";

const initialState = {
  status: "idle",
  error: "",
};

export const addNewProject = createAsyncThunk(
  "addNewProject",
  async (props: INewProject) => {
    try {
      addNewProjectService(props);
    } catch (e) {
      throw new Error(e as string);
    }
  }
);

const addNewProjectData = createSlice({
  name: "addNewProjectData",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addNewProject.pending, (state) => {
      state.status = ReduxThunkStatuses.PENDING;
    });
    builder.addCase(addNewProject.fulfilled, (state) => {
      state.status = ReduxThunkStatuses.FULFILLED;
    });
    builder.addCase(addNewProject.rejected, (state, { error }) => {
      state.error = error.message || STRINGS.GENERIC_ERROR_MESSAGE;
      state.status = ReduxThunkStatuses.REJECTED;
    });
  },
});

export const addNewProjectActions = addNewProjectData.actions;
export const addNewProjectReducer = addNewProjectData.reducer;

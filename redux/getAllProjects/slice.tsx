import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ReduxThunkStatuses } from "@/utils/reduxThunkStatuses";
import { STRINGS } from "@/utils/strings";
import getAllProjects from "@/services/getAllProjects";
import { IProject } from "@/utils/interface";

const initialState = {
  status: "idle",
  error: "",
  project: [] as IProject[],
};

export const getAllProjectData = createAsyncThunk(
  "getAllProjectData",
  async () => {
    try {
      const result = getAllProjects();
      return result;
    } catch (e) {
      throw new Error(e as string);
    }
  }
);

const allProjectData = createSlice({
  name: "allData",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllProjectData.pending, (state) => {
      state.status = ReduxThunkStatuses.PENDING;
    });
    builder.addCase(getAllProjectData.fulfilled, (state, action) => {
      state.status = ReduxThunkStatuses.FULFILLED;
      state.project = action.payload;
    });
    builder.addCase(getAllProjectData.rejected, (state, { error }) => {
      state.error = error.message || STRINGS.GENERIC_ERROR_MESSAGE;
      state.status = ReduxThunkStatuses.REJECTED;
    });
  },
});

export const allProjectDataActions = allProjectData.actions;
export const allProjectDataReducer = allProjectData.reducer;

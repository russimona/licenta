import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ReduxThunkStatuses } from "@/utils/reduxThunkStatuses";
import { STRINGS } from "@/utils/strings";
import { INewCompany } from "@/utils/interface";
import { addNewCompany as addNewCompanyService } from "@/services/addNewCompany";

const initialState = {
  status: "idle",
  error: "",
};

export const addNewCompany = createAsyncThunk(
  "addNewCompany",
  async (props: INewCompany) => {
    try {
      addNewCompanyService(props);
    } catch (e) {
      throw new Error(e as string);
    }
  }
);

const addNewCompanyData = createSlice({
  name: "addNewCompanyData",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addNewCompany.pending, (state) => {
      state.status = ReduxThunkStatuses.PENDING;
    });
    builder.addCase(addNewCompany.fulfilled, (state) => {
      state.status = ReduxThunkStatuses.FULFILLED;
    });
    builder.addCase(addNewCompany.rejected, (state, { error }) => {
      state.error = error.message || STRINGS.GENERIC_ERROR_MESSAGE;
      state.status = ReduxThunkStatuses.REJECTED;
    });
  },
});

export const addNewCompanyActions = addNewCompanyData.actions;
export const addNewCompanyReducer = addNewCompanyData.reducer;

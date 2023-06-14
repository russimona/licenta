import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ReduxThunkStatuses } from "@/utils/reduxThunkStatuses";
import { STRINGS } from "@/utils/strings";
import getCompanyService from "@/services/getCompanyService";

const initialState = {
  status: "idle",
  error: "",
  company: {
    name: "",
    address: "",
    email: "",
  },
};

export const getCompanyData = createAsyncThunk(
  "getLoggedcompanyData",
  async (id: string) => {
    try {
      const result = getCompanyService(id);
      return result;
    } catch (e) {
      throw new Error(e as string);
    }
  }
);

const companyData = createSlice({
  name: "loggedcompanyData",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCompanyData.pending, (state) => {
      state.status = ReduxThunkStatuses.PENDING;
    });
    builder.addCase(getCompanyData.fulfilled, (state, action) => {
      state.status = ReduxThunkStatuses.FULFILLED;
      state.company.address = action.payload.address;
      state.company.email = action.payload.email;
      state.company.name = action.payload.name;
    });
    builder.addCase(getCompanyData.rejected, (state, { error }) => {
      state.error = error.message || STRINGS.GENERIC_ERROR_MESSAGE;
      state.status = ReduxThunkStatuses.REJECTED;
    });
  },
});

export const companyDataActions = companyData.actions;
export const companyDataReducer = companyData.reducer;

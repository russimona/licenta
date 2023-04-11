import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {insertTest} from "@/services/testInsert";
import { ITestData } from "@/utils/interface";

const initialState = {
  status: "idle",
  error: "",
};

export const getTest = createAsyncThunk(
  "test",
  async (props: ITestData) => {
    try {
      const result = await insertTest(props);
      return result;
    } catch (e) {
      console.log(e);
      throw new Error(e as string);
    }
  }
);

const testData = createSlice({
  name: "testData",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getTest.pending, (state) => {
      state.status = "PENDING";
    });
    builder.addCase(getTest.fulfilled, (state) => {
      state.status = "FULFILLED";
    });
    builder.addCase(getTest.rejected, (state, { error }) => {
      state.error = error.message || "ERROR";
      state.status = "REJECTED";
    });
  },
});

export const testDataActions = testData.actions;
export const testDataReducer = testData.reducer;
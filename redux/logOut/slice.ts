import { auth } from "@/core/firebaseApp";
import { ReduxThunkStatuses } from "@/utils/reduxThunkStatuses";
import { STRINGS } from "@/utils/strings";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { signOut } from "firebase/auth";

const requestState = {
  status: "idle",
  error: "",
};

export const logOut = createAsyncThunk("logOut", async () => {
  sessionStorage.removeItem("authToken");
  const result = await signOut(auth);
  return result;
});

const logOutSlice = createSlice({
  name: "logOut",
  initialState: requestState,
  reducers: {
    reset: (state) => {
      state.status = "idle";
      state.error = "";
    },
    setStatus: (state, action: PayloadAction<string>) => {
      state.status = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(logOut.pending, (state) => {
      state.status = ReduxThunkStatuses.PENDING;
    });
    builder.addCase(logOut.fulfilled, (state) => {
      state.status = ReduxThunkStatuses.FULFILLED;
    });
    builder.addCase(logOut.rejected, (state, { error }) => {
      state.error = error.message || STRINGS.GENERIG_ERROR_MESSAGE;
      state.status = ReduxThunkStatuses.REJECTED;
    });
  },
});

export const logOutActions = logOutSlice.actions;
export const logOutReducer = logOutSlice.reducer;

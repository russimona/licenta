import { ReduxThunkStatuses } from "@/utils/reduxThunkStatuses";
import { STRINGS } from "@/utils/strings";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getAuth } from "firebase/auth";

const requestState = {
  status: "idle",
  error: "",
};

export const deleteAccount = createAsyncThunk("deleteAccount", async () => {
  const auth = getAuth();
  const user = auth.currentUser;
  user
    ?.delete()
    .then((result) => {
      return result;
    })
    .catch((error) => {
      return error;
    });
});

const deleteAccountSlice = createSlice({
  name: "deleteAccount",
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
    builder.addCase(deleteAccount.pending, (state) => {
      state.status = ReduxThunkStatuses.PENDING;
    });
    builder.addCase(deleteAccount.fulfilled, (state) => {
      state.status = ReduxThunkStatuses.FULFILLED;
    });
    builder.addCase(deleteAccount.rejected, (state, { error }) => {
      state.error = error.message || STRINGS.GENERIG_ERROR_MESSAGE;
      state.status = ReduxThunkStatuses.REJECTED;
    });
  },
});

export const deleteAccountActions = deleteAccountSlice.actions;
export const deleteAccountReducer = deleteAccountSlice.reducer;

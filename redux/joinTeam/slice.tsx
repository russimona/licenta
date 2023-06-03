import { auth } from "@/core/firebaseApp";
import { IJoinTeam, joinTeamSignUpService } from "@/services/joinTeamSignUp";
import { sendUserData } from "@/services/sendUserData";
import { ISignUpData } from "@/utils/interface";
import { ReduxThunkStatuses } from "@/utils/reduxThunkStatuses";
import { STRINGS } from "@/utils/strings";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createUserWithEmailAndPassword, signOut } from "firebase/auth";

const initialState = {
  status: "idle",
  error: "",
  uid: "",
};

export const joinTeam = createAsyncThunk(
  "joinTeam",
  async (data: IJoinTeam) => {
    try {
      return await joinTeamSignUpService(data);
    } catch (error) {
      return error;
    }
  }
);

export const joinTeamSlice = createSlice({
  name: "joinTeam",
  initialState: initialState,
  reducers: {
    reset: (state) => {
      state.status = "idle";
      state.error = "";
    },
    setStatus: (state, action: PayloadAction<string>) => {
      state.status = action.payload;
    },
    setjoinTeamError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(joinTeam.pending, (state) => {
      state.status = ReduxThunkStatuses.PENDING;
    });
    builder.addCase(joinTeam.fulfilled, (state, action) => {
      state.status = ReduxThunkStatuses.FULFILLED;
    });
    builder.addCase(joinTeam.rejected, (state, { error }) => {
      state.error = error.message || STRINGS.GENERIG_ERROR_MESSAGE;
      state.status = ReduxThunkStatuses.REJECTED;
    });
  },
});

export const joinTeamActions = joinTeamSlice.actions;
export const joinTeamReducer = joinTeamSlice.reducer;

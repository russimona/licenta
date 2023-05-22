import { auth } from "@/core/firebaseApp";
import { ReduxThunkStatuses } from "@/utils/reduxThunkStatuses";
import { STRINGS } from "@/utils/strings";
import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAuth,
  signInAnonymously,
  signInWithEmailAndPassword,
} from "firebase/auth";

const initialState = {
  status: "idle",
  error: "",
  uid: "",
  email: "",
};

export type UserCredentials = {
  email: string;
  password: string;
  uid?: string;
};

export const logIn = createAsyncThunk(
  "logIn",
  async (userData: UserCredentials) => {
    const authObject = auth;
    const { email, password } = userData;
    const result = await signInWithEmailAndPassword(
      authObject,
      email,
      password
    );
    window.sessionStorage.setItem("authToken", result.user.uid);
    window.sessionStorage.setItem("email", email);
    return result;
  }
);

export const onboardingSlice = createSlice({
  name: "logIn",
  initialState: initialState,
  reducers: {
    reset: (state) => {
      state.status = "idle";
      state.error = "";
      state.uid = "";
      state.email = "";
    },
    setStatus: (state, action: PayloadAction<string>) => {
      state.status = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    setUid: (state, action: PayloadAction<string>) => {
      state.uid = action.payload;
    },
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(logIn.pending, (state) => {
      state.status = ReduxThunkStatuses.PENDING;
    });
    builder.addCase(logIn.fulfilled, (state, action) => {
      state.uid = action.payload.user.uid ?? "";
      state.email = action.payload.user.email ?? "";
      state.status = action.payload
        ? ReduxThunkStatuses.FULFILLED
        : ReduxThunkStatuses.REJECTED;
    });
    builder.addCase(logIn.rejected, (state, { error }) => {
      state.error = error.message || STRINGS.GENERIC_ERROR_MESSAGE;
      state.status = ReduxThunkStatuses.REJECTED;
    });
  },
});

export const logInAnonymously = createAsyncThunk(
  "logInAnonymusly",
  async () => {
    const auth = getAuth();
    return signInAnonymously(auth);
  }
);

export const loginAnonymuslySlice = createSlice({
  name: "logInAnonymusly",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(logIn.pending, (state) => {
      state.status = ReduxThunkStatuses.PENDING;
    });
    builder.addCase(logIn.fulfilled, (state, action) => {
      state.status = ReduxThunkStatuses.FULFILLED;
    });
    builder.addCase(logIn.rejected, (state, { error }) => {
      state.error = error.message || STRINGS.GENERIC_ERROR_MESSAGE;
      state.status = ReduxThunkStatuses.REJECTED;
    });
  },
});

export const logInActions = onboardingSlice.actions;
export const loginReducer = onboardingSlice.reducer;

export const logInAnonymuslyActions = loginAnonymuslySlice.actions;
export const loginAnonymuslyReducer = loginAnonymuslySlice.reducer;

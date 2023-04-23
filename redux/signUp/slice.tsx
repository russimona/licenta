import { auth } from "@/core/firebaseApp";
import getUserData from "@/services/getLoggedUserInfo";
import { ReduxThunkStatuses } from "@/utils/reduxThunkStatuses";
import { STRINGS } from "@/utils/strings";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getAuth, signOut } from "firebase/auth";

const requestState = {
  status: "idle",
  error: "",
};

const initialStateUser = {
  status: "idle",
  error: "",
  user: {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    uid: "",
    userNumberOfPredictions: 0,
  },
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

export const logOut = createAsyncThunk("logOut", async () => {
  sessionStorage.removeItem("authToken");
  const result = await signOut(auth);
  return result;
});

export const getLoggedUser = createAsyncThunk("getUserData", async () => {
  const uidLoggedUser =
    auth.currentUser?.uid ?? sessionStorage.getItem("authToken") ?? "";
  return await getUserData(uidLoggedUser);
});

// export const updateUser = createAsyncThunk(
//   "updateUserData",
//   async (fetchData: { uid: string; data: UserData }) => {
//     const { uid, data } = fetchData;
//     try {
//       return updateUserData(uid, data);
//     } catch (error) {
//       return error;
//     }
//   }
// );

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

export const getLoggedUserSlice = createSlice({
  name: "getLoggedUser",
  initialState: initialStateUser,
  reducers: {
    reset: (state) => {
      state.status = "idle";
      state.error = "";
      state.user = {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        uid: "",
        userNumberOfPredictions: 0,
      };
    },
    setStatus: (state, action: PayloadAction<string>) => {
      state.status = action.payload;
    },
    setGetLoggedUserError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getLoggedUser.pending, (state) => {
      state.status = ReduxThunkStatuses.PENDING;
    });
    builder.addCase(getLoggedUser.fulfilled, (state, action) => {
      state.status = ReduxThunkStatuses.FULFILLED;
      state.user.email = action.payload.email;
      state.user.firstName = action.payload.firstName;
      state.user.lastName = action.payload.lastName;
      state.user.password = action.payload.password;
      state.user.uid = sessionStorage.getItem("authToken") ?? "";
      state.user.userNumberOfPredictions =
        action.payload.userNumberOfPredictions ?? 0;
    });
    builder.addCase(getLoggedUser.rejected, (state, { error }) => {
      state.error = error.message || STRINGS.GENERIG_ERROR_MESSAGE;
      state.status = ReduxThunkStatuses.REJECTED;
    });
  },
});

// export const editUserSlice = createSlice({
//   name: "updateUserData",
//   initialState: initialStateUser,
//   reducers: {
//     setFirstName: (state, action: PayloadAction<string>) => {
//       state.user.firstName = action.payload;
//     },
//     setLastName: (state, action: PayloadAction<string>) => {
//       state.user.lastName = action.payload;
//     },
//     setEmail: (state, action: PayloadAction<string>) => {
//       state.user.email = action.payload;
//     },
//     discardError: (state) => {
//       state.error = "";
//     },
//     discardStatus: (state) => {
//       state.status = "";
//     },
//     setUserData: (state, action) => {
//       state.user.firstName = action.payload.firstName;
//       state.user.lastName = action.payload.lastName;
//       state.user.email = action.payload.email;
//     },
//   },
//   extraReducers: (builder) => {
//     builder.addCase(getLoggedUser.pending, (state) => {
//       state.status = ReduxThunkStatuses.PENDING;
//     });
//     builder.addCase(getLoggedUser.fulfilled, (state, action) => {
//       state.status = ReduxThunkStatuses.FULFILLED;
//       state.user.firstName = action.payload.firstName;
//       state.user.lastName = action.payload.lastName;
//       state.user.email = action.payload.email;
//     });
//     builder.addCase(getLoggedUser.rejected, (state, { error }) => {
//       state.error = error.message || STRINGS.GENERIG_ERROR_MESSAGE;
//       state.status = ReduxThunkStatuses.REJECTED;
//     });
//     builder.addCase(updateUser.pending, (state) => {
//       state.status = ReduxThunkStatuses.PENDING;
//     });
//     builder.addCase(updateUser.fulfilled, (state) => {
//       state.status = ReduxThunkStatuses.FULFILLED;
//     });
//     builder.addCase(updateUser.rejected, (state, { error }) => {
//       state.error = error.message || STRINGS.GENERIG_ERROR_MESSAGE;
//       state.status = ReduxThunkStatuses.REJECTED;
//     });
//   },
// });

export const logOutActions = logOutSlice.actions;
export const logOutReducer = logOutSlice.reducer;
export const deleteAccountActions = deleteAccountSlice.actions;
export const deleteAccountReducer = deleteAccountSlice.reducer;
export const getLoggedUserActions = getLoggedUserSlice.actions;
export const getLoggedUserReducer = getLoggedUserSlice.reducer;
// export const editUserActions = editUserSlice.actions;
// export const editUserReducer = editUserSlice.reducer;

interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
  uid?: string;
}

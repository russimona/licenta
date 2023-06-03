import { auth } from "@/core/firebaseApp";
import { sendUserData } from "@/services/sendUserData";
import { ISignUpData } from "@/utils/interface";
import { ReduxThunkStatuses } from "@/utils/reduxThunkStatuses";
import { STRINGS } from "@/utils/strings";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createUserWithEmailAndPassword } from "firebase/auth";

const initialState = {
  status: "idle",
  error: "",
  uid: "",
};

export const createUserAuth = async (userData: ISignUpData) => {
  const { email, password, firstName, lastName } = userData;

  return createUserWithEmailAndPassword(auth, email, password).then(
    (userCredential) => {
      const user = userCredential.user;
      try {
        return sendUserData(user.uid, {
          firstName: firstName ?? "",
          lastName: lastName ?? "",
          email,
          password,
        });
      } catch (error) {
        return error;
      }
    }
  );
};

export const signUp = createAsyncThunk("signUp", async (data: ISignUpData) => {
  try {
    return await createUserAuth(data);
  } catch (error) {
    return error;
  }
});

export const signUpSlice = createSlice({
  name: "signUp",
  initialState: initialState,
  reducers: {
    reset: (state) => {
      state.status = "idle";
      state.error = "";
    },
    setStatus: (state, action: PayloadAction<string>) => {
      state.status = action.payload;
    },
    setSignUpError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signUp.pending, (state) => {
      state.status = ReduxThunkStatuses.PENDING;
    });
    builder.addCase(signUp.fulfilled, (state, action) => {
      state.status = ReduxThunkStatuses.FULFILLED;
    });
    builder.addCase(signUp.rejected, (state, { error }) => {
      state.error = error.message || STRINGS.GENERIG_ERROR_MESSAGE;
      state.status = ReduxThunkStatuses.REJECTED;
    });
  },
});

export const signUpActions = signUpSlice.actions;
export const signUpReducer = signUpSlice.reducer;

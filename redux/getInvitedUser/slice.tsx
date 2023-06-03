import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ReduxThunkStatuses } from "@/utils/reduxThunkStatuses";
import { STRINGS } from "@/utils/strings";
import getInvitedUserDataService from "@/services/getInvitedUserData";

const initialState = {
  status: "idle",
  error: "",
  user: {
    uid: "",
    email: "",
    firstName: "",
    lastName: "",
    companyId: "",
    role: "",
    numberOfFreeDays: 0,
  },
};

export const getInvitedUserData = createAsyncThunk(
  "getInvitedUserData",
  async (props: { uid: string }) => {
    try {
      console.log(props.uid);

      const result = getInvitedUserDataService(props.uid);

      return result;
    } catch (e) {
      throw new Error(e as string);
    }
  }
);

const InvitedUserData = createSlice({
  name: "InvitedUserData",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getInvitedUserData.pending, (state) => {
      state.status = ReduxThunkStatuses.PENDING;
    });
    builder.addCase(getInvitedUserData.fulfilled, (state, action) => {
      state.status = ReduxThunkStatuses.FULFILLED;
      state.user.email = action.payload?.email ?? "";
      state.user.firstName = action.payload?.firstName ?? "";
      state.user.lastName = action.payload?.lastName ?? "";
      state.user.uid = sessionStorage.getItem("authToken") ?? "";
      state.user.companyId = action.payload.companyId;
      state.user.role = action.payload.role;
      state.user.numberOfFreeDays = action.payload.numberOfFreeDays;
    });
    builder.addCase(getInvitedUserData.rejected, (state, { error }) => {
      state.error = error.message || STRINGS.GENERIC_ERROR_MESSAGE;
      state.status = ReduxThunkStatuses.REJECTED;
    });
  },
});

export const InvitedUserDataActions = InvitedUserData.actions;
export const InvitedUserDataReducer = InvitedUserData.reducer;

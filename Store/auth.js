import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "adminAuth",
  initialState: {
    status: false, // for logged in or not
    userData: null,
  },
  reducers: {
    updateUserStatus(state) {
      state.status = !state.status;
    },
    updateUserData(state, action) {
      state.userData = action.payload;
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice;

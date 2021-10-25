import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "adminAuth",
  initialState: {
    status: null, // for logged in or not
    userData: null,
    token: null,
  },
  reducers: {
    updateUserStatus(state, action) {
      state.status = action.payload;
    },
    updateUserData(state, action) {
      state.userData = action.payload;
    },
    updateToken(state, action) {
      state.token = action.payload;
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice;

import { createSlice } from "@reduxjs/toolkit";

let user = JSON.parse(localStorage.getItem("user") as any);
const initialState = user ? { loggedIn: true, user } : {};

const authenticationSlice = createSlice({
  name: "authentication",
  initialState: initialState,
  reducers: {
    login(state, action) {
      state.loggedIn = true;
      state.user = action.payload.user;
    },
    logout(state) {
      state.user = null;
      state.loggedIn = false;
    },
  },
});

export default authenticationSlice;

export const authenticationActions = authenticationSlice.actions;

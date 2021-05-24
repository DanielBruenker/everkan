import { createSlice } from "@reduxjs/toolkit";
import { login, logout } from "./authenticationThunks";

let user = JSON.parse(localStorage.getItem("user") as any);
const initialState = user ? { loggedIn: true, user: user } : {loggedIn: false, user: null};

const authenticationSlice = createSlice({
  name: "authentication",
  initialState: initialState,
  reducers: {},
  extraReducers: {
    [login.fulfilled.type]: (state, action) => {
      state.user = action.payload.user;
      state.loggedIn = action.payload.loggedIn;
    },
    [logout.fulfilled.type]: (state, action) => {
      state.user = action.payload.user;
      state.loggedIn = action.payload.loggedIn;
    },
  },
});

export default authenticationSlice;

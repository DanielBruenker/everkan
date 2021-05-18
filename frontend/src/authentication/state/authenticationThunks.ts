import { createAsyncThunk } from "@reduxjs/toolkit";
import { authenticationService } from "../service/authenticationService";

export const login = createAsyncThunk(
  "authentication/login",
  async (args: { username: string; password: string }, thunkAPI) => {
    return await authenticationService.login(args.username, args.password);
  }
);

export const logout = createAsyncThunk("authentication/logout", () => {
  return authenticationService.logout();
});

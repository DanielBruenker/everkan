import { createAsyncThunk } from "@reduxjs/toolkit";
import { everkanApi } from '../../api';
import { history } from '../../utils/history';

export const login = createAsyncThunk(
  "authentication/login",
  async (args: { username: string; password: string }, {rejectWithValue}) => {
    try {
      const response = await everkanApi.authentication.login(args.username, args.password);
      localStorage.setItem("user", JSON.stringify(response.data));
      history.push("/");
      return { user: response.data, loggedIn: true };
    } catch(err){
      localStorage.removeItem("user");
      return rejectWithValue({ user: null, loggedIn: false });
    }
  }

);

export const logout = createAsyncThunk("authentication/logout", () => {
  localStorage.removeItem("user");
  history.push("/login");
  return { user: null, loggedIn: false };
});
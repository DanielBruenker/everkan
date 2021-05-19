import { login, logout } from "./state/authenticationThunks";
import authenticationSlice from "./state/authenticatonSlice";

export const authenticationActions = {
  ...authenticationSlice.actions,
  login,
  logout,
};

export const authenticationReducer = authenticationSlice.reducer;

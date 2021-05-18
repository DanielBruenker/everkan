import { login, logout } from "./authenticationThunks";
import authenticationSlice from "./authenticatonSlice";

export const authenticationActions = {
  ...authenticationSlice.actions,
  login,
  logout,
};

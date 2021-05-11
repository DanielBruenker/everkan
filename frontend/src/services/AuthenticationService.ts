import { AxiosResponse } from 'axios';
import { everkanApi } from "../apis/api";
import { AppDispatch } from '../store';
import { history } from "../utils/history";
import { authenticationActions } from "../store/slices/AuthenticationSlice";

export const authenticationService = {
  login,
  logout,
};

function logout(): void {
  return (dispatch: AppDispatch) => {
    // remove user from local storage to log user out
    localStorage.removeItem("user");
    history.push("/login");
    dispatch(authenticationActions.logout());
  };
}

function login(email: string, password: string): void {
  return async (dispatch: AppDispatch) => {
     await everkanApi.auth.login(email, password)
        .then((response: AxiosResponse) => {
          localStorage.setItem("user", JSON.stringify(response.data));
          dispatch(authenticationActions.login({ user: response.data }));
          history.push("/");
        }).catch((error: any) => {
          console.error(error);
          logout();
          location.reload(true);
        });
  };
}

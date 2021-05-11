import { everkanApi } from "../apis/api";
import { history } from "../utils/history";
import { authenticationActions } from "../store/slices/AuthenticationSlice";

export const authenticationService = {
  login,
  logout,
};

function logout() {
  return (dispatch) => {
    // remove user from local storage to log user out
    localStorage.removeItem("user");
    history.push("/login");
    dispatch(authenticationActions.logout());
  };
}

function login(email: string, password: string) {
  return async (dispatch) => {
     await everkanApi.auth.login(email, password)
        .then(response => {
          localStorage.setItem("user", JSON.stringify(response.data));
          dispatch(authenticationActions.login({ user: response.data }));
          history.push("/");
        }).catch(error => {
          console.error(error);
          logout();
          location.reload(true);
        });
  };
}

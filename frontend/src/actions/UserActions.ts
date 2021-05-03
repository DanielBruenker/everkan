import { userService } from "../services/";
import { history } from "../helpers";
import { userConstants } from "../constants";
import { alertActions } from "./AlertActions";

export const userActions = {
  login,
  logout,
};

function login(username: string, password: string) {
  return (dispatch: any) => {
    dispatch(request({ username }));

    userService.login(username, password).then(
      (user) => {
        dispatch(success(user));
        dispatch(alertActions.success("Successfully logged in"));
        history.push("/");
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };

  function request(user) {
    return { type: userConstants.LOGIN_REQUEST, user };
  }
  function success(user) {
    return { type: userConstants.LOGIN_SUCCESS, user };
  }
  function failure(error) {
    return { type: userConstants.LOGIN_FAILURE, error };
  }
}

function logout() {
  return (dispatch: any) => {
    userService.logout();
    dispatch(alertActions.success("Logged out"));
    history.push("/login");
    dispatch(success());

    function success() {
      return { type: userConstants.LOGOUT };
    }
  };
}

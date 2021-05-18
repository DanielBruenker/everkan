import { everkanApi } from "../../api";
import { history } from "../../utils/history";

export const authenticationService = {
  login,
  logout,
};

async function login(username: string, password: string) {
  const response = await everkanApi.authentication.login(username, password);
  if (response.status === 200) {
    localStorage.setItem("user", JSON.stringify(response.data));
    history.push("/");
    return { user: response.data, loggedIn: true };
  } else {
    console.error(response);
    localStorage.removeItem("user");
    return { user: null, loggedIn: false };
  }
}

async function logout() {
  localStorage.removeItem("user");
  history.push("/login");
  return { user: null, loggedIn: false };
}

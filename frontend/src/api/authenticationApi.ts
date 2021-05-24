import { authHeader } from "./auth-header";
import { api } from "./index";

export async function login(email: string, password: string) {
  const url = "/auth/signin";
  const config = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Accept: "application/json",
      ...authHeader(),
    },
  };
  const formData = new FormData();
  formData.append("username", email);
  formData.append("password", password);

  return await api.post(url, formData, config);
}

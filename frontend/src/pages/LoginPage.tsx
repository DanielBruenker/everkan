import { Grid, Typography } from "@material-ui/core";
import { useState } from "react";
import { useDispatch } from "react-redux";
import LoginForm from "../components/LoginForm";
import { authenticationService } from "../services/AuthenticationService";

const LoginPage = (props) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleOnChangeEmailInput = (event: any) => {
    setEmail(event.target.value);
  };

  const handleOnChangePasswordInput = (event: any) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (email && password) {
      dispatch(authenticationService.login(email, password));
    }
  };

  return (
    <Grid
      container
      direction="row"
      justify="center"
      alignItems="center"
      spacing={3}
      className="login-form-container"
    >
      <Grid className="login-form-wrapper">
        <Grid justify="center" alignItems="center">
          <Typography variant="h4" component="h2">
            Anmelden
          </Typography>
        </Grid>
        <LoginForm
          email={email}
          password={password}
          onChangeEmailInput={handleOnChangeEmailInput}
          onChangePasswordInput={handleOnChangePasswordInput}
          onSubmit={handleSubmit}
        />
      </Grid>
    </Grid>
  );
};

export default LoginPage;

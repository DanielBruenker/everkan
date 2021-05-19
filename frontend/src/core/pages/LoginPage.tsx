import { Grid, Typography } from "@material-ui/core";
import LoginForm from "../../authentication/components/LoginForm";

const LoginPage = () => {

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
        <LoginForm />
      </Grid>
    </Grid>
  );
};

export default LoginPage;

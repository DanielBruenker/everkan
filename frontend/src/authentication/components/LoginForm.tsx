import { Button, emphasize, makeStyles, TextField } from "@material-ui/core";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { authenticationActions } from "../index";

const useStyles = makeStyles({
  form: {
    width: "300px",
  },
  formGroup: {
    margin: "20px 0 0 0",
  },
  submitButton: {
    width: "100%",
    margin: "20px 0 0 0",
    background: "#00a82d",
    "&:hover, &:focus": {
      background: "#05611d",
    },
    "&:active": {
      background: "#05611d",
    },
  },
});

const LoginForm = () => {
  const classes = useStyles();

  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (email && password) {
      dispatch(
        authenticationActions.login({ username: email, password: password })
      );
    }
  };

  return (
    <form onSubmit={handleSubmit} className={classes.form}>
      <div className={classes.formGroup}>
        <TextField
          style={{ width: "100%" }}
          label="Email"
          id="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          type="email"
        />
      </div>
      <div className={classes.formGroup}>
        <TextField
          style={{ width: "100%" }}
          label="Password"
          id="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          type="password"
        />
      </div>
      <div>
        <Button
          className={classes.submitButton}
          type="submit"
          variant="contained"
          color="primary"
        >
          Anmelden
        </Button>
      </div>
    </form>
  );
};

export default LoginForm;

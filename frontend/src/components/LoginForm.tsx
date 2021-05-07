import { Button, emphasize, makeStyles, TextField } from '@material-ui/core';

const useStyles = makeStyles({
  form: {
    width: '300px'
  },
  formGroup: {
    margin: '20px 0 0 0'
  },
  submitButton: {
    width: '100%',
    margin: '20px 0 0 0',
    background:  '#00a82d',
    "&:hover, &:focus": {
      background: '#05611d'
    },
    "&:active": {
      background: '#05611d'
    }
  }
});

const LoginForm = (props) => {

  const classes = useStyles();

  return (
    <form onSubmit={props.onSubmit} className={classes.form}>
      <div className={classes.formGroup}>
        <TextField
          style={{width: '100%'}}
          label="Email"
          id="email"
          value={props.email}
          onChange={props.onChangeEmailInput}
          type="email" />
      </div>
      <div className={classes.formGroup}>
        <TextField
          style={{width: '100%'}}
          label="Password"
          id="password"
          value={props.password}
          onChange={props.onChangePasswordInput}
          type="password" />
      </div>
      <div>
        <Button className={classes.submitButton} type="submit" variant="contained" color="primary">Anmelden</Button>
      </div>
    </form>
  );
};

export default LoginForm;

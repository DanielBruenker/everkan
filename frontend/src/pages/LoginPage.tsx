import { useState } from 'react';
import { connect } from 'react-redux';
import { userActions } from '../actions';

import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';

const LoginForm = (props) => {
  return (
    <form>
      <div className="p-field">
        <label
          htmlFor="email"
          className="p-d-block">Email</label>
        <InputText
          id="email"
          value={props.email}
          onChange={props.onChangeEmailInput}
          type="email" />
      </div>
      <div className="p-field">
        <label
          htmlFor="password"
          className="p-d-block">Passwort</label>
        <InputText
          id="password"
          value={props.password}
          onChange={props.onChangePasswordInput}
          type="password" />
      </div>
      <Button onClick={props.onSubmit}>Anmelden</Button>
    </form>
    );
};

const LoginPage = (props) => {

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
      props.login(email, password);
    }
  };

  return (
    <div className="p-grid p-justify-center p-align-center full-screen">
      <div className="p-grid p-justify-center p-align-center login-form-container">
        <LoginForm
          email={email}
          password={password}
          onChangeEmailInput={handleOnChangeEmailInput}
          onChangePasswordInput={handleOnChangePasswordInput}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  )

}

function mapState(state) {
  const { loggingIn } = state.authentication;
  return { loggingIn };
}

const actionCreators = {
  login: userActions.login,
  logout: userActions.logout
};

const connectedLoginPage = connect(mapState, actionCreators)(LoginPage);
export { connectedLoginPage as LoginPage };
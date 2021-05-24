import { Button } from 'primereact/button';
import { InputText } from "primereact/inputtext";
import {Password} from 'primereact/password';
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { authenticationActions } from "../index";


const LoginForm: React.FC = () => {

  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    if (email && password) {
      try {
        dispatch(
          authenticationActions.login({ username: email, password: password })
        );
      } catch (err){
        console.log(err);
      }
    }
  };

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <div>
        <InputText
          placeholder="Email"
          id="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          type="email"
        />
      </div>
      <div>
        <Password
          placeholder="Password"
          feedback={false}
          toggleMask
          id="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          type="password"
        />
      </div>
      <div>
        <Button
          id="submitButton"
          type="submit"
          color="primary"
          label="Anmelden" />
      </div>
    </form>
  );
};

export default LoginForm;

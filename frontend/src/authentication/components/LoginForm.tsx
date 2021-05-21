import { Button } from 'primereact/button';
import { InputText } from "primereact/inputtext";
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
    <form onSubmit={handleSubmit}>
      <div>
        <InputText
          style={{ width: "100%" }}
          placeholder="Email"
          id="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          type="email"
        />
      </div>
      <div>
        <InputText
          style={{ width: "100%" }}
          placeholder="Password"
          id="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          type="password"
        />
      </div>
      <div>
        <Button
          type="submit"
          color="primary"
        >
          Anmelden
        </Button>
      </div>
    </form>
  );
};

export default LoginForm;

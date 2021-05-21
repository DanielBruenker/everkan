import React from "react";
import LoginForm from "../../authentication/components/LoginForm";

const LoginPage: React.FC = () => {
  return (
    <div className="p-grid p-justify-center p-align-center">
      <div className="login-form-wrapper">
        <div>
            <h4>Anmelden</h4>
        </div>
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;

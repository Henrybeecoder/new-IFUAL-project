import React from "react";
import AuthContainer from "../../containers/AuthContainer";
import LoginForm from "../../forms/AuthForms/Customer";

export default function Login() {
  return (
    <AuthContainer page="login">
      <LoginForm />
    </AuthContainer>
  );
}

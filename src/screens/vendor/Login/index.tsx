import AuthContainer from "../../../containers/AuthContainer";
import { LoginForm } from "../../../forms/AuthForms/Vendor";

const Login = () => {
  return (
    <AuthContainer page='login'>
      <LoginForm />
    </AuthContainer>
  );
};

export default Login;

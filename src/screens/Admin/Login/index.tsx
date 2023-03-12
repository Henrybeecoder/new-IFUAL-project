import SharedLogin from "../../SharedAdmin/Login";

const Login = () => {
  return (
    <SharedLogin
      cannotLoginUrl='/admin/login-issue'
      redirectUrl='/admin/dashboard'
    />
  );
};

export default Login;

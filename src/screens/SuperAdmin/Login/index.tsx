import SharedLogin from "../../SharedAdmin/Login";

const Login = () => {
  return (
    <SharedLogin
      cannotLoginUrl='/super-admin/login-issue'
      redirectUrl='/super-admin/dashboard'
    />
  );
};

export default Login;

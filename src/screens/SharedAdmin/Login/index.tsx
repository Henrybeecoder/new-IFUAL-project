import styles from "./style.module.css";
import logo from "../../../assets/logo.svg";
import { InputTemp } from "../../../Components/InputTemp";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import useMediaQuery from "../../../Custom hooks/useMediaQuery";
import { RenderPageProps } from "../../../types/shared";
import { Form, Formik } from "formik";
import { authSchema } from "../../../lib/validation/sharedAdmin";

interface LoginProps {
  redirectUrl: string;
  cannotLoginUrl: string;
}

const Login = ({ redirectUrl, cannotLoginUrl }: LoginProps) => {
  const [page, setPage] = useState("home");
  const matches = useMediaQuery("(min-width: 800px)");

  const renderPage: RenderPageProps = {
    home: <Home setPage={setPage} cannotLoginUrl={cannotLoginUrl} />,
    m_token: <MToken setPage={setPage} redirectUrl={redirectUrl} />,
  };

  return (
    <div className={styles.container}>
      <div className={styles.logoFlex}>
        <img src={logo} />
      </div>
      {page === "home" && matches && <h2>Welcome Admin</h2>}
      <div className={styles.pageContainer}>{renderPage[page]}</div>
      <div className={styles.footer}>
        <p>2022 iFuel. All rights reserved.</p>
      </div>
    </div>
  );
};

const Home = ({
  setPage,
  cannotLoginUrl,
}: {
  setPage: (page: string) => void;
  cannotLoginUrl: string;
}) => {
  const matches = useMediaQuery("(min-width: 800px)");

  const handleLogin = (values: any) => {
    setPage("m_token");
  };

  //TODO error placement for forms

  return (
    <Formik
      initialValues={{ username_email: "", password: "" }}
      validationSchema={authSchema.login}
      onSubmit={handleLogin}>
      {({ dirty, errors, getFieldProps }) => {
        // console.log(errors);
        return (
          <Form className={styles.form}>
            <h3>LOGIN</h3>
            <InputTemp
              label={!matches ? "EMAIL USERNAME" : ""}
              inputType='text'
              placeholder={"Enter username"}
              {...getFieldProps("username_email")}
            />
            <InputTemp
              label={!matches ? "PASSWORD" : ""}
              inputType='password'
              placeholder={"Enter Password"}
              {...getFieldProps("password")}
            />
            <button className={styles.btnLogin} disabled={!dirty} type='submit'>
              Log in
            </button>
            <p className={styles.altLink}>
              Can’t log in?{" "}
              <NavLink to={cannotLoginUrl} style={{ textDecoration: "none" }}>
                <span>Click here</span>
              </NavLink>
            </p>
          </Form>
        );
      }}
    </Formik>
  );
};

const MToken = ({
  setPage,
  redirectUrl,
}: {
  setPage: (page: string) => void;
  redirectUrl: string;
}) => {
  const navigate = useNavigate();

  const handleToken = (value: any) => {
    //handle use m_token
    navigate(redirectUrl);
  };

  return (
    <Formik
      initialValues={{ token: "" }}
      validationSchema={authSchema.m_token}
      onSubmit={handleToken}>
      {({ dirty, getFieldProps, errors }) => {
        return (
          <Form className={styles.form}>
            <h3>MToken</h3>
            <p className={styles.mTokenText}>
              Enter your Mtoken Code to gain access
            </p>
            <InputTemp
              inputType='number'
              placeholder={"Enter code"}
              {...getFieldProps("token")}
            />
            <div className={styles.btns}>
              <button
                type='button'
                className={styles.btnBack}
                onClick={() => setPage("home")}>
                Back
              </button>
              <button
                className={styles.btnSubmit}
                disabled={!dirty}
                type='submit'>
                Submit
              </button>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default Login;

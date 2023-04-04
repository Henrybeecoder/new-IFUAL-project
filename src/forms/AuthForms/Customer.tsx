import { useState } from "react";
import styles from "./style.module.css";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { useNavigate } from "react-router-dom";
import useMediaQuery from "../../Custom hooks/useMediaQuery";
import Button from "../../Components/Button";
import Checkbox from "../../Components/Checkbox";
import { InputTemp, SelectTemp } from "../../Components/InputTemp";
import Loading from "../../Components/Loading";
import { customerBaseUrl } from "../../utils/baseUrl";
import axios from "axios";
import errorAlert from "../../assets/svg/errorAlert.svg";
import Error from "../../assets/svg/Error.svg";
import newX from "../../assets/svg/newX.svg";
import { useGetStates } from "../../../src/Custom hooks/Hooks";
import { Formik } from "formik";
import { CustomerRVS } from "./validation";

export default function LoginForm() {
  const navigate = useNavigate();
  const [passwordVisible, setPasswordVisibility] = useState(false);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [rememberPassword, setRememberPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState(false);

  const togglePasswordVisiblity = () => {
    setPasswordVisibility((state) => !state);
  };
  const navigateToForgotPassword = () => {
    navigate({ pathname: "/forgot-password", search: "type=customer" });
  };

  const navigateToSignup = () => {
    navigate({ pathname: "/signup", search: "type=customer" });
  };

  const toggleRememberPassword = () => {
    setRememberPassword((state) => !state);
  };

  const login = () => {
    let loginPayload = {
      emailAddress: email,
      password: password,
    };
    setLoading(true);
    axios
      .post(`${customerBaseUrl}Account/Login`, loginPayload)
      .then((response) => {
        const token = response?.data?.data?.token;
        localStorage.setItem(
          "user",
          JSON.stringify({
            token: response?.data?.data?.token,
          })
        );

        axios
          .get(`${customerBaseUrl}Account/CustomerProfile`, {
            headers: { Authorization: `${token}` },
          })
          .then((response) => {
            localStorage.setItem(
              "user",
              JSON.stringify({
                firstName: response.data.data.firstName,
                lastName: response.data.data.surName,
                email: response.data.data.emailAddress,
                name: `${response.data.data.firstName} ${response.data.data.surName}`,
                profileImage: response.data.data.profileImageUrl,
                bankAccountNumber: response.data.data.bankAccountNumber,
                phoneNumber: response.data.data.phoneNumber,
                state: response.data.data.state,
                homeAddress: response.data.data.homeAddress,
                companyAddress: response.data.data.companyAddress,
                lga: response.data.data.lga,
                password: password,
                token: token,
              })
            );
            navigate("/");
            setLoading(false);
          })
          .catch((err) => {
            setLoading(false);
          });
        setLoading(true);
      })
      .catch((err) => {
        setLoginError(true);
        setLoading(false);
      });
  };

  return (
    <>
      {loading && <Loading />}
      {loginError && (
        <div className={styles.loginErrorContainer}>
          <img src={Error} alt='' />
          <p>Error: Email or Password incorrect</p>
          <img
            src={newX}
            alt=''
            onClick={() => setLoginError(false)}
            style={{ cursor: "pointer" }}
          />
        </div>
      )}

      <InputTemp
        label='EMAIL ADDRESS'
        placeholder='email@host.co..'
        inputType='email'
        mode='light'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <InputTemp
        visibilityPadding
        label='PASSWORD'
        placeholder='Enter Password'
        value={password}
        mode='light'
        onChange={(e) => setPassword(e.target.value)}
        inputType={passwordVisible ? "text" : "password"}>
        <i className={styles.btnVisibility} onClick={togglePasswordVisiblity}>
          {passwordVisible ? <Visibility /> : <VisibilityOff />}
        </i>
      </InputTemp>
      <div className={styles.forgotPassword}>
        <button onClick={navigateToForgotPassword}>Forgot Password</button>
      </div>
      <div className={styles.rememberMe}>
        <Checkbox
          checked={rememberPassword}
          toggleChecked={toggleRememberPassword}
        />
        <p>Remember me</p>
      </div>
      <div className={styles.footer}>
        <Button
          text={"Log in"}
          variant='primary'
          invalid={email?.length > 0 && password?.length > 0 ? false : true}
          onClick={() => login()}
        />
        <p>
          <div className={styles.signUp}>
            Don’t have an account?{" "}
            <span onClick={navigateToSignup}>Sign up</span>
          </div>
        </p>
      </div>
    </>
  );
}

const initialValues = {
  firstName: "",
  lastName: "",
  phoneNumber: "",
  email: "",
  houseAddress: "",
  password: "",
  confirmPassword: "",
  // accountNumber: "",
  stateValue: "",
};
export type SignUpFormValues = typeof initialValues;

export const SignUpForm = ({
  onSubmit,
}: {
  onSubmit: (values: SignUpFormValues) => void;
}) => {
  const navigate = useNavigate();
  const matches = useMediaQuery("(min-width: 800px)");
  const [visible, setV] = useState({ password: false, confirmPassword: false });
  const { states, loading } = useGetStates();

  console.log(states, loading);

  const [acceptTermsAndConditions, setATC] = useState(false);

  const [phase, setPhase] = useState("first");

  const toggleATC = () => {
    setATC((state) => !state);
  };

  const navigateToLogin = () => {
    navigate({ pathname: "/login" });
  };

  return (
    <>
      {loading && <Loading />}

      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={CustomerRVS}>
        {({
          dirty,
          getFieldProps,
          values,
          setFieldValue,
          submitForm,
          errors,
        }) => (
          <>
            {matches && (
              <>
                <form>
                  <div className={styles.flexForm}>
                    <InputTemp
                      label='FIRST NAME'
                      placeholder='Name'
                      inputType='text'
                      mode='light'
                      marginRight
                      {...getFieldProps("firstName")}
                    />
                    <InputTemp
                      label='SURNAME'
                      placeholder='Last name'
                      inputType='text'
                      mode='light'
                      marginLeft
                      {...getFieldProps("lastName")}
                    />
                  </div>
                  <div className={styles.flexForm}>
                    <InputTemp
                      label='PHONE NUMBER'
                      marginRight
                      placeholder='+234  708 ...'
                      inputType='tel'
                      mode='light'
                      {...getFieldProps("phoneNumber")}
                    />
                    <InputTemp
                      label='EMAIL ADDRESS'
                      marginLeft
                      placeholder='email@host.co.. '
                      inputType='email'
                      mode='light'
                      {...getFieldProps("email")}
                    />
                  </div>

                  <InputTemp
                    label='HOUSE ADDRESS'
                    mode='light'
                    placeholder='Enter address'
                    {...getFieldProps("houseAddress")}
                  />
                  <SelectTemp
                    mode='light'
                    options={states.map((state) => ({
                      label: state.text,
                      value: state.value,
                    }))}
                    disabled={states.length < 1}
                    label='SELECT STATE'
                    value={values.stateValue}
                    onValueChange={(e: any) =>
                      setFieldValue("stateValue", e.value)
                    }
                  />
                  <InputTemp
                    visibilityPadding
                    label='PASSWORD'
                    placeholder='Enter Preferred Password'
                    inputType={visible.password ? "text" : "password"}
                    mode='light'
                    {...getFieldProps("password")}>
                    <i
                      className={styles.btnVisibility}
                      onClick={() =>
                        setV((state) => ({
                          ...state,
                          password: !state.password,
                        }))
                      }>
                      {visible.password ? <Visibility /> : <VisibilityOff />}
                    </i>
                  </InputTemp>

                  <InputTemp
                    visibilityPadding
                    label='RECONFIRM PASSWORD'
                    inputType={visible.confirmPassword ? "text" : "password"}
                    placeholder='Enter Preferred Password'
                    mode='light'
                    {...getFieldProps("confirmPassword")}>
                    <i
                      onClick={() =>
                        setV((state) => ({
                          ...state,
                          confirmPassword: !state.confirmPassword,
                        }))
                      }
                      className={styles.btnVisibility}>
                      {visible.confirmPassword ? (
                        <Visibility />
                      ) : (
                        <VisibilityOff />
                      )}
                    </i>
                  </InputTemp>
                </form>
                {/* TODO */}
                {errors.confirmPassword && <PassWordMisMatch />}
                <div className={styles.rememberMe}>
                  <Checkbox
                    checked={acceptTermsAndConditions}
                    toggleChecked={toggleATC}
                  />
                  <p>
                    I accept the <span>Terms and Conditions</span>
                  </p>
                </div>

                <div className={styles.footer}>
                  <Button
                    text={"Register"}
                    variant='primary'
                    invalid={!dirty}
                    onClick={submitForm}
                  />
                  <div className={styles.signUp}>
                    Already have an account?{" "}
                    <span onClick={navigateToLogin}>Log in</span>
                  </div>
                </div>
              </>
            )}
            {/* mobile */}
            <form onSubmit={(e) => e.preventDefault()}>
              {phase === "first" && !matches ? (
                <>
                  <div className={styles.flexMobileForm}>
                    <InputTemp
                      label='FIRST NAME'
                      placeholder='Name'
                      inputType='text'
                      {...getFieldProps("firstName")}
                    />
                    <InputTemp
                      label='SURNAME'
                      placeholder='Last name'
                      inputType='text'
                      {...getFieldProps("lastName")}
                    />
                  </div>
                  <InputTemp
                    label='PHONE NUMBER'
                    placeholder='+234  708 ...'
                    inputType='tel'
                    {...getFieldProps("phoneNumber")}
                  />
                  <InputTemp
                    label='EMAIL ADDRESS'
                    placeholder='email@host.co.. '
                    inputType='email'
                    {...getFieldProps("email")}
                  />
                  <div className={styles.buttonContainer}>
                    <Button
                      text='Next'
                      onClick={() => setPhase("second")}
                      variant='primary'
                      invalid={!dirty}
                    />
                  </div>
                </>
              ) : null}
              {/* mobile second screen */}
              {phase === "second" && !matches ? (
                <>
                  <InputTemp
                    label='HOUSE ADDRESS'
                    placeholder='Enter address'
                    inputType='text'
                    {...getFieldProps("houseAddress")}
                  />
                  <SelectTemp
                    mode='dark'
                    options={states.map((state) => ({
                      label: state.text,
                      value: state.value,
                    }))}
                    label='SELECT STATE'
                    value={values.stateValue}
                    onValueChange={(e: any) =>
                      setFieldValue("stateValue", e.value)
                    }
                  />
                  <InputTemp
                    visibilityPadding
                    label='PASSWORD'
                    placeholder='Enter Preferred Password'
                    inputType={visible.password ? "text" : "password"}
                    {...getFieldProps("password")}>
                    <i
                      className={styles.btnVisibility}
                      onClick={() =>
                        setV((state) => ({
                          ...state,
                          password: !state.password,
                        }))
                      }>
                      {visible.password ? <Visibility /> : <VisibilityOff />}
                    </i>
                  </InputTemp>

                  <InputTemp
                    visibilityPadding
                    label='RECONFIRM PASSWORD'
                    inputType={visible.password ? "text" : "password"}
                    placeholder='Enter Preferred Password'
                    {...getFieldProps("confirmPassword")}>
                    <i
                      onClick={() =>
                        setV((state) => ({
                          ...state,
                          confirmPassword: !state.confirmPassword,
                        }))
                      }
                      className={styles.btnVisibility}>
                      {visible.confirmPassword ? (
                        <Visibility />
                      ) : (
                        <VisibilityOff />
                      )}
                    </i>
                  </InputTemp>
                  {/* TODO */}
                  {errors.confirmPassword && <PassWordMisMatch />}

                  <div className={styles.rememberMe}>
                    <Checkbox
                      checked={acceptTermsAndConditions}
                      toggleChecked={toggleATC}
                    />
                    <p>
                      I accept the <span>Terms and Conditions</span>
                    </p>
                  </div>
                  <div className={styles.footer}>
                    <Button
                      text='Register'
                      onClick={submitForm}
                      invalid={!dirty}
                    />
                    <p>
                      <div className={styles.signUp}>
                        Already have an account?{" "}
                        <span onClick={navigateToLogin}>Log in</span>
                      </div>
                    </p>
                  </div>
                </>
              ) : null}
            </form>
          </>
        )}
      </Formik>
    </>
  );
};

const PassWordMisMatch = () => {
  return (
    <div className={styles.passwordMisMatch}>
      <img src={errorAlert} alt='' />
      <p>Both passwords don’t match</p>
    </div>
  );
};

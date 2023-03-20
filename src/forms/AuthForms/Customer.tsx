import React, { useEffect, useState } from "react";
import styles from "./style.module.css";
import emoji from "../../assets/svg/emoji.svg";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { useNavigate } from "react-router-dom";
import { states } from "../../utils/state";
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

// import { setLocalStorageItem } from "../../utils/localStorage";
// import Modal from "../../Components/Modals";

// interface SignUpDetails {
//   email: string;
// }

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

  const getCustomerProfile = () => {
    setLoading(true);
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
        console.log(token);
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
            console.log(response, "customer profile");
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
            console.log(err);
            setLoading(false);
          });
        setLoading(true);
      })
      .catch((err) => {
        setLoginError(true);
        console.log(err);
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
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <InputTemp
        visibilityPadding
        label='PASSWORD'
        placeholder='Enter Password'
        value={password}
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

export const SignUpForm = ({
  setOpenAccountUpdateModal,
  accountNumber,
  firstName,
  setFirstName,
  lastName,
  setLastName,
  phoneNumber,
  setPhoneNumber,
  email,
  setEmail,
  houseAddress,
  setHouseAddress,
  password,
  setPassword,
  confirmPassword,
  setConfirmPassword,
  stateValue,
  setStateValue,
  handleStateGlobalChange,
}) => {
  const navigate = useNavigate();
  const matches = useMediaQuery("(min-width: 800px)");
  const [passwordVisible, setPasswordVisibility] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisibility] =
    useState(false);
  const [selectState, setSelectState] = useState("");

  const [acceptTermsAndConditions, setATC] = useState(false);

  const [loading, setLoading] = useState(false);
  const [phase, setPhase] = useState("first");
  const [allStateData, setAllStateData] = useState([]);
  const [passwordMismatch, setPasswordMismatch] = useState(false);

  const handleStateChange = (event: any) => {
    setSelectState(event.target.value);
  };

  const togglePasswordVisiblity = () => {
    setPasswordVisibility((state) => !state);
  };

  const toggleConfirmPasswordVisiblity = () => {
    setConfirmPasswordVisibility((state) => !state);
  };

  const switchPhase = (phase: string) => {
    setPhase(phase);
  };

  const toggleATC = () => {
    setATC((state) => !state);
  };

  const navigateToLogin = () => {
    navigate({ pathname: "/login", search: "?type=customer" });
  };

  const getAllState = () => {
    setLoading(true);
    axios
      .get(`${customerBaseUrl}Account/GetState`)
      .then((response) => {
        setAllStateData(response.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    getAllState();
  }, []);

  // Register customer

  const onRegisterClick = () => {
    if (password !== confirmPassword) {
      setPasswordMismatch(true);
    } else {
      setOpenAccountUpdateModal(true);
      setPasswordMismatch(false);
    }
  };

  return (
    <>
      {loading && <Loading />}

      {matches && (
        <>
          <form>
            <div className={styles.flexForm}>
              <InputTemp
                label='FIRST NAME'
                placeholder='Name'
                inputType='text'
                name='firstName'
                mode='light'
                marginRight
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <InputTemp
                label='SURNAME'
                placeholder='Last name'
                inputType='text'
                mode='light'
                marginLeft
                name='lastName'
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <div className={styles.flexForm}>
              <InputTemp
                label='PHONE NUMBER'
                marginRight
                placeholder='+234  708 ...'
                inputType='tel'
                mode='light'
                name='phoneNo'
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
              <InputTemp
                label='EMAIL ADDRESS'
                marginLeft
                placeholder='email@host.co.. '
                inputType='email'
                mode='light'
                name='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <InputTemp
              label='HOUSE ADDRESS'
              placeholder='Enter address'
              value={houseAddress}
              onChange={(e) => setHouseAddress(e.target.value)}
            />
            <SelectTemp
              mode='light'
              options={allStateData.map((state) => ({
                label: state.text,
                value: state.value,
              }))}
              label='SELECT STATE'
              value={stateValue}
              onValueChange={handleStateGlobalChange}
            />
            <InputTemp
              visibilityPadding
              label='PASSWORD'
              placeholder='Enter Preferred Password'
              inputType={passwordVisible ? "text" : "password"}
              mode='light'
              value={password}
              onChange={(e) => setPassword(e.target.value)}>
              <i
                className={styles.btnVisibility}
                onClick={togglePasswordVisiblity}>
                {passwordVisible ? <Visibility /> : <VisibilityOff />}
              </i>
            </InputTemp>

            <InputTemp
              visibilityPadding
              label='RECONFIRM PASSWORD'
              inputType={confirmPasswordVisible ? "text" : "password"}
              placeholder='Enter Preferred Password'
              mode='light'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}>
              <i
                onClick={toggleConfirmPasswordVisiblity}
                className={styles.btnVisibility}>
                {confirmPasswordVisible ? <Visibility /> : <VisibilityOff />}
              </i>
            </InputTemp>
          </form>
          {passwordMismatch && <PassWordMisMatch />}
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
              invalid={
                false
                // firstName.length < 1 ||
                // lastName.length < 1 ||
                // houseAddress.length < 1 ||
                // phoneNumber.length < 1 ||
                // email.length < 1 ||
                // password.length < 1 ||
                // confirmPassword.length < 1
              }
              onClick={onRegisterClick}

              // onClick={() => signup({ email })}
            />
            <p>
              <div className={styles.signUp}>
                Already have an account?{" "}
                <span onClick={navigateToLogin}>Log in</span>
              </div>
            </p>
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
                name='firstName'
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <InputTemp
                label='SURNAME'
                placeholder='Last name'
                inputType='text'
                name='lastName'
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <InputTemp
              label='PHONE NUMBER'
              placeholder='+234  708 ...'
              inputType='tel'
              name='phoneNo'
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
            <InputTemp
              label='EMAIL ADDRESS'
              placeholder='email@host.co.. '
              inputType='email'
              name='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className={styles.buttonContainer}>
              <Button
                text='Next'
                onClick={() => switchPhase("second")}
                variant='primary'
                invalid={
                  firstName?.length < 1 ||
                  lastName?.length < 1 ||
                  phoneNumber?.length < 1 ||
                  email?.length < 1
                }
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
              name='address'
              value={houseAddress}
              onChange={(e) => setHouseAddress(e.target.value)}
            />
            <SelectTemp
              mode='dark'
              options={allStateData.map((state) => ({
                label: state.text,
                value: state.value,
              }))}
              label='SELECT STATE'
              value={stateValue}
              onValueChange={handleStateGlobalChange}
            />
            <InputTemp
              visibilityPadding
              label='PASSWORD'
              placeholder='Enter Preferred Password'
              inputType={passwordVisible ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}>
              <i
                className={styles.btnVisibility}
                onClick={togglePasswordVisiblity}>
                {passwordVisible ? <Visibility /> : <VisibilityOff />}
              </i>
            </InputTemp>

            <InputTemp
              visibilityPadding
              label='RECONFIRM PASSWORD'
              inputType={confirmPasswordVisible ? "text" : "password"}
              placeholder='Enter Preferred Password'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}>
              <i
                onClick={toggleConfirmPasswordVisiblity}
                className={styles.btnVisibility}>
                {confirmPasswordVisible ? <Visibility /> : <VisibilityOff />}
              </i>
            </InputTemp>
            {passwordMismatch && <PassWordMisMatch />}

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
              <Button text='Register' onClick={onRegisterClick} />
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

import React, { useState, useCallback } from "react";
import { InputTemp, TextareaTemp } from "../../InputTemp";
import Button from "../../Button";
import styles from "./style.module.css";
import Modal from "../../../Components/Modals";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import errorAlert from "../../../assets/svg/errorAlert.svg";
import checkSuccess from "../../../assets/svg/modalCheck.svg";
import { ToastContainer, toast } from "react-toastify";
import AuthCode from "react-auth-code-input";
import { customerBaseUrl } from "../../../utils/baseUrl";
import axios from "axios";

export default function ChangeAccount({ newUser, setLoading, backToProfile }) {
  const [accountNumber, setAccountNumber] = useState("");
  const [openPasswordModal, setOpenPasswordModal] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");

  const [currentPasswordError, setCurrentPasswordError] = useState(false);
  const [passwordVisible, setPasswordVisibility] = useState(false);
  const [filledCurrentPassword, setFilledCurrentPassword] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const [otp, setOtp] = useState("");
  const togglePasswordVisiblity = () => {
    setPasswordVisibility((state) => !state);
  };

  const accountNumberSubmitted = () => {
    setOpenPasswordModal(true);
  };

  const validateCurrentPassword = () => {
    if (newUser?.password !== currentPassword) {
      setCurrentPasswordError(true);
    } else {
      setFilledCurrentPassword(true);
      setOpenPasswordModal(false);
      getOTP();
    }
  };
  const handleOnChange = (res: string) => {
    setOtp(res);
  };
  const [dataOTP, setDataOTP] = useState("");
  const newDataOTP = otp?.toString();

  const verifyOtp = () => {
    if (newDataOTP === dataOTP) {
      setSuccessModal(true);
      setTimeout(() => backToProfile(), 3000);
    } else {
      toast.error("Wrong OTP, Please Try Again");
    }
  };
  const getOTP = useCallback(() => {
    setLoading(true);
    axios
      .get(
        `${customerBaseUrl}Account/OtpEmail/${newUser?.email}/${newUser?.firstName}`
      )
      .then((response) => {
        setDataOTP(response.data.data.otp);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [newUser?.email, newUser?.firstName, setLoading]);
  return (
    <>
      {filledCurrentPassword ? (
        <div className={styles.filledContainer}>
          <div className={styles.changeAccountModule}>
            <h1>Change Account</h1>
            <p>
              Enter your Sterling account details to be saved on your iFuel
              account
            </p>
            <InputTemp
              label="ACCOUNT NUMBER"
              placeholder="Enter account number"
              value={accountNumber}
            />
          </div>
          <div className={styles.otpModule}>
            <h2>Verify account details</h2>
            <p className={styles.paragraph}>
              Enter the OTP sent to your email or Phone Number
            </p>
            <AuthCode
              allowedCharacters="numeric"
              onChange={handleOnChange}
              length={6}
              inputClassName={styles.otp}
            />
            <div className={styles.buttonFlex}>
              <Button
                text="Back"
                variant="outlinePrimary"
                width="30%"
                className={styles.cancelButton}
              />
              <Button
                text="Verify"
                variant="primary"
                width="70%"
                invalid={accountNumber.length < 10}
                onClick={verifyOtp}
              />
            </div>
          </div>
          <Modal
            variant="default"
            openModal={successModal}
            closeModal={() => setSuccessModal(false)}
            style={{ position: "fixed" }}
          >
            <div className={styles.accountUpdateModal}>
              <h2>Account Changed Successful</h2>
              <img src={checkSuccess} alt="" />
              <p>Redirecting to Profile Page ...</p>
            </div>
          </Modal>
        </div>
      ) : (
        <div>
          <div className={styles.changeAccount}>
            <h1>Change Account</h1>
            <p>
              Enter your Sterling account details to be saved on your iFuel
              account
            </p>
            <InputTemp
              label="ACCOUNT NUMBER"
              placeholder="Enter account number"
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value)}
            />
            <div className={styles.buttonFlex}>
              <Button
                text="Back"
                variant="outlinePrimary"
                width="30%"
                className={styles.cancelButton}
                onClick={() => backToProfile()}
              />
              <Button
                text="Change"
                variant="primary"
                width="70%"
                invalid={accountNumber.length < 10}
                onClick={accountNumberSubmitted}
              />
            </div>
          </div>
          <Modal
            variant="default"
            openModal={openPasswordModal}
            closeModal={() => setOpenPasswordModal(false)}
            style={{ position: "fixed" }}
          >
            <div className={styles.accountUpdateModal}>
              <h2>Enter Password</h2>
              <p>
                Please enter your password to continue with replacing account.
              </p>
              <InputTemp
                visibilityPadding
                placeholder="Enter current Password"
                inputType={passwordVisible ? "text" : "password"}
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
              >
                <i
                  className={styles.btnVisibility}
                  onClick={togglePasswordVisiblity}
                >
                  {passwordVisible ? <Visibility /> : <VisibilityOff />}
                </i>
              </InputTemp>
              {currentPasswordError && (
                <div className={styles.passwordMisMatch}>
                  <img src={errorAlert} alt="" />
                  <p>Password is not correct</p>
                </div>
              )}
              {/* <img src={checkSuccess} alt="" /> */}
              <div className={styles.buttonFlex}>
                <Button
                  text="Back"
                  variant="outlinePrimary"
                  width="50%"
                  className={styles.cancelButton}
                />
                <Button
                  text="Submit"
                  variant="primary"
                  width="50%"
                  invalid={currentPassword.length < 1}
                  onClick={validateCurrentPassword}
                />
              </div>
            </div>
          </Modal>
        </div>
      )}
    </>
  );
}

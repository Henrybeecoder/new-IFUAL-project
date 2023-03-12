import React, { useState, useEffect } from "react";
import styles from "./style.module.css";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Modal from "../../../Components/Modals";
import checkSuccess from "../../../assets/svg/modalCheck.svg";
import { InputTemp, TextareaTemp } from "../../InputTemp";
import errorAlert from "../../../assets/svg/errorAlert.svg";
import { customerBaseUrl } from "../../../utils/baseUrl";
import Button from "../../Button";
import axios from "axios";

export default function ChangePassword({ newUser, setLoading, backToProfile }) {
  const [successModal, setSuccessModal] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [currentPasswordError, setCurrentPasswordError] = useState(false);
  const [passwordVisible, setPasswordVisibility] = useState(false);
  const [newpasswordVisible, setNewPasswordVisibility] = useState(false);
  const [confirmpasswordVisible, setConfirmPasswordVisibility] =
    useState(false);
  const [passwordMismatch, setPasswordMismatch] = useState(false);
  const togglePasswordVisiblity = () => {
    setPasswordVisibility((state) => !state);
  };
  const toggleNewPasswordVisiblity = () => {
    setNewPasswordVisibility((state) => !state);
  };
  const toggleConfirmPasswordVisiblity = () => {
    setConfirmPasswordVisibility((state) => !state);
  };

  const changePasswordFuntion = () => {
    if (newUser?.password !== currentPassword) {
      setCurrentPasswordError(true);
    } else if (newPassword !== confirmPassword) {
      setPasswordMismatch(true);
    } else {
      setLoading(true);
      setCurrentPasswordError(false);
      setPasswordMismatch(false);
      let changePasswordPayload = {
        email: newUser?.email,
        newPassword: newPassword,
        confirmNewPassword: confirmPassword,
      };
      axios
        .post(`${customerBaseUrl}Account/ResetPassword`, changePasswordPayload)
        .then((response) => {
          console.log(response);
          if (response) {
            setSuccessModal(true);
            setLoading(false);
            setTimeout(() => backToProfile(), 3000);
          }
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    }
  };
  return (
    <div className={styles.changePassword}>
      <h2>Change Password</h2>
      <InputTemp
        visibilityPadding
        label="CURRENT PASSWORD"
        placeholder="Enter current Password"
        inputType={passwordVisible ? "text" : "password"}
        value={currentPassword}
        onChange={(e) => setCurrentPassword(e.target.value)}
      >
        <i className={styles.btnVisibility} onClick={togglePasswordVisiblity}>
          {passwordVisible ? <Visibility /> : <VisibilityOff />}
        </i>
      </InputTemp>
      {currentPasswordError && (
        <div className={styles.passwordMisMatch}>
          <img src={errorAlert} alt="" />
          <p>Password is not correct</p>
        </div>
      )}
      <InputTemp
        visibilityPadding
        label="NEW PASSWORD"
        placeholder="Enter new password"
        inputType={newpasswordVisible ? "text" : "password"}
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
      >
        <i
          className={styles.btnVisibility}
          onClick={toggleNewPasswordVisiblity}
        >
          {newpasswordVisible ? <Visibility /> : <VisibilityOff />}
        </i>
      </InputTemp>
      <InputTemp
        visibilityPadding
        label="CONFIRM PASSWORD"
        placeholder="Enter new password"
        inputType={confirmpasswordVisible ? "text" : "password"}
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      >
        <i
          className={styles.btnVisibility}
          onClick={toggleConfirmPasswordVisiblity}
        >
          {confirmpasswordVisible ? <Visibility /> : <VisibilityOff />}
        </i>
      </InputTemp>
      {passwordMismatch && <PassWordMisMatch />}
      <div className={styles.buttonFlex}>
        <Button
          text="Back"
          variant="outlinePrimary"
          width="40%"
          className={styles.cancelButton}
        />
        <Button
          text="Change"
          variant="primary"
          width="60%"
          invalid={
            currentPassword.length < 1 ||
            newPassword.length < 1 ||
            confirmPassword.length < 1
          }
          onClick={changePasswordFuntion}
        />
      </div>
      <Modal
        variant="default"
        openModal={successModal}
        closeModal={() => setSuccessModal(false)}
        style={{ position: "fixed" }}
      >
        <div className={styles.accountUpdateModal}>
          <h2>Password Changed Successful</h2>
          <img src={checkSuccess} alt="" />
          <p>Redirecting to Profile Page ...</p>
        </div>
      </Modal>
    </div>
  );
}

const PassWordMisMatch = () => {
  return (
    <div className={styles.passwordMisMatch}>
      <img src={errorAlert} alt="" />
      <p>Both passwords don’t match</p>
    </div>
  );
};

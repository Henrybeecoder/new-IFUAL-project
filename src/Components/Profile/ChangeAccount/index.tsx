import { useReducer } from "react";
import { InputTemp } from "../../InputTemp";
import Button from "../../Button";
import styles from "./style.module.css";
import Modal from "../../../Components/Modals";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import errorAlert from "../../../assets/svg/errorAlert.svg";
import checkSuccess from "../../../assets/svg/modalCheck.svg";
import { toast } from "react-toastify";
import AuthCode from "react-auth-code-input";
import { customerBaseUrl } from "../../../utils/baseUrl";
import axios from "axios";
import { initialState, reducer } from "./states";

interface Props {
  edit?: boolean;
  newUser: any;
  setLoading: (state: boolean) => void;
  backToProfile: () => void;
}

export default function ChangeAccount({
  newUser,
  setLoading,
  backToProfile,
  edit = true,
}: Props) {
  const [{ values, modals, errors, visibility, filled }, dispatch] = useReducer(
    reducer,
    initialState
  );

  const validateCurrentPassword = () => {
    if (newUser?.password !== values.currentPassword) {
      dispatch({ type: "currentPasswordError", payload: true });
    } else {
      dispatch({ type: "filledCurrentPassword", payload: true });
      dispatch({ type: "passwordModal", payload: false });
      getOTP();
    }
  };

  const verifyOtp = async () => {
    if (values.otp?.toString() !== values.serverOtp) {
      toast.error("Wrong OTP, Please Try Again");
    } else {
      try {
        await axios.get(
          `${customerBaseUrl}Account/ChangeAccountNumber/${values.accountNo}`
        );
        dispatch({ type: "successModal", payload: true });
        setTimeout(() => backToProfile(), 3000);
      } catch (err) {}
    }
  };

  const getOTP = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `${customerBaseUrl}Account/OtpEmail/${newUser?.email}/${newUser?.firstName}`
      );
      dispatch({ type: "serverOtp", payload: data.data.otp });
      setLoading(true);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  return (
    <>
      {filled.currentPassword ? (
        <div className={styles.filledContainer}>
          <div className={styles.changeAccountModule}>
            <h1>Change Account</h1>
            <p>
              Enter your Sterling account details to be saved on your iFuel
              account
            </p>
            <InputTemp
              label='ACCOUNT NUMBER'
              placeholder='Enter account number'
              value={values.accountNo}
            />
          </div>
          <div className={styles.otpModule}>
            <h2>Verify account details</h2>
            <p className={styles.paragraph}>
              Enter the OTP sent to your email or Phone Number
            </p>
            <AuthCode
              allowedCharacters='numeric'
              onChange={(e) => dispatch({ type: "otp", payload: e })}
              length={6}
              inputClassName={styles.otp}
            />
            <div className={styles.buttonFlex}>
              <Button
                text='Back'
                variant='outlinePrimary'
                width='30%'
                className={styles.cancelButton}
              />
              <Button
                text='Verify'
                variant='primary'
                width='70%'
                invalid={values.accountNo.length < 10}
                onClick={verifyOtp}
              />
            </div>
          </div>
          <Modal
            variant='default'
            openModal={modals.success}
            closeModal={() =>
              dispatch({ type: "successModal", payload: false })
            }
            style={{ position: "fixed" }}>
            <div className={styles.accountUpdateModal}>
              <h2>Account Changed Successful</h2>
              <img src={checkSuccess} alt='' />
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
              label='ACCOUNT NUMBER'
              placeholder='Enter account number'
              value={values.accountNo}
              inputType='number'
              disabled={!edit}
              onChange={(e) =>
                dispatch({ type: "accountNo", payload: e.target.value })
              }
            />
            <div className={styles.buttonFlex}>
              <Button
                text='Back'
                variant='outlinePrimary'
                width='30%'
                className={styles.cancelButton}
                onClick={() => backToProfile()}
              />
              <Button
                text='Change'
                variant='primary'
                width='70%'
                invalid={values.accountNo.length < 10}
                onClick={() =>
                  dispatch({ type: "passwordModal", payload: true })
                }
              />
            </div>
          </div>
          <Modal
            variant='default'
            openModal={modals.password}
            closeModal={() =>
              dispatch({ type: "passwordModal", payload: false })
            }
            style={{ position: "fixed" }}>
            <div className={styles.accountUpdateModal}>
              <h2>Enter Password</h2>
              <p>
                Please enter your password to continue with replacing account.
              </p>
              <InputTemp
                visibilityPadding
                placeholder='Enter current Password'
                inputType={visibility.password ? "text" : "password"}
                value={values.currentPassword}
                onChange={(e) =>
                  dispatch({ type: "currentPassword", payload: e.target.value })
                }>
                <i
                  className={styles.btnVisibility}
                  onClick={() => dispatch({ type: "passwordVisible" })}>
                  {visibility.password ? <Visibility /> : <VisibilityOff />}
                </i>
              </InputTemp>
              {errors.currentPassword && (
                <div className={styles.passwordMisMatch}>
                  <img src={errorAlert} alt='' />
                  <p>Password is not correct</p>
                </div>
              )}
              {/* <img src={checkSuccess} alt="" /> */}
              <div className={styles.buttonFlex}>
                <Button
                  text='Back'
                  variant='outlinePrimary'
                  width='50%'
                  className={styles.cancelButton}
                  onClick={() =>
                    dispatch({ type: "passwordModal", payload: false })
                  }
                />
                <Button
                  text='Submit'
                  variant='primary'
                  width='50%'
                  invalid={values.currentPassword.length < 1}
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

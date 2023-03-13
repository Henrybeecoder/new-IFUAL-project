import React, { useState, useCallback, useEffect } from "react";
import styles from "./style.module.css";
import { useNavigate, useSearchParams } from "react-router-dom";
import AuthContainer from "../../containers/AuthContainer";
import StartPage from "../../screens/StartPage";
import { SignUpForm as Vendor } from "../../forms/AuthForms/Vendor";
import { SignUpForm as Customer } from "../../forms/AuthForms/Customer";
import { RenderPageProps } from "../../types/shared";
import Button from "../../Components/Button";
import Modal from "../../Components/Modals";
import { InputTemp } from "../../Components/InputTemp";
import { customerBaseUrl } from "../../utils/baseUrl";
import InputLoader from "../../Components/InputLoader";
import Loading from "../../Components/Loading";
import { ToastContainer, toast } from "react-toastify";
import AuthCode from "react-auth-code-input";
import checkSuccess from "../../assets/svg/modalCheck.svg";
import failure from "../../assets/svg/failure.svg";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

export default function SignUp() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [openAccountUpdateModal, setOpenAccountUpdateModal] = useState(false);
  const [enterPersonalAccountModal, setEnterPersonalAccountNumberModal] =
    useState(false);
  const [enterOTPModal, setEnterOTPModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const [accountNumberLoading, setAccountNumberLoading] = useState(false);
  const [fullAccountName, setFullAccountName] = useState("");
  const [dataOTP, setDataOTP] = useState("");
  const [accountSaved, setAccountSaved] = useState(false);
  const [otp, setOtp] = useState("");
  const [accountFaliure, setAccountFailure] = useState(false);

  //Register customer states

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [houseAddress, setHouseAddress] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [stateValue, setStateValue] = useState<any>({});

  const navigateToSignUp = () => {
    navigate({ pathname: "/signup", search: "type=customer" });
    //@ts-ignore
    window.location.reload(false);
  };

  const handleOnChange = (res: string) => {
    setOtp(res);
  };
  const handleStateGlobalChange = (event: any) => {
    setStateValue(event);
  };

  const onChangeAccountNumber = useCallback((e) => {
    setAccountNumber(e.target.value);
  }, []);

  const submitAccountNumber = () => {
    setLoading(true);
    let registerCustomerPayload = {
      firstName: firstName,
      surname: lastName,
      phoneNumber: phoneNumber,
      emailAddress: email,
      houseAddress: houseAddress,
      state: stateValue.value,
      bankAccountNumber: accountNumber,
      password: password,
      confirmPassword: confirmPassword,
    };
    axios
      .post(`${customerBaseUrl}Account/CreateCustomer`, registerCustomerPayload)
      .then((response) => {
        if (response) {
          setEnterOTPModal(true);
          setEnterPersonalAccountNumberModal(false);
          setOpenAccountUpdateModal(false);
          getOTP();
          setLoading(false);
        } else {
          setAccountFailure(true);
          setEnterOTPModal(false);
          setEnterPersonalAccountNumberModal(false);
          setOpenAccountUpdateModal(false);
          setLoading(false);
        }
      })
      .catch((err) => {
        setAccountFailure(true);
        setEnterOTPModal(false);
        setEnterPersonalAccountNumberModal(false);
        setOpenAccountUpdateModal(false);
        setLoading(false);
        console.log(err);
        setLoading(false);
      });
  };

  const newDataOTP = otp?.toString();

  const verifyOtp = () => {
    if (newDataOTP === dataOTP) {
      toast.success("successful");
      setAccountSaved(true);
      setEnterOTPModal(false);
      setEnterPersonalAccountNumberModal(false);
      setOpenAccountUpdateModal(false);
      setTimeout(
        () => navigate({ pathname: "/login", search: "type=customer" }),
        7000
      );
    } else {
      toast.error("Wrong OTP, Please Try Again");
    }
  };

  const getOTP = () => {
    axios
      .get(`${customerBaseUrl}Account/OtpEmail/${email}/${firstName}`)
      .then((response) => {
        setDataOTP(response.data.data.otp);
      })
      .catch((err) => {
        console.log(err);
        setAccountNumberLoading(false);
      });
  };

  const getCustomOTP = () => {
    axios
      .get(`${customerBaseUrl}Account/OtpEmail/${email}/${firstName}`)
      .then((response) => {
        toast.success("OTP sent to your mail");
        setDataOTP(response.data.data.otp);
      })
      .catch((err) => {
        console.log(err);
        setAccountNumberLoading(false);
      });
  };

  useEffect(() => {
    if (accountNumber?.length === 10) {
      setAccountNumberLoading(true);
      axios
        .get(`${customerBaseUrl}Account/VerifyAccount/${accountNumber}`)
        .then((response) => {
          if (response.data.responseCode === "00") {
            setFullAccountName(response.data.data.accountName);
            setAccountNumberLoading(false);
          } else {
            toast.error("Account is not active");
            setAccountNumberLoading(false);
            setFullAccountName("");
          }
        })
        .catch((err) => {
          console.log(err);
          setAccountNumberLoading(false);
        });
    }
  }, [accountNumber]);

  const enterPersonalAccountClick = () => {
    setEnterPersonalAccountNumberModal(true);
    setOpenAccountUpdateModal(false);
  };

  const goBackToOpenAccountUpdateModal = () => {
    setEnterPersonalAccountNumberModal(false);
    setAccountNumber("");
    setFullAccountName("");
    setOpenAccountUpdateModal(true);
  };

  const registerCustomer = () => {};

  const signupType = searchParams.get("type");

  const renderPage: RenderPageProps = {
    customer: (
      <Customer
        setOpenAccountUpdateModal={setOpenAccountUpdateModal}
        accountNumber={accountNumber}
        firstName={firstName}
        setFirstName={setFirstName}
        lastName={lastName}
        setLastName={setLastName}
        phoneNumber={phoneNumber}
        setPhoneNumber={setPhoneNumber}
        email={email}
        setEmail={setEmail}
        houseAddress={houseAddress}
        setHouseAddress={setHouseAddress}
        password={password}
        setPassword={setPassword}
        confirmPassword={confirmPassword}
        setConfirmPassword={setConfirmPassword}
        stateValue={stateValue}
        setStateValue={setStateValue}
        handleStateGlobalChange={handleStateGlobalChange}
      />
    ),
    vendor: <Vendor />,
  };

  if (signupType !== "customer" && signupType !== "vendor")
    return <StartPage />;
  return (
    <div>
      {loading && <Loading />}
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Modal
        variant="default"
        openModal={openAccountUpdateModal}
        closeModal={() => setOpenAccountUpdateModal(false)}
        style={{ position: "fixed" }}
      >
        <div className={styles.accountUpdateModal}>
          <h2>Account Update</h2>
          <p className={styles.paragraph}>
            This is the account number saved on the app for easy payment.
          </p>
          <Button
            variant="primary"
            text="Enter Personal Account Number"
            onClick={() => enterPersonalAccountClick()}
          />
          <Button variant="outlinePrimary" text="Create a new Account" />
          <Button variant="outlinePrimary" text="Skip for now, add later" />
        </div>
      </Modal>
      <Modal
        variant="default"
        openModal={enterPersonalAccountModal}
        closeModal={() => setEnterPersonalAccountNumberModal(false)}
        style={{ position: "fixed" }}
      >
        <div className={styles.accountUpdateModal}>
          <h2>Enter account details</h2>
          <p className={styles.paragraph}>
            Enter your Sterling account details to be saved on your iFuel
            account.
          </p>
          <InputTemp
            label="ACCOUNT NUMBER"
            placeholder="Enter account number"
            inputType="text"
            name="accountNumber"
            value={accountNumber}
            onChange={onChangeAccountNumber}
          />
          {accountNumberLoading ? (
            <InputLoader />
          ) : (
            <InputTemp label="ACCOUNT NAME" value={fullAccountName} />
          )}
          <div className={styles.buttonFlex}>
            <Button
              variant="outlinePrimary"
              text="Back"
              onClick={() => {
                goBackToOpenAccountUpdateModal();
              }}
              width={"47%"}
            />
            <Button
              variant="primary"
              text="Submit"
              invalid={fullAccountName?.length < 1}
              width={"47%"}
              onClick={() => {
                submitAccountNumber();
              }}
            />
          </div>
        </div>
      </Modal>
      <Modal
        variant="default"
        openModal={enterOTPModal}
        closeModal={() => setEnterOTPModal(false)}
        style={{ position: "fixed" }}
      >
        <div className={styles.accountUpdateModal}>
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
          <Button
            variant="primary"
            text="Submit"
            invalid={otp?.length < 6}
            onClick={() => {
              verifyOtp();
            }}
          />
          <p className={styles.otpText}>
            {" "}
            You have not received an OTP,
            <span
              onClick={() => {
                getCustomOTP();
              }}
            >
              {" "}
              click here{" "}
            </span>
          </p>
        </div>
      </Modal>
      <Modal
        variant="default"
        openModal={accountSaved}
        closeModal={() => setAccountSaved(false)}
        style={{ position: "fixed" }}
      >
        <div className={styles.accountUpdateModal}>
          <h2>Account Saved Successfully</h2>
          <img src={checkSuccess} alt="" />
          <p className={styles.paragraph}>Redirecting to Log in ...</p>
        </div>
      </Modal>
      <Modal
        variant="default"
        openModal={accountFaliure}
        closeModal={() => setAccountFailure(false)}
        style={{ position: "fixed" }}
      >
        <div className={styles.accountUpdateModal}>
          <h2>Customer Account Creation Failed</h2>
          <img src={failure} alt="" />
          <p className={styles.paragraph}>
            This activity could not be completed, due to some reasons.
          </p>
          <div className={styles.buttonFlex}>
            <Button
              variant="outlinePrimary"
              text="Cancel"
              onClick={() => {
                navigateToSignUp();
              }}
              width={"47%"}
            />
            <Button
              variant="primary"
              text="Retry"
              invalid={fullAccountName?.length < 1}
              width={"47%"}
              onClick={() => {
                navigateToSignUp();
              }}
            />
          </div>
        </div>
      </Modal>
      <AuthContainer page="register">{renderPage[signupType]}</AuthContainer>
    </div>
  );
}

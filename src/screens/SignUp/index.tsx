import React, { useState } from "react";
import styles from "./style.module.css";
import { useNavigate, useSearchParams } from "react-router-dom";
import AuthContainer from "../../containers/AuthContainer";
import StartPage from "../../screens/StartPage";
import { SignUpForm as Vendor } from "../../forms/AuthForms/Vendor";
import {
  SignUpForm as Customer,
  SignUpFormValues,
} from "../../forms/AuthForms/Customer";
import { RenderPageProps } from "../../t/shared";
import Button from "../../Components/Button";
import Modal from "../../Components/Modals";
import { InputTemp } from "../../Components/InputTemp";
import InputLoader from "../../Components/InputLoader";
import Loading from "../../Components/Loading";
import { ToastContainer, toast } from "react-toastify";
import AuthCode from "react-auth-code-input";
import checkSuccess from "../../assets/svg/modalCheck.svg";
import failure from "../../assets/svg/failure.svg";
import "react-toastify/dist/ReactToastify.css";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { customerBaseUrl } from "../../../src/utils/baseUrl";
import { getOtp } from "../../../src/Custom hooks/Hooks";

type ModalNames =
  | "accountUpdate"
  | "personalAccount"
  | "otp"
  | "accountSaved"
  | "accountFailure"
  | null;

interface CreatePayload {
  firstName: string;
  surname: string;
  phoneNumber: string;
  emailAddress: string;
  houseAddress: string;
  state: string;
  bankAccountNumber: string;
  password: string;
  confirmPassword: string;
}

export default function SignUp() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [activeModal, setAM] = useState<ModalNames>(null);

  const [formValues, setFV] = useState<SignUpFormValues | undefined>();

  const [accountLoading, setAccountLoading] = useState(false);
  const [fullAccountName, setFAN] = useState("");
  const [otp, setOtp] = useState({ server: "", client: "" });

  const navigateToSignUp = () => {
    navigate({ pathname: "/signup", search: "type=customer" });
    //@ts-ignore
    window.location.reload(false);
  };

  const handleOnChange = (otp: string) => {
    setOtp((state) => ({ server: state.server, client: otp }));
  };

  const payload = {
    firstName: formValues?.firstName,
    surname: formValues?.lastName,
    phoneNumber: formValues?.phoneNumber,
    emailAddress: formValues?.email,
    houseAddress: formValues?.houseAddress,
    state: formValues?.stateValue,
    password: formValues?.password,
    confirmPassword: formValues?.confirmPassword,
  };

  const { mutate, isLoading } = useMutation({
    mutationKey: ["create-customer"],
    mutationFn: async (variables: Partial<CreatePayload>) => {
      const { data } = await axios.post<any>(
        `${customerBaseUrl}Account/CreateCustomer`,
        variables
      );
      return data.data;
    },
    onError: () => setAM("accountFailure"),
  });

  const verifyOtp = () => {
    if (otp.server === otp.client) {
      toast.success("successful");
      setAM("accountSaved");
      setTimeout(() => navigate({ pathname: "/login" }), 7000);
    } else {
      toast.error("Wrong OTP, Please Try Again");
    }
  };

  const skipAccount = () => {
    if (!formValues) return;
    mutate(payload, {
      onSuccess: () => {
        setAM("accountSaved");
        setTimeout(() => navigate({ pathname: "/login" }), 7000);
      },
    });
  };

  const resendOtp = async () => {
    setAccountLoading(true);
    if (!formValues) {
      setAccountLoading(false);
      return;
    }
    try {
      const otp = await getOtp({
        email: formValues?.email,
        firstName: formValues?.firstName,
      });
      toast.success("OTP sent to your mail");
      setOtp((state) => ({ client: state.client, server: otp }));
      setAccountLoading(false);
    } catch (err) {
      console.log(err);
      setAccountLoading(false);
    }
  };

  const getFAN = async (accountNumber: string) => {
    setAccountLoading(true);
    try {
      const { data } = await axios.get(
        `${customerBaseUrl}Account/VerifyAccount/${accountNumber}`
      );
      setAccountLoading(false);
      if (data.responseCode === "00") {
        setFAN(data.data.accountName);
      } else {
        toast.error("Account is not active");
        setFAN("");
      }
    } catch (err) {
      setAccountLoading(false);
    }
  };

  const submitBankAccount = (accountNumber: string) => {
    if (!formValues) return;
    mutate(
      { ...payload, bankAccountNumber: accountNumber },
      {
        onSuccess: async (data: any) => {
          if (!formValues) return;
          if (data) {
            setAccountLoading(true);
            try {
              const otp = await getOtp({
                email: formValues.email,
                firstName: formValues?.firstName,
              });
              setOtp((state) => ({ client: state.client, server: otp }));
              setAccountLoading(false);
              toast.success("OTP sent to your mail");
              setAM("otp");
            } catch (err) {
              setAccountLoading(false);
              toast.error("failed to send OTP");
            }
          } else {
            setAM("accountFailure");
          }
        },
      }
    );
  };

  const signupType = searchParams.get("type");

  const renderPage: RenderPageProps = {
    customer: (
      <Customer
        onSubmit={(values) => {
          setFV(values);
          setAM("accountUpdate");
        }}
      />
    ),
    vendor: <Vendor />,
  };

  if (signupType !== "customer" && signupType !== "vendor")
    return <StartPage />;

  return (
    <>
      {isLoading && <Loading />}
      <ToastContainer
        position='bottom-right'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='light'
      />
      <Modal
        variant='default'
        openModal={activeModal === "accountUpdate"}
        closeModal={() => setAM(null)}
        style={{ position: "fixed" }}>
        <div className={styles.accountUpdateModal}>
          <h2>Account Update</h2>
          <p className={styles.paragraph}>
            This is the account number saved on the app for easy payment.
          </p>
          <Button
            variant='primary'
            text='Enter Personal Account Number'
            onClick={() => setAM("personalAccount")}
          />
          <Button variant='outlinePrimary' text='Create a new Account' />
          <Button
            variant='outlinePrimary'
            text='Skip for now, add later'
            onClick={skipAccount}
          />
        </div>
      </Modal>
      <PersonalAccountModal
        loading={accountLoading}
        open={activeModal === "personalAccount"}
        setAM={setAM}
        getFAN={getFAN}
        fullAccountName={fullAccountName}
        onSubmit={submitBankAccount}
      />
      <Modal
        variant='default'
        openModal={activeModal === "otp"}
        closeModal={() => setAM(null)}
        style={{ position: "fixed" }}>
        <div className={styles.accountUpdateModal}>
          <h2>Verify account details</h2>
          <p className={styles.paragraph}>
            Enter the OTP sent to your email or Phone Number
          </p>
          <AuthCode
            allowedCharacters='numeric'
            onChange={handleOnChange}
            length={6}
            inputClassName={styles.otp}
          />
          <Button
            variant='primary'
            text='Submit'
            invalid={otp.client?.length < 6}
            onClick={verifyOtp}
          />
          <p className={styles.otpText}>
            {" "}
            You have not received an OTP,
            <span
              onClick={() => {
                resendOtp();
              }}>
              {" "}
              click here{" "}
            </span>
          </p>
        </div>
      </Modal>
      <Modal
        variant='default'
        openModal={activeModal === "accountSaved"}
        closeModal={() => setAM(null)}
        style={{ position: "fixed" }}>
        <div className={styles.accountUpdateModal}>
          <h2>Account Saved Successfully</h2>
          <img src={checkSuccess} alt='' />
          <p className={styles.paragraph}>Redirecting to Log in ...</p>
        </div>
      </Modal>
      <Modal
        variant='default'
        openModal={activeModal === "accountFailure"}
        closeModal={() => setAM(null)}
        style={{ position: "fixed" }}>
        <div className={styles.accountUpdateModal}>
          <h2>Customer Account Creation Failed</h2>
          <img src={failure} alt='' />
          <p className={styles.paragraph}>
            This activity could not be completed, due to some reasons.
          </p>
          <div className={styles.buttonFlex}>
            <Button
              variant='outlinePrimary'
              text='Cancel'
              onClick={() => {
                navigateToSignUp();
              }}
              width={"47%"}
            />
            <Button
              variant='primary'
              text='Retry'
              invalid={fullAccountName?.length < 1}
              width={"47%"}
              onClick={() => {
                navigateToSignUp();
              }}
            />
          </div>
        </div>
      </Modal>
      <AuthContainer page='register'>{renderPage[signupType]}</AuthContainer>
    </>
  );
}

const PersonalAccountModal = ({
  open,
  setAM,
  onSubmit,
  fullAccountName,
  getFAN,
  loading,
}: {
  open: boolean;
  setAM: (name: ModalNames) => void;
  onSubmit: (accountNumber: string) => void;
  fullAccountName: string;
  getFAN: (accountNumber: string) => void;
  loading: boolean;
}) => {
  const [accountNumber, setAccountNumber] = useState("");

  return (
    <Modal
      variant='default'
      openModal={open}
      closeModal={() => setAM(null)}
      style={{ position: "fixed" }}>
      <div className={styles.accountUpdateModal}>
        <h2>Enter account details</h2>
        <p className={styles.paragraph}>
          Enter your Sterling account details to be saved on your iFuel account.
        </p>
        <InputTemp
          label='ACCOUNT NUMBER'
          placeholder='Enter account number'
          inputType='text'
          name='accountNumber'
          value={accountNumber}
          onChange={(e) => {
            if (e.target.value.length === 10) {
              getFAN(e.target.value);
            }
            setAccountNumber(e.target.value);
          }}
        />
        {loading ? (
          <InputLoader />
        ) : (
          <InputTemp label='ACCOUNT NAME' disabled value={fullAccountName} />
        )}

        <div className={styles.buttonFlex}>
          <Button
            variant='outlinePrimary'
            text='Back'
            onClick={() => setAM("accountUpdate")}
            width={"47%"}
          />
          <Button
            variant='primary'
            text='Submit'
            invalid={fullAccountName ? fullAccountName.length < 1 : true}
            width={"47%"}
            onClick={() => onSubmit(accountNumber)}
          />
        </div>
      </div>
    </Modal>
  );
};

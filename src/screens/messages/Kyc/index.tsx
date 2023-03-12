import Button, { BackBtn } from "../../../Components/Button";
import logo from "../../../assets/logo.svg";
import styles from "./style.module.css";
import PageHeader from "../../../Components/PageHeader";
import UploadImageTemp from "../../../Components/UploadImageTemp";
import { InputTemp, SelectTemp } from "../../../Components/InputTemp";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import Loading from "../../../Components/Loading";
import RedirectError from "../../../screens/vendor/Errors/RedirectError";
import { useMutations } from "../../../lib/vendorApi/vendorAgent";
import { endpoints } from "../../../lib/vendorApi/vendorServiceLinks";
import { Form, Formik } from "formik";
import { authSchema } from "../../../lib/validation/vendor";
import Modal from "../../../Components/Modals";
import PinInput from "react-pin-input";
import Select from "react-select";
import { useMutation } from "@tanstack/react-query";
import axios from "src/lib/axios";
import {
  AccountData,
  AccountDetails,
  AddKycPayload,
} from "../../../types/vendor";
// import { InputActionMeta } from "react-select";
import { Button as ButtonX, Label, Message } from "semantic-ui-react";
import responseCodes from "../../../lib/vendorApi/helper";

const Kyc = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const buttonRef = useRef();

  const [onPageLoad, setOnPageLoad] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [activeModal, setActiveModal] = useState("");
  const [imageUpload, setImageUpload] = useState("");
  const [otp, setOtp] = useState("");
  const [location, setLocation] = useState([]);
  const [accountData, setAccountData] = useState(new AccountData());
  const [accountDetails, setAccountDetails] = useState(new AccountDetails());
  const [resInfo, setResInfo] = useState({
    status: null,
    message: "",
  });
  const safAccountUrl = import.meta.env.VITE_VENDOR_NEWSAFACCOUNT_URL;
  const clearError = () => {
    setResInfo({
      status: null,
      message: "",
    });
  };
  const initialValues = {
    emailAddress: "",
    uploadImage: "",
    representativeName1: "",
    representativeName2: "",
    dateofRegistration: "",
    cacRegistrationNumber: "",
    operationLocation: [],
    accountNumber: "",
    accountName: "",
    bvn: "",
    acctPhoneNumber: "",
  };
  const { mutate: vendorOtpValidate, isLoading } = useMutations();
  const { mutate: bvnVerify, isLoading: isBvnLoading } = useMutations();
  const { mutate: otpRegVerify, isLoading: isOtpRegVerifyLoading } =
    useMutations();
  const { mutate: resendOtpRegVerify, isLoading: isResendOtpRegVerifyLoading } =
    useMutations();
  const { mutate: accountVerify, isLoading: isAccountLoading } = useMutations();
  const { mutate: vendorLocalGovernments, isLoading: isLGLoading } =
    useMutations();
  const { mutate: vendorKycRegister, isLoading: isKycLoading } = useMutations();

  const handleLG = async (values: any) => {
    vendorLocalGovernments(
      {
        key: endpoints.getVendorLGs(values),
        method: "get",
        data: {},
        config: {
          // headers: { "Content-type": "application/json" },
        },
      },
      {
        onSuccess: (res) => {
          if (res?.responseCode === responseCodes.response_00) {
            // vendorLGMutate(res.data)
            setLocation(res.data);
            setOnPageLoad("true");
          } else if (res?.responseCode === responseCodes.response_99) {
            console.log(res);
            setResInfo({
              status: true,
              message: res?.statusText,
            });
            setOnPageLoad("false");
          } else {
            console.log(res);
            setOnPageLoad("false");
          }
          console.log(res);
        },
        onError: (err) => {
          console.log(err);
          setOnPageLoad("true");
          // setOnPageLoad("false");
          setResInfo({
            status: true,
            message: err.data.responseDescription
              ? err.data.responseDescription
              : err?.data.title,
          });
        },
      }
    );
  };

  const handleOtpValidation = async (values: any) => {
    vendorOtpValidate(
      {
        key: endpoints.confirmVendorEmail(values),
        method: "post",
        data: {},
        config: {
          // headers: { "Content-type": "application/json" },
        },
      },
      {
        onSuccess: (res) => {
          if (res?.responseCode === responseCodes.response_00) {
            handleLG(res.data.stateId);
            // handleLG("9f90d961-d8f0-4a30-8018-18d67fb75abe");
            // setOnPageLoad("true");
            setAccountDetails({
              email: res.data.email,
              phoneNumber: res.data.phoneNumber,
            });
          } else if (res?.responseCode === responseCodes.response_99) {
            console.log(res);
            setResInfo({
              status: true,
              message: res?.statusText,
            });
            setOnPageLoad("false");
          } else {
            console.log(res);
            setOnPageLoad("false");
          }
          console.log(res);
        },
        onError: (err) => {
          console.log(err);
          // handleLG("9f90d961-d8f0-4a30-8018-18d67fb75abe");
          // setOnPageLoad("true");
          setOnPageLoad("false");
          setResInfo({
            status: true,
            message: err.data.responseDescription
              ? err.data.responseDescription
              : err?.data.title,
          });
        },
      }
    );
  };

  const resendOTP = async () => {
    resendOtpRegVerify(
      {
        key: endpoints.resendOtp,
        method: "post",
        data: {
          otpRequestId: accountData.otpMetaData.otpRequestId,
        },
        config: {
          headers: { "Content-type": "application/json" },
        },
      },
      {
        onSuccess: (res) => {
          if (res?.responseCode === responseCodes.response_00) {
            // setActiveModal("otp");
            // handleKycRegistration(values);
          }
          // else if (res?.responseCode === responseCodes.response_99) {
          //   setResInfo({
          //     status: true,
          //     message: res?.responseDescription,
          //   });
          //   // setActiveModal("invalid");
          // }
          else {
            // setActiveModal("invalid");
          }
          console.log(res);
        },
        onError: (err) => {
          console.log(err);
          // setResInfo({
          //   status: true,
          //   message: err.data.responseDescription
          //     ? err.data.responseDescription
          //     : err?.data.title,
          // });
        },
      }
    );
  };

  // const handleBvnValidation = async (values: any) => {
  //   bvnVerify(
  //     {
  //       key: endpoints.verifyBvn(values),
  //       method: "post",
  //       data: values,
  //       config: {
  //         // headers: { "Content-type": "application/json" },
  //       },
  //     },
  //     {
  //       onSuccess: (res) => {
  //         if (res?.responseCode === responseCodes.response_00) {
  //           setActiveModal("otp");
  //         } else if (res?.responseCode === responseCodes.response_99) {
  //           setResInfo({
  //             status: true,
  //             message: res?.responseDescription,
  //           });
  //           setActiveModal("invalid");
  //         } else {
  //           setResInfo({
  //             status: true,
  //             message: res?.responseDescription,
  //           });
  //           setActiveModal("invalid");
  //         }
  //         console.log(res);
  //       },
  //       onError: (err) => {
  //         console.log(err);
  //         setResInfo({
  //           status: true,
  //           message: err.data.responseDescription
  //             ? err.data.responseDescription
  //             : err?.data.title,
  //         });
  //       },
  //     }
  //   );
  // };

  const handleRegOtpVerification = async (values: any) => {
    otpRegVerify(
      {
        key: endpoints.verifyOtp,
        method: "post",
        data: {
          otpId: accountData.otpMetaData.otpId,
          otpRequestId: accountData.otpMetaData.otpRequestId,
          otp: otp,
        },
        config: {
          headers: { "Content-type": "application/json" },
        },
      },
      {
        onSuccess: (res) => {
          if (res?.responseCode === responseCodes.response_00) {
            // setActiveModal("otp");
            handleKycRegistration(values);
          } else if (res?.responseCode === responseCodes.response_99) {
            setResInfo({
              status: true,
              message: res?.responseDescription,
            });
            // setActiveModal("invalid");
          } else {
            setResInfo({
              status: true,
              message: res?.responseDescription,
            });
            // setActiveModal("invalid");
          }
          console.log(res);
        },
        onError: (err) => {
          console.log(err);
          setResInfo({
            status: true,
            message: err.data.responseDescription
              ? err.data.responseDescription
              : err?.data.title,
          });
        },
      }
    );
  };

  const handleKycRegistration = async (values: any) => {
    const getLocations = (
      locations: { key: string; label: string; value: string }[]
    ) => {
      var payloadLocation = "";
      for (let i = 0; i < locations.length; i++) {
        if (i === locations.length - 1) {
          payloadLocation = payloadLocation.concat(`${locations[i].value}`);
        } else
          payloadLocation = payloadLocation.concat(`${locations[i].value},`);
      }
      return payloadLocation;
    };

    const payload = {
      ...values,
      operationLocation: getLocations(values.operationLocation),
      uploadImage: imageUpload,
      acctPhoneNumber: accountDetails.phoneNumber,
      emailAddress: accountDetails.email,
    };
    console.log(payload);
    vendorKycRegister(
      {
        key: endpoints.addKyc,
        method: "post",
        data: payload,
        config: {
          headers: { "Content-type": "application/json" },
        },
      },
      {
        onSuccess: (res) => {
          if (res) {
            console.log(res);
            navigate({
              pathname: "/kyc-sign-up-message",
              search: `?user=${btoa(
                accountData.email ? accountData.email : "dummy@gmail.com"
              )}`,
            });
          }
          // else if (res) {
          //   console.log(res);
          //   setResInfo({
          //     status: true,
          //     message: res?.statusText,
          //   });
          //   setOnPageLoad("false");
          // } else {
          //   console.log(res);
          // }
          // console.log(res);
        },
        onError: (err) => {
          console.log(err);
          setResInfo({
            status: true,
            message: err.data.responseDescription
              ? err.data.responseDescription
              : err?.data.title,
          });
        },
      }
    );
  };

  const handleAccountVerification = async (values: AddKycPayload) => {
    clearError();
    accountVerify(
      {
        key: endpoints.verifyAccount(values.accountNumber),
        method: "get",
        data: {},
        config: {
          // headers: { "Content-type": "application/json" },
        },
      },
      {
        onSuccess: (res) => {
          if (res?.responseCode === responseCodes.response_00) {
            // handleKycRegistration({...values,acctPhoneNumber:res.data.phoneNumber});
            setAccountData(res.data);
            setActiveModal("otp");
          } else if (res?.responseCode === responseCodes.response_99) {
            setResInfo({
              status: true,
              message: res?.responseDescription,
            });
            setActiveModal("wrongAccount");
          } else {
            setResInfo({
              status: true,
              message: res?.responseDescription,
            });
            setActiveModal("wrongAccount");
          }
          console.log(res);
        },
        onError: (err) => {
          console.log(err);
          setResInfo({
            status: true,
            message: err.data.responseDescription
              ? err.data.responseDescription
              : err?.data.title,
          });
          setActiveModal("");
        },
      }
    );
  };
  const otpRequestObject = () => {
    const RequestId = searchParams.get("RequestId");
    // var otp = searchParams.get("otp");
    // var otpId = searchParams.get("otpId");

    return RequestId;
  };
  const imageHandler = (e: any) => {
    console.log(e);
    try {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setImageUpload(reader.result!.toString().split(",")[1]);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    } catch {
      console.log("none");
      setImageUpload("none");
    }
  };
  const locations = [
    { value: "Maitama, Abuja", label: "Maitama, Abuja" },
    { value: "Ikeja, Lagos", label: "Ikeja, Lagos" },
    { value: "Oluyole, Ibadan", label: "Oluyole, Ibada" },
  ];
  useEffect(() => {
    if (!onPageLoad) {
      setOnPageLoad("loading");
      // console.log(onPageLoad);

      handleOtpValidation(otpRequestObject());
    }
  }, []);

  if (onPageLoad === "loading") return <Loading />;
  if (onPageLoad === "false") return <RedirectError />;
  return (
    <>
      {(isKycLoading || isOtpRegVerifyLoading || isAccountLoading) && (
        <Loading />
      )}
      <div className={styles.header}>
        <img src={logo} alt="logo" onClick={() => navigate("/")} />
      </div>
      <div className={styles.container}>
        <BackBtn />
        <h3 className={styles.headerText}>KYC</h3>
        <Formik
          initialValues={initialValues}
          validationSchema={authSchema.kyc}
          onSubmit={handleAccountVerification}
        >
          {({
            dirty,
            handleSubmit,
            getFieldProps,
            errors,
            isValid,
            isSubmitting,
            setSubmitting,
            setFieldValue,
            values,
          }) => (
            <Form onSubmit={handleSubmit}>
              <div className="flex-lg w-full gap-50">
                {activeModal === "otp" && (
                  <Modal
                    variant="unstyled"
                    style={{ position: "fixed", zIndex: "2" }}
                    openModal={true}
                    closeModal={() => setActiveModal("")}
                  >
                    <div className={styles.requestOtp}>
                      <h2>Verify your BVN</h2>
                      {/* <h3>0123456789 - Beatrice Bimpe</h3> */}
                      <p>Enter the OTP sent to your email or Phone Number</p>
                      <PinInput
                        autoSelect={true}
                        length={6}
                        initialValue=""
                        onChange={(x) => setOtp(x)}
                      />
                      {resInfo.status && (
                        <Message
                          negative
                          style={{ maxWidth: "300px", marginBottom: "0px" }}
                        >
                          <Message.Header></Message.Header>
                          <p style={{ fontSize: "14px" }}>{resInfo.message}</p>
                        </Message>
                      )}
                      <div className={styles.btnOtpModal}>
                        <Button
                          variant="primary"
                          text="Submit"
                          type="button"
                          onClick={() => {
                            handleRegOtpVerification(values);
                            // setActiveModal("");
                            clearError();
                          }}
                        />
                      </div>
                      <p>
                        You have not received an OTP?,{" "}
                        {isResendOtpRegVerifyLoading ? (
                          <div
                            className="ui active centered inline loader"
                            // style={{ marginTop: "20px" }}
                          ></div>
                        ) : (
                          <span className={styles.textlink} onClick={resendOTP}>
                            click here
                          </span>
                        )}
                      </p>
                    </div>
                  </Modal>
                )}
                {activeModal === "wrongAccount" && (
                  <Modal
                    variant="unstyled"
                    style={{ position: "fixed" }}
                    openModal={true}
                    closeModal={() => setActiveModal("")}
                  >
                    <div className={styles.requestOtp}>
                      <h2>Wrong account type</h2>
                      <p>
                        The account details you have added is a non SAF account,
                        and can not be used
                      </p>
                      <p>Click to create a SAF account now</p>
                      <div className={styles.btns}>
                        <Button
                          type="button"
                          text="Back"
                          width="39%"
                          onClick={() => setActiveModal("")}
                        />
                        <Button
                          variant="primary"
                          text="Create SAF account"
                          type="button"
                          width="55%"
                          onClick={() => window.open(safAccountUrl)}
                        />
                      </div>
                    </div>
                  </Modal>
                )}
                {/* {activeModal === "invalid" && (
                  <Modal
                    variant="unstyled"
                    style={{ position: "fixed" }}
                    openModal={true}
                    closeModal={() => setActiveModal("")}
                  >
                    <div className={styles.requestOtp}>
                      <h2>Invalid Account Details</h2>
                      <p>The account details you have added is invalid</p>
                      <div className={styles.btnOtpModal}>
                        <Button
                          type="button"
                          text="Cancel"
                          // width="39%"
                          onClick={() => setActiveModal("")}
                        />
                      </div>
                    </div>
                  </Modal>
                )} */}
                <UploadImageTemp
                  src={
                    imageUpload && imageUpload !== "none"
                      ? `data:image/jpeg;base64,${imageUpload}`
                      : ""
                  }
                  onChange={(e) => imageHandler(e)}
                  btnText="Add Company Logo"
                />
                {imageUpload === "none" && (
                  <Message negative>
                    <Message.Header></Message.Header>
                    <p>Please Upload Company Logo</p>
                  </Message>
                )}
                <div className={styles.inputSection}>
                  <div className="input-flex-btwn">
                    <InputTemp
                      marginRight
                      label="REPRESENTATIVE -1 NAME"
                      placeholder="Enter Representative 1 Name"
                      name="representativeName1"
                      {...getFieldProps("representativeName1")}
                    />
                    <InputTemp
                      marginLeft
                      label="REPRESENTATIVE -2 NAME"
                      placeholder="Enter Representative 2 Name"
                      name="representativeName2"
                      {...getFieldProps("representativeName2")}
                    />
                  </div>
                  <div className="input-flex-btwn">
                    <InputTemp
                      inputType={"date"}
                      marginRight
                      label="DATE OF REGISTRATION"
                      placeholder="23/02/1997"
                      name="dateofRegistration"
                      {...getFieldProps("dateofRegistration")}
                    />
                    <InputTemp
                      marginLeft
                      label="CAC REGISTRATION NUMBER"
                      placeholder="Enter CAC Registration Number"
                      name="cacRegistrationNumber"
                      {...getFieldProps("cacRegistrationNumber")}
                    />
                  </div>
                  {isLGLoading ? (
                    <div
                      className="ui active centered inline loader"
                      style={{ marginTop: "20px" }}
                    ></div>
                  ) : (
                    <SelectTemp
                      label="OPERATION LOCATIONS"
                      placeholder="Select Locations..."
                      value={values.operationLocation}
                      name="operationLocation"
                      options={location
                        .sort(function (x, y) {
                          let a = x.text.toUpperCase(),
                            b = y.text.toUpperCase();
                          return a === b ? 0 : a > b ? 1 : -1;
                        })
                        .map((lg, index) => ({
                          key: index.toString(),
                          label: lg.text,
                          value: lg.text,
                        }))}
                      closeMenuOnSelect={false}
                      isMulti={true}
                      // defaultValue={locations[0]}
                      onValueChange={(e) => {
                        setFieldValue("operationLocation", e);
                      }}
                      // {...getFieldProps("operationLocation")}
                    />
                  )}
                  <div className="input-flex-btwn">
                    <InputTemp
                      marginRight
                      label="ACCOUNT NUMBER"
                      placeholder="Enter Account Number"
                      name="accountNumber"
                      {...getFieldProps("accountNumber")}
                    />
                    <InputTemp
                      marginLeft
                      label="ACCOUNT NAME"
                      placeholder="Enter Account Name"
                      name="accountName"
                      {...getFieldProps("accountName")}
                    />
                  </div>
                  <p className={styles.infoText}>
                    Enter your Sterling Alternative finance account number. Dont
                    have one?{" "}
                    <span
                      className={styles.textlink}
                      onClick={() => window.open(safAccountUrl)}
                    >
                      Click here
                    </span>
                  </p>
                  <InputTemp
                    label="BVN"
                    placeholder="Enter bvn"
                    name="bvn"
                    {...getFieldProps("bvn")}
                  />
                  <div className={styles.btns}>
                    <Button
                      type="button"
                      invalid={isKycLoading}
                      text="Cancel"
                      width="39%"
                    />
                    <Button
                      text="Sign up"
                      type="submit"
                      variant="primary"
                      width="57%"
                      invalid={
                        !dirty ||
                        !isValid ||
                        !imageUpload ||
                        imageUpload === "none"
                      }
                      // onClick={() => setActiveModal("open")}
                    />
                    {/* <ButtonX
                      className="ui green fluid"
                      style={{ width: "57%" }}
                      disabled={
                        !dirty ||
                        !isValid ||
                        !imageUpload ||
                        imageUpload === "none"
                      }
                      loading={isKycLoading}
                      // onClick={() => {
                      //   handleAccountVerification(values);
                      //   // setActiveModal("open");
                      // }}
                      type="button"
                      // ref={buttonRef}
                    >
                      Sign Up
                    </ButtonX> */}
                  </div>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default Kyc;

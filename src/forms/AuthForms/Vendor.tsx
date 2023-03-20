import styles from "./style.module.css";
import emoji from "../../assets/svg/emoji.svg";
import { useNavigate } from "react-router-dom";
// import { states } from "../../utils/state";
import useMediaQuery from "../../Custom hooks/useMediaQuery";
// import Button from "../../Components/Button";
import Checkbox from "../../Components/Checkbox";
import { InputTemp, SelectTemp } from "../../Components/InputTemp";
import { ErrorMessage, Formik, Form } from "formik";
import { ReactComponent as HidePwd } from "../../assets/svg/hide.svg";
import { ReactComponent as ShowPwd } from "../../assets/svg/show.svg";
import Loading from "../../Components/Loading";
import { authSchema } from "../../lib/validation/vendor";
import { useMutation } from "@tanstack/react-query";
import axios from "../../lib/axios";
import { useEffect, useState } from "react";
import { Button as ButtonX, Label, Message } from "semantic-ui-react";
import { AxiosResponse } from "axios";
import { useMutations } from "../../../src/lib/vendorApi/vendorAgent";
import { endpoints } from "../../../src/lib/vendorApi/vendorServiceLinks";
import Button from "../../../src/Components/Button";

interface LoginValues {
  email: string;
  password: string;
}

interface SignUpDetails {
  email: string;
}
const baseUrl = import.meta.env.VITE_VENDOR_API_URL;

export const LoginForm = () => {
  const navigate = useNavigate();
  const [showPwd, setShowPwd] = useState(false);
  const [rP, setRP] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resInfo, setResInfo] = useState({
    status: null,
    message: "",
  });

  const navigateToForgotPassword = () => {
    navigate({ pathname: "/vendor/forgot-password" });
  };

  const navigateToSignup = () => {
    navigate({ pathname: "/signup", search: "type=vendor" });
  };

  const initialValues = { emailAddress: "", password: "" };

  const { mutate, error } = useMutation({
    mutationFn: async (request) => axios.post("Account/Login", request),
    onError: (error: any) => {
      console.log(error.response.data.responseDescription);
      setLoading(false);
      setResInfo({
        status: false,
        message: `${error.response.data.responseDescription}`,
      });
    },
    onSuccess: ({ data }) => {
      console.log(data);
      setTimeout(() => {
        setLoading(false);
        navigate("/vendor/dashboard");
      }, 3000);
    },
  });

  const handleLogin = async (values: any) => {
    setLoading(true);
    mutate(values);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={authSchema.login}
      onSubmit={handleLogin}>
      {({
        dirty,
        handleSubmit,
        getFieldProps,
        errors,
        isValid,
        isSubmitting,
        setSubmitting,
        values,
      }) => (
        <Form onSubmit={handleSubmit}>
          {loading && <Loading />}
          <InputTemp
            mode='light'
            label='EMAIL ADDRESS'
            inputType={"email"}
            placeholder='email@host.co..'
            {...getFieldProps("emailAddress")}
            name='emailAddress'
          />
          <ErrorMessage
            name={"emailAddress"}
            render={(error) => <Label basic color='red' content={error} />}
          />
          <InputTemp
            visibilityPadding
            label='PASSWORD'
            placeholder='Enter Password'
            inputType={showPwd ? "text" : "password"}
            {...getFieldProps("password")}>
            <i
              className={styles.btnVisibility}
              onClick={() => setShowPwd((state) => !state)}>
              {showPwd ? <ShowPwd /> : <HidePwd />}
            </i>
          </InputTemp>
          <ErrorMessage
            name={"password"}
            render={(error) => <Label basic color='red' content={error} />}
          />
          <div className={styles.forgotPassword}>
            <span onClick={navigateToForgotPassword} className={styles.forgot}>
              Forgot Password
            </span>
          </div>
          <div className={styles.rememberMe}>
            <Checkbox
              checked={rP}
              toggleChecked={() => setRP((state) => !state)}
            />
            <p>Remember me</p>
          </div>
          <div className={styles.footer}>
            {/* <Button
              text={"Log in"}
              variant="primary"
              invalid={!dirty}
              type="submit"
            /> */}

            <Button
              text={"Log in"}
              variant='primary'
              invalid={loading || !dirty || !isValid}
              type='submit'
            />
            <div className={styles.signUp}>
              Don’t have an account?{" "}
              <span onClick={navigateToSignup}>Sign up</span>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export const SignUpForm = () => {
  const navigate = useNavigate();
  const matches = useMediaQuery("(min-width: 800px)");
  const [pV, setPV] = useState(false);
  const [cPV, setCPV] = useState(false);
  const [states, setStates] = useState([]);
  const [selectedState, setSelectedState] = useState({});
  const [resInfo, setResInfo] = useState({
    status: null,
    message: "",
  });

  const clearError = () => {
    setResInfo({
      status: null,
      message: "",
    });
  };

  const [phase, setPhase] = useState("first");

  const { mutate: vendorRegisterMutate, isLoading } = useMutations();

  const navigateToLogin = () => {
    navigate({ pathname: "/vendor/login" });
  };

  const initialValues = {
    CompanyName: "",
    PhoneNumber: "",
    EmailAddress: "",
    CompanyAddress: "",
    StateId: {},
    Password: "",
    ConfirmPassword: "",
    acceptTAC: false,
  };

  const handleRegister = async (values: any) => {
    const payload = {
      CompanyAddress: values.CompanyAddress,
      CompanyName: values.CompanyName,
      ConfirmPassword: values.ConfirmPassword,
      EmailAddress: values.EmailAddress,
      Password: values.Password,
      PhoneNumber: values.PhoneNumber,
      StateId: values.StateId.value,
    };

    vendorRegisterMutate(
      {
        key: endpoints.vendorRegistration,
        method: "post",
        data: payload,
        config: {
          headers: { "Content-type": "multipart/form-data" },
        },
      },
      {
        onSuccess: (res) => {
          if (res) {
            console.log(res);
            // navigate({ pathname: "/sign-up-message" });
            navigate({
              pathname: "/sign-up-message",
              search: `?user=${btoa(payload.EmailAddress)}`,
            });
            // setPaymentItems([res?.data.paymentItemList]);
          } else if (res) {
            console.log(res);
            setResInfo({
              status: true,
              message: res?.statusText,
            });
          } else {
            console.log(res);
          }
          // console.log(res);
          //it comes as array or obj

          // dispatch(logIn({name:"martins",email:"talk2mat2"}))
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

  // console.log(baseUrl);
  // const {
  //   mutate: vendorRegisterMutate,
  //   error,
  //   isLoading,
  // } = useMutation({
  //   mutationFn: async () => axios.postForm(`${baseUrl}/Account/CreateVendor`),
  //   onError: (error) => {
  //     setResInfo({ status: true, message: `${error}` });
  //     console.log(error);
  //     // return error
  //     // navigate({ pathname: "/sign-up-message" });
  //   },
  //   onSuccess: ({ data }) => {
  //     navigate({ pathname: "/sign-up-message" });
  //   },
  // });

  const {
    mutate: vendorStatesMutate,
    error: stateError,
    isLoading: stateIsLoading,
  } = useMutation({
    mutationFn: async () => axios.get(`${baseUrl}/Account/GetState`),
    onError: (error) => {},
    onSuccess: ({ data }) => {
      setStates(data.data);
    },
  });

  // const handleRegister = (values: any) => {
  //   const payload = { ...values, StateId: values.StateId.value };
  //   console.log(payload);
  //   vendorRegisterMutate(payload);
  // };

  useEffect(() => {
    if (states.length === 0) {
      vendorStatesMutate();
    }
  }, [vendorStatesMutate, states]);
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={authSchema.register}
      onSubmit={handleRegister}>
      {({
        dirty,
        handleSubmit,
        getFieldProps,
        values,
        isValid,
        isSubmitting,
        errors,
        setErrors,
        touched,
        setFieldValue,
      }) => (
        <Form onSubmit={handleSubmit}>
          {isLoading && <Loading />}
          {matches && (
            <>
              <InputTemp
                mode='light'
                label='COMPANY NAME'
                placeholder='Enter name'
                inputType='text'
                name='CompanyName'
                {...getFieldProps("CompanyName")}
              />
              <ErrorMessage
                name={"CompanyName"}
                render={(error) => <Label basic color='red' content={error} />}
              />

              <div className={styles.flexForm}>
                <div>
                  <InputTemp
                    mode='light'
                    label='PHONE NUMBER'
                    marginRight
                    placeholder='+234  708 ...'
                    inputType='tel'
                    name='PhoneNumber'
                    {...getFieldProps("PhoneNumber")}
                  />
                  <ErrorMessage
                    name={"PhoneNumber"}
                    render={(error) => (
                      <Label basic color='red' content={error} />
                    )}
                  />
                </div>
                <div>
                  <InputTemp
                    mode='light'
                    label='EMAIL ADDRESS'
                    // marginLeft
                    placeholder='email@host.co.. '
                    inputType='email'
                    name='EmailAddress'
                    // {...getFieldProps("EmailAddress")}
                    onChange={(e) => {
                      clearError();
                      setFieldValue("EmailAddress", e.target.value);
                    }}
                  />
                  <ErrorMessage
                    name={"EmailAddress"}
                    render={(error) => (
                      <Label basic color='red' content={error} />
                    )}
                  />
                </div>
              </div>

              <InputTemp
                mode='light'
                label='COMPANY ADDRESS'
                placeholder='Enter address'
                name='CompanyAddress'
                {...getFieldProps("CompanyAddress")}
              />
              <ErrorMessage
                name={"CompanyAddress"}
                render={(error) => <Label basic color='red' content={error} />}
              />

              {stateIsLoading ? (
                <div
                  className='ui active centered inline loader'
                  style={{ marginTop: "20px" }}></div>
              ) : (
                <SelectTemp
                  mode='light'
                  options={states
                    .sort(function (x, y) {
                      let a = x.text.toUpperCase(),
                        b = y.text.toUpperCase();
                      return a === b ? 0 : a > b ? 1 : -1;
                    })
                    .map((state, index) => ({
                      key: index,
                      label: state.text,
                      value: state.value,
                    }))}
                  label='SELECT STATE'
                  value={selectedState}
                  name='StateId'
                  onValueChange={(e) => {
                    setFieldValue("StateId", e);
                    setSelectedState(e);
                    console.log(e);
                  }}
                />
              )}
              <ErrorMessage
                name={"StateId"}
                render={(error) => <Label basic color='red' content={error} />}
              />

              <InputTemp
                mode='light'
                visibilityPadding
                label='PASSWORD'
                placeholder='Enter Preferred Password'
                inputType={pV ? "text" : "password"}
                name='Password'
                {...getFieldProps("Password")}>
                <i
                  className={styles.btnVisibility}
                  onClick={() => setPV((state) => !state)}>
                  {pV ? <ShowPwd /> : <HidePwd />}
                </i>
              </InputTemp>
              <ErrorMessage
                name={"Password"}
                render={(error) => <Label basic color='red' content={error} />}
              />

              <InputTemp
                mode='light'
                visibilityPadding
                label='RECONFIRM PASSWORD'
                inputType={cPV ? "text" : "password"}
                placeholder='Enter Preferred Password'
                name='ConfirmPassword'
                {...getFieldProps("ConfirmPassword")}>
                <i
                  onClick={() => setCPV((state) => !state)}
                  className={styles.btnVisibility}>
                  {cPV ? <ShowPwd /> : <HidePwd />}
                </i>
              </InputTemp>
              <ErrorMessage
                name={"ConfirmPassword"}
                render={(error) => <Label basic color='red' content={error} />}
              />
              <div className={styles.rememberMe}>
                <Checkbox
                  checked={values.acceptTAC}
                  toggleChecked={() => {
                    setFieldValue("acceptTAC", !values.acceptTAC);
                  }}
                />
                <p>
                  I accept the <span>Terms and Conditions</span>
                </p>
              </div>
              {/* <ErrorMessage
                name={"acceptTAC"}
                render={(error) => <Label basic color="red" content={error} />}
              /> */}

              <div className={styles.footer}>
                {/* <Button
                  variant="primary"
                  text={"Register"}
                  type="submit"
                  invalid={!dirty}
                /> */}
                {resInfo.status && touched && !isLoading && (
                  <Message negative>
                    <Message.Header></Message.Header>
                    <p>{resInfo.message}</p>
                  </Message>
                )}

                <ButtonX
                  className='ui green fluid'
                  type='submit'
                  style={{ height: "48px" }}
                  disabled={
                    isSubmitting || !dirty || !isValid || !values.acceptTAC
                  }
                  loading={isLoading}>
                  Register
                </ButtonX>
                <p style={{ marginTop: "10px" }}>
                  <span className={styles.signUp}>
                    Already have an account?{" "}
                    <span onClick={navigateToLogin}>Log in</span>
                  </span>
                </p>
              </div>
            </>
          )}
          {/* mobile */}
          <>
            {phase === "first" && !matches ? (
              <>
                <div
                // className={styles.flexForm}
                >
                  <InputTemp
                    mode='light'
                    label='COMPANY NAME'
                    placeholder='Company Name'
                    inputType='text'
                    name='CompanyName'
                    marginRightSm
                    {...getFieldProps("CompanyName")}
                  />
                  <ErrorMessage
                    name={"CompanyName"}
                    render={(error) => (
                      <Label basic color='red' content={error} />
                    )}
                  />
                  {/* <InputTemp
                    mode="light"
                    label="SURNAME"
                    placeholder="Last name"
                    inputType="text"
                    name="lastName"
                    marginLeftSm
                  /> */}
                </div>
                <InputTemp
                  mode='light'
                  label='PHONE NUMBER'
                  placeholder='+234  708 ...'
                  inputType='tel'
                  name='PhoneNumber'
                  {...getFieldProps("PhoneNumber")}
                />
                <InputTemp
                  mode='light'
                  label='EMAIL ADDRESS'
                  placeholder='email@host.co.. '
                  inputType='email'
                  name='EmailAddress'
                  // {...getFieldProps("EmailAddress")}
                  onChange={(e) => {
                    clearError();
                    setFieldValue("EmailAddress", e.target.value);
                  }}
                />
                <div className={styles.buttonContainer}>
                  {/* <Button
                    text="Next"
                    type="button"
                    variant="primary"
                    onClick={() => setPhase("second")}
                  /> */}
                  <ButtonX
                    className='ui green fluid'
                    style={{ height: "48px" }}
                    disabled={
                      values.CompanyName.length < 2 ||
                      values.PhoneNumber.length < 9 ||
                      values.PhoneNumber.length > 14 ||
                      !values.EmailAddress ||
                      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(
                        values.EmailAddress
                      )
                    }
                    loading={isLoading}
                    onClick={() => setPhase("second")}>
                    Next
                  </ButtonX>
                </div>
              </>
            ) : null}
            {/* mobile second screen */}
            {phase === "second" && !matches ? (
              <>
                <div>
                  {!isLoading && (
                    <span onClick={() => setPhase("first")}>{"< Back"}</span>
                  )}
                </div>
                <InputTemp
                  mode='light'
                  label='COMPANY ADDRESS'
                  placeholder='Enter address'
                  inputType='text'
                  name='CompanyAddress'
                  {...getFieldProps("CompanyAddress")}
                />
                {/* <div className={styles.formHolder}>
                  <label>SELECT STATE</label>
                  <select value={selectState} onChange={handleStateChange}>
                    <option value="">Select state</option>
                    {states.map((state) => {
                      return (
                        <option key={state.code} value={state.name}>
                          {state.name}
                        </option>
                      );
                    })}
                  </select>
                </div> */}
                {stateIsLoading ? (
                  <div
                    className='ui active centered inline loader'
                    style={{ marginTop: "20px" }}></div>
                ) : (
                  <SelectTemp
                    mode='light'
                    options={states
                      .sort(function (x, y) {
                        let a = x.text.toUpperCase(),
                          b = y.text.toUpperCase();
                        return a === b ? 0 : a > b ? 1 : -1;
                      })
                      .map((state) => ({
                        label: state.text,
                        value: state.value,
                      }))}
                    label='SELECT STATE'
                    value={selectedState}
                    name='StateId'
                    onValueChange={(e) => {
                      setFieldValue("StateId", e);
                      setSelectedState(e);
                    }}
                  />
                )}
                <ErrorMessage
                  name={"StateId"}
                  render={(error) => (
                    <Label basic color='red' content={error} />
                  )}
                />
                <InputTemp
                  mode='light'
                  visibilityPadding
                  label='PASSWORD'
                  placeholder='Enter Preferred Password'
                  inputType={pV ? "text" : "password"}
                  name={"Password"}
                  {...getFieldProps("Password")}>
                  <i
                    className={styles.btnVisibility}
                    onClick={() => setPV((state) => !state)}>
                    {pV ? <ShowPwd /> : <HidePwd />}
                  </i>
                </InputTemp>

                <InputTemp
                  mode='light'
                  visibilityPadding
                  label='RECONFIRM PASSWORD'
                  inputType={cPV ? "text" : "password"}
                  placeholder='Enter Preferred Password'
                  name={"ConfirmPassword"}
                  {...getFieldProps("ConfirmPassword")}>
                  <i
                    onClick={() => setCPV((state) => !state)}
                    className={styles.btnVisibility}>
                    {pV ? <ShowPwd /> : <HidePwd />}
                  </i>
                </InputTemp>

                <div className={styles.rememberMe}>
                  <Checkbox
                    checked={values.acceptTAC}
                    toggleChecked={() => {
                      setFieldValue("acceptTAC", !values.acceptTAC);
                    }}
                  />
                  <p>
                    I accept the <span>Terms and Conditions</span>
                  </p>
                </div>
                <div className={styles.footer}>
                  {/* <Button text="Register" type="submit" variant="primary" /> */}
                  {resInfo.status && touched && !isLoading && (
                    <Message negative>
                      <Message.Header></Message.Header>
                      <p>{resInfo.message}</p>
                    </Message>
                  )}
                  <ButtonX
                    className='ui green fluid'
                    style={{ height: "48px" }}
                    disabled={isLoading || !dirty || !isValid}
                    loading={isLoading}>
                    Register
                  </ButtonX>
                  <p>
                    <div className={styles.signUp}>
                      Already have an account?{" "}
                      <span onClick={navigateToLogin}>Log in</span>
                    </div>
                  </p>
                </div>
              </>
            ) : null}
          </>
        </Form>
      )}
    </Formik>
  );
};

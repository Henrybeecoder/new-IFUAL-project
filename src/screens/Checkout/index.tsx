import React, { useState, useEffect, useContext } from "react";
import styles from "./style.module.css";
import LayoutCustomer from "../../containers/LayoutCustomer";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import OrderDetailsForm from "../../Components/OrderDetailsForm";
import { SvgArrowback } from "../../assets/Svgs";
import Button from "../../Components/Button";
import Modal from "../../Components/Modals";
import PinInput from "react-pin-input";
import checkSuccess from "../../assets/svg/modalCheck.svg";
import Loading from "../../Components/Loading";
import { customerBaseUrl } from "../../utils/baseUrl";
import axios from "axios";
import { useUser } from "../../../src/Custom hooks/Hooks";
import { EditBtn } from "../../../src/Components/PageHeader";
import EmptyStates from "../../../src/containers/EmptyStates";
import useMediaQuery from "../../../src/Custom hooks/useMediaQuery";
import { toast } from "react-toastify";
import { PayWAccountPayload, usePPInitialValues } from "./types";
import { useFormik } from "formik";
import { Context } from "../../../src/utils/context";

const Checkout = () => {
  const matches = useMediaQuery("(min-width: 800px)");
  let params = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const user = useUser();

  const [activeModal, setActiveModal] = useState<string | null>(null);

  const [orderSuccessful, setOrderSuccessful] = useState(false);

  const modalState = {
    pwsa: !!(activeModal === "pwsa"),
    pwoa: !!(activeModal === "pwoa"),
    otp: !!(activeModal === "otp"),
    confm: !!(activeModal === "confm"),
  };

  const closeModals = () => setActiveModal(null);

  const [data, setData] = useState<any>();

  useEffect(() => {
    if (!params.id) return;
    if (!user?.token) {
      navigate("/login");
    }
    setLoading(true);
    axios
      .get(`${customerBaseUrl}Product/Product/${params.id}`, {
        headers: { Authorization: `${user?.token}` },
      })
      .then((response) => {
        console.log(response);
        setData(response.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [user?.token, params.id, navigate]);

  const [formOtp, setFormOtp] = useState<string>("");
  const [serverOtp, setServerOtp] = useState<string>("");

  const requestOtp = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `${customerBaseUrl}Account/OtpEmail/${user?.email}/${user?.firstName}`
      );
      setServerOtp(data.data.otp);
      setLoading(false);
      setActiveModal("otp");
    } catch (err) {
      setLoading(false);
    }
  };

  const verifyOtp = async () => {
    setLoading(true);
    if (formOtp !== serverOtp) {
      toast.error("Wrong OTP, Please Try Again");
      return;
    } else {
      setActiveModal("confm");
    }
  };

  const { product } = useContext(Context);
  const initialPPValues = usePPInitialValues({
    deliveryTime: data?.deliveryTime || "6 hours",
    price: data?.unitPrice || "2000",
    productId: data?.productId,
    quantity: "1",
    discountPrice: 0,
    interval: 0,
    productName: data?.title || "product Title",
    total: "0",
    vendorId: data?.vendorId,
    intervalOf: 0,
  });

  const { isValid, submitForm, values, setFieldValue } = useFormik({
    initialValues: product.paymentPayload || initialPPValues,
    onSubmit: () => {},
    enableReinitialize: true,
  });

  const paymentWithAccountPayload: PayWAccountPayload = {
    bankAccount: user.bankAccountNumber,
    data: [values],
  };

  const confirm = async () => {
    setLoading(true);
    try {
      await axios.post(
        `${customerBaseUrl}Product/PaymentwithBankAccount`,
        paymentWithAccountPayload
      );
      setActiveModal(null);
      setOrderSuccessful(true);
      setTimeout(() => {
        setOrderSuccessful(false);
        navigate({ pathname: "/", search: "order=successful" });
      }, 2000);
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && <Loading />}
      <LayoutCustomer>
        <Modal
          openModal={modalState.pwoa}
          closeModal={closeModals}
          variant='unstyled'
          style={{ top: "30px" }}>
          <div className={styles.payWOA}>
            <h3>Pay with other account</h3>
            <p>Enter the OTP sent to your email or Phone Number</p>
            <PinInput
              inputStyle={{
                borderRadius: "5px",
                width: !matches ? "39px" : "50px",
                marginTop: !matches && "10px",
              }}
              autoSelect={true}
              length={6}
              initialValue=''
              onComplete={(value) => setFormOtp(value)}
            />
            <Button
              variant='primary'
              text='Submit'
              width={"100%"}
              onClick={() => {}}
            />
            <div className={styles.btnPWSA}>
              <p>You have not received an OTP, </p>
              <button>click here</button>
            </div>
          </div>
        </Modal>

        <Modal openModal={modalState.pwsa} closeModal={closeModals}>
          <h3>Pay with saved account</h3>
          <h2>{`${user?.bankAccountNumber} - ${user?.name}`}</h2>
          <p>Request for a one-time passcode (OTP)</p>
          <Button
            variant='primary'
            text='Request OTP'
            width={"260px"}
            onClick={requestOtp}
          />
        </Modal>

        <Modal
          variant='unstyled'
          style={{ top: "30px" }}
          openModal={modalState.otp}
          closeModal={closeModals}>
          <div className={styles.requestOtp}>
            <h2>Pay with saved account</h2>
            <h3>{`${user?.bankAccountNumber} - ${user?.name}`}</h3>
            <p>Enter the OTP sent to your email or Phone Number</p>
            <PinInput
              inputStyle={{
                borderRadius: "5px",
                width: !matches ? "39px" : "50px",
                marginTop: !matches && "10px",
              }}
              autoSelect={true}
              length={6}
              initialValue=''
              onComplete={(value) => setFormOtp(value)}
            />
            <div className={styles.btnOtpModal}>
              <Button
                variant='primary'
                text='Submit'
                onClick={verifyOtp}
                invalid={formOtp.length < 5}
              />
              <Button text='Request OTP again' />
            </div>
          </div>
        </Modal>

        <Modal openModal={modalState.confm} closeModal={closeModals}>
          <h3>Confirm</h3>
          <p>
            You are about to pay N34,500 to Sunny Jay & Co. for 100 Ltrs Diesel
          </p>
          <p>Kindly click to confirm</p>
          <div className={"flex-btwn"}>
            <Button text='Cancel' width={"40%"} onClick={confirm} />
            <Button
              variant='primary'
              text='Confirm'
              width={"55%"}
              onClick={confirm}
            />
          </div>
        </Modal>
        <Modal openModal={orderSuccessful}>
          <div className={styles.orderSuccessful}>
            <h2>Order Successful</h2>
            <img alt='success-checkout' src={checkSuccess} />
            <p>Redirecting to home page...</p>
          </div>
        </Modal>

        <button className={styles.btnBack} onClick={() => navigate("/")}>
          <SvgArrowback />
          <h2>Back to Home</h2>
        </button>
        <div className={styles.header}>
          <h2>Checkout</h2>
          {data && <EditBtn />}
        </div>
        {data ? (
          <>
            <EmptyStates cart />
          </>
        ) : (
          <>
            <OrderDetailsForm values={values} onValueChange={setFieldValue} />

            <div className={styles.btns}>
              <Button
                variant='primary'
                text='Pay with Saved Account'
                onClick={async () => {
                  await submitForm();
                  if (isValid) {
                    setActiveModal("pwsa");
                  }
                }}
                type='submit'
                // invalid={!isValid}
              />
              <Button
                text='Pay with Other Account'
                type='submit'
                onClick={async () => {
                  await submitForm();
                  if (isValid) {
                    setActiveModal("pwoa");
                  }
                }}
              />
            </div>
          </>
        )}
      </LayoutCustomer>
    </>
  );
};

export default Checkout;

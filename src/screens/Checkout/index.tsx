import React, { useState, useEffect } from "react";
import styles from "./style.module.css";
import LayoutCustomer from "../../containers/LayoutCustomer";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import OrderDetailsForm from "../../Components/OrderDetailsForm";
import { SvgArrowback, SvgEdit } from "../../assets/Svgs";
import Button from "../../Components/Button";
import Modal from "../../Components/Modals";
import PinInput from "react-pin-input";
import checkSuccess from "../../assets/svg/modalCheck.svg";
import Loading from "../../Components/Loading";
import { customerBaseUrl } from "../../utils/baseUrl";
import axios from "axios";

const Checkout = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "");

  const [activeModal, setActiveModal] = useState<string | null>(null);

  const [orderSuccessful, setOrderSuccessful] = useState(false);

  const backHome = () => navigate("/");

  const confirm = () => {
    setActiveModal(null);
    setOrderSuccessful(true);
    setTimeout(() => {
      setOrderSuccessful(false);
      navigate({ pathname: "/", search: "order=successful" });
    }, 2000);
  };

  const modalState = {
    pWSA: !!(activeModal === "pWSA"),
    otp: !!(activeModal === "otp"),
    confm: !!(activeModal === "confm"),
  };

  const closeModals = () => setActiveModal(null);

  const str = localStorage.getItem("user");
  const newUser = str && JSON.parse(str);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  let params = useParams();

  console.log(params);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${customerBaseUrl}Product/Product`, {
        headers: { Authorization: `${newUser?.token}` },
      })
      .then((response) => {
        console.log(response, "the products");
        setData(response.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [newUser?.token]);

  const selectedProduct = data.find(
    (product) => product.productId === params.id
  );

  console.log(selectedProduct, "This is the selected product");

  const checkout = () => {
    navigate({
      pathname: `/checkout/${selectedProduct.productId}`,
      //   search: `checkout=${selectedProduct.id}`,
    });
  };

  return (
    <>
      {loading && <Loading />}
      <LayoutCustomer>
        <Modal openModal={modalState.pWSA} closeModal={closeModals}>
          <h3>Pay with saved account</h3>
          <h2>{`${newUser.bankAccountNumber} - ${newUser?.name}`}</h2>
          <p>Request for a one-time passcode (OTP)</p>
          <Button
            variant="primary"
            text="Request OTP"
            width={"260px"}
            onClick={() => setActiveModal("otp")}
          />
        </Modal>
        <Modal
          variant="unstyled"
          style={{ top: "30px" }}
          openModal={modalState.otp}
          closeModal={closeModals}
        >
          <div className={styles.requestOtp}>
            <h2>Pay with saved account</h2>
            <h3>{`${newUser.bankAccountNumber} - ${newUser?.name}`}</h3>
            <p>Enter the OTP sent to your email or Phone Number</p>
            <PinInput autoSelect={true} length={6} initialValue="" />
            <div className={styles.btnOtpModal}>
              <Button
                variant="primary"
                text="Submit"
                onClick={() => setActiveModal("confm")}
              />
              <Button text="Request OTP again" />
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
            <Button text="Cancel" width={"40%"} onClick={confirm} />
            <Button
              variant="primary"
              text="Confirm"
              width={"55%"}
              onClick={confirm}
            />
          </div>
        </Modal>
        <Modal openModal={orderSuccessful}>
          <div className={styles.orderSuccessful}>
            <h2>Order Successful</h2>
            <img src={checkSuccess} />
            <p>Redirecting to home page...</p>
          </div>
        </Modal>

        <button className={styles.btnBack} onClick={backHome}>
          <SvgArrowback />
          <h2>Back to Home</h2>
        </button>
        <div className={styles.header}>
          <h2>Checkout</h2>
          <button>
            <p>Edit</p>
            <SvgEdit />
          </button>
        </div>
        <OrderDetailsForm selectedProduct={selectedProduct} />

        <div className={styles.btns}>
          <Button
            variant="primary"
            text="Pay with Saved Account"
            onClick={() => setActiveModal("pWSA")}
          />
          <Button text="Pay with Other Account" />
        </div>
      </LayoutCustomer>
    </>
  );
};

export default Checkout;

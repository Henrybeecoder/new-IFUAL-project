import { useState } from "react";
import styles from "./style.module.css";
import visa from "../../../assets/changePaymentCard/visa.svg";
import mastercard from "../../../assets/changePaymentCard/mastercard.svg";
import verve from "../../../assets/changePaymentCard/verve.svg";
import { InputTemp } from "../../../../src/Components/InputTemp";
import Button from "../../../../src/Components/Button";
import axios from "axios";
import { customerBaseUrl } from "../../../../src/utils/baseUrl";
import { toast } from "react-toastify";
import Modal from "../../../../src/Components/Modals";
import PinInput from "react-pin-input";
import { getUser } from "../../../../src/Custom hooks/Hooks";
import useMediaQuery from "../../../../src/Custom hooks/useMediaQuery";
import Loading from "../../../../src/Components/Loading";

export default function ChangePaymentCard({
  backToProfile,
}: {
  backToProfile: () => void;
}) {
  const [loading, setLoading] = useState(false);
  const user = getUser();

  const matches = useMediaQuery("(min-width: 800px)");

  const [activeModal, setAM] = useState<string | null>(null);
  const [values, setValues] = useState({
    cardNo: "",
    expDate: "",
    cvv: "",
    cardPin: "",
  });

  const [formOtp, setFormOtp] = useState<string>("");
  const [serverOtp, setServerOtp] = useState<string>("");

  const verifyOtp = async () => {
    setLoading(true);
    if (formOtp !== serverOtp) {
      toast.error("Wrong OTP, Please Try Again");
      return;
    } else {
      try {
        // await axios.get(
        //   `${customerBaseUrl}Account/ChangeAccountNumber/${values.accountNo}`
        // );
        // setActiveModal("confm");
      } catch (err) {
        setLoading(false);
      }
    }
  };

  const addCard = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `${customerBaseUrl}Account/OtpEmail/${user?.email}/${user?.firstName}`
      );
      setServerOtp(data.data.otp);
      setLoading(false);
      setAM("otp");
    } catch (err) {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      {loading && <Loading />}
      <Modal
        variant='unstyled'
        style={{ top: "30px" }}
        openModal={activeModal === "otp"}
        closeModal={() => setAM(null)}>
        <div className={styles.requestOtp}>
          <h2>Add Payment Card</h2>
          <p>Enter the OTP sent to your email or Phone Number</p>
          <PinInput
            inputStyle={{
              borderRadius: "5px",
              width: !matches ? "39px" : "50px",
              marginTop: !matches ? "10px" : undefined,
            }}
            autoSelect={true}
            length={6}
            initialValue=''
            onComplete={(value) => setFormOtp(value)}
          />
          <Button
            variant='primary'
            text='Submit'
            onClick={verifyOtp}
            invalid={formOtp.length < 5}
          />
          <div className={styles.retryOtp}>
            <p>You have not received an OTP?</p>
            <button onClick={addCard}>Retry</button>
          </div>
        </div>
      </Modal>
      <h2>Add Payment Card</h2>
      <div className={styles.cardDisplayHolder}>
        <p className={styles.textHolder}>MasterCard, Visa, Verve</p>
        <div className={styles.logoHolder}>
          <img src={visa} alt='visa logo' />
          <img src={mastercard} alt='mastercard logo' />
          <img src={verve} alt='verve logo' />
        </div>
      </div>

      <InputTemp
        label='Card number'
        placeholder='Enter Card Number'
        value={values.cardNo}
        inputStyle={{ letterSpacing: "15px" }}
        inputType='number'
        onChange={(e) =>
          setValues((state) => ({ ...state, cardNo: e.target.value }))
        }
      />

      <div className={styles.inputFlexes}>
        <InputTemp
          label='EXPIRATION DATE'
          placeholder='MM/YY'
          value={values.expDate}
          onChange={(e) =>
            setValues((state) => ({ ...state, expDate: e.target.value }))
          }
        />
        <InputTemp
          label='CVV'
          placeholder='000'
          inputType='number'
          value={values.cvv}
          onChange={(e) =>
            setValues((state) => ({ ...state, cvv: e.target.value }))
          }
        />
        <InputTemp
          label='CARD PIN'
          placeholder='Card PIN'
          inputType='number'
          value={values.cardPin}
          onChange={(e) =>
            setValues((state) => ({ ...state, cardPin: e.target.value }))
          }
        />
      </div>

      <div className='flex-btwn'>
        <Button text='Back' width='35%' onClick={backToProfile} />
        <Button
          text='Add Card'
          width='60%'
          variant='primary'
          invalid={
            values.cardNo.length !== 16 ||
            values.cardPin.length !== 4 ||
            values.cvv.length !== 3 ||
            values.expDate.length !== 5
          }
          onClick={addCard}
        />
      </div>
    </div>
  );
}

import React from "react";
import styles from "./style.module.css";
import visa from "../../../assets/changePaymentCard/visa.svg";
import mastercard from "../../../assets/changePaymentCard/mastercard.svg";
import verve from "../../../assets/changePaymentCard/verve.svg";
import { InputTemp } from "../../../../src/Components/InputTemp";
import Button from "../../../../src/Components/Button";

export default function ChangePaymentCard({
  backToProfile,
}: {
  backToProfile: () => void;
}) {
  return (
    <div className={styles.container}>
      <h2>Add Payment Card</h2>
      <div className={styles.cardDisplayHolder}>
        <p className={styles.textHolder}>MasterCard, Visa, Verve</p>
        <div className={styles.logoHolder}>
          <img src={visa} alt='visa logo' />
          <img src={mastercard} alt='mastercard logo' />
          <img src={verve} alt='verve logo' />
        </div>
      </div>

      <InputTemp label='Card number' />

      <div className={styles.inputFlexes}>
        <InputTemp label='EXPIRATION DATE' placeholder='MM/YY' />
        <InputTemp label='CVV' placeholder='000' />
        <InputTemp label='CARD PIN' placeholder='Card PIN' />
      </div>

      <div className='flex-btwn'>
        <Button text='Back' width='35%' onClick={backToProfile} />
        <Button
          text='Add Card'
          width='60%'
          variant='primary'
          invalid
          onClick={() => {}}
        />
      </div>
    </div>
  );
}

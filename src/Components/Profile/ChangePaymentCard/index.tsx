import React from "react";
import styles from "./style.module.css";
import visa from "../../../assets/changePaymentCard/visa.svg";
import mastercard from "../../../assets/changePaymentCard/mastercard.svg";
import verve from "../../../assets/changePaymentCard/verve.svg";

export default function ChangePaymentCard() {
  return (
    <div>
      <h1>Add Payment Card</h1>
      <div className={styles.cardDisplayHolder}>
        <div className={styles.textHolder}>MasterCard, Visa, Verve</div>
        <div className={styles.logoHolder}>
          <img src={visa} alt="visa logo" />
          <img src={mastercard} alt="mastercard logo" />
          <img src={verve} alt="verve logo" />
        </div>
      </div>
    </div>
  );
}

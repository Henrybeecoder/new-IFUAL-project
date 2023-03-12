import React from "react";
import PrimaryContainer from "../../../containers/PrimaryContainer";
import styles from "./style.module.css";

const SignUpMessage = () => {
  return (
    <PrimaryContainer droplet>
      <div className={styles.container}>
        <p className={styles.message}>
          A mail has been sent to *********@gmail.com to verify the email
          address provided.
        </p>
        <p>
          Kindly ckeck your email and click the link provided to reset your
          password.
        </p>
      </div>
    </PrimaryContainer>
  );
};

export default SignUpMessage;

import React, { ReactNode } from "react";
import PrimaryContainer from "../PrimaryContainer";
import styles from "./style.module.css";
import emoji from "../../assets/svg/emoji.svg";

interface AuthContainerProps {
  page: "login" | "register";
  children?: ReactNode;
}

export default function AuthContainer({ page, children }: AuthContainerProps) {
  return (
    <PrimaryContainer height={`80%`}>
      <div className={styles.flexContainer}>
        <div className={styles.textContainer}>
          {page === "login" ? (
            <p className={styles.login}>LOG IN</p>
          ) : (
            <p className={styles.login}>SIGN UP</p>
          )}
          <h1>No.1 Diesel Platform</h1>
          <p className={styles.subText}>
            {`${
              page === "login" ? "Log in" : "Sign up"
            } to see and compare vendors with the best offering in your
            local market.`}
          </p>
        </div>
        <div className={styles.holder}>
          <div className={styles.formContainer}>{children}</div>
          <img src={emoji} alt='' className={styles.emoji} />
        </div>
      </div>
    </PrimaryContainer>
  );
}

import React, { useState } from "react";
import PrimaryContainer from "../../containers/PrimaryContainer";
import styles from "./style.module.css";
import Button from "../../Components/Button";
import { InputTemp } from "../../Components/InputTemp";
import { useMutation } from "@tanstack/react-query";
import axios from "../../lib/axios";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const [page, setPage] = useState("home");

  const { mutate } = useMutation({
    mutationFn: async () => axios.post(`/Account/VerifyUser/${email}`),
    onSuccess: () => setPage("verified"),
  });
  return (
    <PrimaryContainer droplet height='70%'>
      {page !== "home" ? (
        <div className={styles.message}>
          <p>A password reset mail has been sent to *********@gmail.com</p>
          <p>
            Kindly ckeck your email and click the link provided to reset your
            password.
          </p>
        </div>
      ) : (
        <div className={styles.container}>
          <h3>Forgot Password?</h3>
          <p>Please enter your registered email address</p>
          <InputTemp
            placeholder='email@host.co..'
            name='email'
            inputType='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className='flex-btwn'>
            <Button text={`Back`} width='37%' />
            <Button
              text={`Submit`}
              variant='primary'
              width='58%'
              onClick={() => setPage("verified")}
            />
          </div>
        </div>
      )}
    </PrimaryContainer>
  );
};

export default ForgotPassword;

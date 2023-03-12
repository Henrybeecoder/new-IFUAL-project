import React, { useState } from "react";
import SecondaryContainer from "../../containers/SecondaryContainer";
import styles from "./style.module.css";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Visibility from "@material-ui/icons/Visibility";
import Button from "../../Components/Button";
import { useNavigate } from "react-router-dom";
import Modal from "../../Components/Modals";
import modalCheck from "../../assets/svg/modalCheck.svg";
import { InputTemp } from "../../Components/InputTemp";
import { ReactComponent as HidePwd } from "../../assets/svg/hide.svg";
import { ReactComponent as ShowPwd } from "../../assets/svg/show.svg";
import { useMutation } from "@tanstack/react-query";
import axios from "../../lib/axios";
import { Form, Formik } from "formik";
import { AxiosError } from "axios";

export default function ResetPassword() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [{ pwd, cPwd }, setShowPwd] = useState<{ pwd: boolean; cPwd: boolean }>(
    { pwd: false, cPwd: false }
  );

  const email = "";

  const { mutate } = useMutation<
    any,
    AxiosError,
    { password: string; confirmPassword: string }
  >({
    mutationFn: async (variables) =>
      axios.post("/Account/ForgetPassword", { email, ...variables }),
    onSuccess: () => {
      setOpen(true);
      setTimeout(() => setOpen(false), 3000);
      navigate("login");
    },
  });

  return (
    <SecondaryContainer>
      <Modal openModal={open}>
        <h4>Password Reset Successful</h4>
        <img src={modalCheck} alt='' />
        <p>Redirecting to Log in ...</p>
      </Modal>
      {/* page */}
      <Formik
        initialValues={{ password: "", confirmPassword: "" }}
        onSubmit={(values) => mutate(values)}>
        {({ getFieldProps }) => (
          <Form className={styles.container}>
            <h3>Reset Password?</h3>
            <h3>Enter new password and confirm it</h3>
            <div className={styles.input}>
              <InputTemp
                placeholder='New password'
                {...getFieldProps("password")}>
                <i
                  className={styles.btnVisibility}
                  onClick={() =>
                    setShowPwd((state) => ({
                      pwd: !state.pwd,
                      cPwd: state.cPwd,
                    }))
                  }>
                  {pwd ? <ShowPwd /> : <HidePwd />}
                </i>
              </InputTemp>
              <InputTemp
                placeholder='Confirm password'
                {...getFieldProps("confirmPassword")}>
                <i
                  className={styles.btnVisibility}
                  onClick={() =>
                    setShowPwd((state) => ({
                      pwd: state.pwd,
                      cPwd: !state.cPwd,
                    }))
                  }>
                  {cPwd ? <ShowPwd /> : <HidePwd />}
                </i>
              </InputTemp>
            </div>
            <Button text='Reset Password' variant='primary' type='submit' />
          </Form>
        )}
      </Formik>
    </SecondaryContainer>
  );
}

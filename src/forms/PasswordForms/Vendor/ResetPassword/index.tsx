import React, { useState } from "react";
import styles from "./style.module.css";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Visibility from "@material-ui/icons/Visibility";
import { useNavigate } from "react-router-dom";
import modalCheck from "../../../../assets/svg/modalCheck.svg";
import { ReactComponent as HidePwd } from "../../../../assets/svg/hide.svg";
import { ReactComponent as ShowPwd } from "../../../../assets/svg/show.svg";
import { useMutation } from "@tanstack/react-query";
import { Form, Formik } from "formik";
import { AxiosError } from "axios";
import axios from "../../../../../src/lib/axios";
import SecondaryContainer from "../../../../../src/containers/SecondaryContainer";
import Modal from "../../../../../src/Components/Modals";
import { InputTemp } from "../../../../../src/Components/InputTemp";
import Button from "../../../../../src/Components/Button";

export default function VendorResetPassword() {
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

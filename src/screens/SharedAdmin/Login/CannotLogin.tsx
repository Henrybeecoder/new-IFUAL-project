import styles from "./style.module.css";
import logo from "../../../assets/logo.svg";
import { InputTemp } from "../../../Components/InputTemp";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useMediaQuery from "../../../Custom hooks/useMediaQuery";

const CannotLogin = () => {
  const matches = useMediaQuery("(min-width: 800px)");
  const navigate = useNavigate();

  const [detail, setDetail] = useState("");

  return (
    <div className={styles.container}>
      <div className={styles.logoFlex}>
        <img src={logo} />
      </div>
      <div className={styles.pageContainer}>
        <h3>Can’t log in?</h3>
        <p>Enter your username or email to get help logging back in</p>
        <InputTemp
          label={!matches ? "ENTER USERNAME/EMAIL" : ""}
          inputType='text'
          value={detail}
          placeholder={"Enter detail"}
          onChange={(e) => setDetail(e.target.value)}
        />
        <div className={styles.btns}>
          <button className={styles.btnBack} onClick={() => navigate("/admin")}>
            Back
          </button>
          <button
            className={styles.btnSubmit}
            // disabled={!!(token.length < 5)}
            onClick={() => {
              navigate("/super-admin/dashboard");
            }}>
            Submit
          </button>
        </div>
      </div>
      <div className={styles.footer}>
        <p>2022 iFuel. All rights reserved.</p>
      </div>
    </div>
  );
};

export default CannotLogin;

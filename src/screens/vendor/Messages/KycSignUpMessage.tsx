import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Loading from "../../../Components/Loading";
import PrimaryContainer from "../../../containers/PrimaryContainer";
import NotFound from "../Errors/NotFound";
import styles from "./style.module.css";

const KycSignUpMessage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [onPageLoad, setOnPageLoad] = useState("");
  const [val, setVal] = useState("");
  const checkParams = () => {
    var user = searchParams.get("user");

    try {
      if (user) {
        // Regular expression to check if string is email
        const regexExp =
          /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/gi;
        // String with email address
        const str = atob(user);
        if (regexExp.test(str)) {
          setVal(str);
          setOnPageLoad("true");
        } else {
          setOnPageLoad("false");
        }
      } else setOnPageLoad("false");
    } catch (error) {
      setOnPageLoad("false");
    }
  };
  useEffect(() => {
    if (!onPageLoad) {
      setOnPageLoad("loading");
      // console.log(onPageLoad);
      checkParams();
    }
  }, []);

  if (onPageLoad === "loading") return <Loading />;
  if (onPageLoad === "false") return <NotFound />;

  return (
    <PrimaryContainer droplet>
      <div className={styles.container}>
        <p className={styles.message}>
          Your submission has been received and will be vetted by the iFuel team
          within 72 hours. If approved, a log-in link will be sent to
          {`*********@${val.split("@")[1]}`} to log into your account.
        </p>
        <p>Thank you for registering!</p>
      </div>
    </PrimaryContainer>
  );
};

export default KycSignUpMessage;

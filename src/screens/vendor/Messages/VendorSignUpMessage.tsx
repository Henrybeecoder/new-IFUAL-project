import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Loading from "../../../Components/Loading";
import PrimaryContainer from "../../../containers/PrimaryContainer";
import NotFound from "../Errors/NotFound";
import styles from "./style.module.css";

const VendorSignUpMessage = () => {
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
          A mail has been sent to {`*********@${val.split("@")[1]}`} to verify
          the email address provided.
        </p>
        <p>
          Kindly ckeck your email and click the link provided to reset your
          password.
        </p>
      </div>
    </PrimaryContainer>
  );
};

export default VendorSignUpMessage;

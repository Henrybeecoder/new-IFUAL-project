import React from "react";
import PrimaryContainer from "../../containers/PrimaryContainer";
import styles from "./style.module.css";
import customer from "../../assets/svg/customer.svg";
import vendor from "../../assets/svg/vendor.svg";
import { useSearchParams, useNavigate } from "react-router-dom";

export default function LoginPage() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const toCustomerLogin = () => {
    setSearchParams({ type: "customer" });
    navigate("/login");
  };

  const toVendorLogin = () => {
    setSearchParams({ type: "vendor" });
    navigate("/vendor/login");
  };

  return (
    <PrimaryContainer droplet>
      <div className={styles.startContainer}>
        <h1>Which user type are you?</h1>
        <p className={styles.select}>Please select as adequate</p>
        <div className={styles.pointerFlex}>
          <div className={styles.container} onClick={toCustomerLogin}>
            <img src={customer} alt="" />
            <p>Customer</p>
          </div>

          <div className={styles.container} onClick={toVendorLogin}>
            <img src={vendor} alt="" />
            <p>Vendor</p>
          </div>
        </div>
      </div>
    </PrimaryContainer>
  );
}

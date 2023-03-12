import React, { ReactNode } from "react";
import styles from "./style.module.css";
import logo from "../../assets/logo.svg";
import droplet from "../../assets/svg/droplet.svg";
import { useNavigate } from "react-router-dom";

interface PrimaryContainerProps {
  droplet?: boolean;
  children?: ReactNode;
  height?: string;
}

export default function PrimaryContainer(props: PrimaryContainerProps) {
  const navigate = useNavigate();
  const navigateToHomePage = () => {
    navigate("/");
  };
  return (
    <div className={styles.container}>
      <div
        className={styles.containerPart}
        style={!props.height ? { height: "60%" } : { height: props.height }}>
        <div className={styles.logoContainer}>
          <img src={logo} alt='' onClick={navigateToHomePage} />
        </div>
        {props.children}
      </div>
      {props.droplet && (
        <div className={styles.dropletFlex}>
          <img src={droplet} alt='' />
          <img src={droplet} alt='' />
          <img src={droplet} alt='' />
        </div>
      )}

      <div className={styles.footer}>
        <p>&#169;2022 iFuel. All rights reserved.</p>
      </div>
    </div>
  );
}

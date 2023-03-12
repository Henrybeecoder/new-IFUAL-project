import React from "react";
import logo from "../../assets/logo.svg";
import styles from "./style.module.css";
import droplet from "../../assets/svg/droplet.svg";
import { useNavigate } from "react-router-dom";

export default function SecondaryContainer(props) {
  const navigate = useNavigate();
  const navigateToHomePage = () => {
    navigate("/");
  };
  return (
    <div className={styles.container} style={props.height ? {height: props.height} : {height: "100vh"}}>
      
        <div className={styles.logoContainer}>
          <img src={logo} alt="" onClick={navigateToHomePage} />
        </div>
        {props.children}
      {/* <div className={styles.footer}>
        <p>&#169;2022 iFuel. All rights reserved.</p>
      </div> */}
    </div>
  );
}

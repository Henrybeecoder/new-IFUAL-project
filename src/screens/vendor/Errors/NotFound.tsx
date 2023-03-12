import { useState } from "react";
import { Indicator } from "../../../Components/Countdown";
import PrimaryContainer from "../../../containers/PrimaryContainer";
import styles from "./style.module.css";

const NotFound = () => {
  const [countDown, setCountDown] = useState(true);

  return (
    <PrimaryContainer droplet={!countDown}>
      {countDown && <CountDown />}
      <div className={styles.messageContainer}></div>
    </PrimaryContainer>
  );
};

const CountDown = () => {
  return (
    <div className={styles.container2}>
      <div className={styles.textArea}>
        <p>Oops!</p>
        <h2>Page Not Found</h2>
        {/* <h3>Wed. 24th Aug. 2022</h3> */}
      </div>
    </div>
  );
};

export default NotFound;

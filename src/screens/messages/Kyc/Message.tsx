import { useState } from "react";
import { Indicator } from "../../../Components/Countdown";
import PrimaryContainer from "../../../containers/PrimaryContainer";
import styles from "./style.module.css";

const KycMessage = () => {
  const [countDown, setCountDown] = useState(true);

  return (
    <PrimaryContainer droplet={!countDown}>
      {countDown && <CountDown />}
      <div className={styles.messageContainer}>
        <p>
          Your submission has been received and will be vetted by the iFuel team
          within 72 hours. If approved, a log-in link will be sent to
          *********@gmail.com to log into your account.
        </p>
        <p>Thank you for registering!</p>
      </div>
    </PrimaryContainer>
  );
};

const CountDown = () => {
  return (
    <div className={styles.container2}>
      <div className={styles.textArea}>
        <p>Countdown to</p>
        <h2>ONBOARDING</h2>
        <h3>Wed. 24th Aug. 2022</h3>
      </div>
      <div className={styles.indicatorsFlex}>
        <Indicator mode='light' size='lg' text='Days' value={2} />
        <Indicator mode='light' size='lg' text='Hours' value={12} />
        <Indicator mode='light' size='lg' text='Minutes' value={15} />
        <Indicator mode='light' size='lg' text='seconds' value={45} />
      </div>
    </div>
  );
};

export default KycMessage;

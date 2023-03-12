import PrimaryContainer from "src/containers/PrimaryContainer";
import styles from "./style.module.css";

const Message = () => {
  return (
    <PrimaryContainer droplet>
      <div className={styles.messageContainer}>
        <p>A password reset mail has been sent to *********@gmail.com</p>
        <p>
          Kindly ckeck your email and click the link provided to reset your
          password.
        </p>
      </div>
    </PrimaryContainer>
  );
};

export default Message;

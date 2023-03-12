import { Root, Thumb } from "@radix-ui/react-switch";
import styles from "./style.module.css";

interface SwitchProps {
  defaultChecked?: boolean;
}

const Switch = ({ defaultChecked }: SwitchProps) => {
  return (
    <Root className={styles.SwitchRoot} defaultChecked={defaultChecked}>
      <Thumb className={styles.SwitchThumb} />
    </Root>
  );
};

export default Switch;

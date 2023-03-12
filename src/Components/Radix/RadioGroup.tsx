import { Root, Item, Indicator } from "@radix-ui/react-radio-group";
import styles from "./style.module.css";

interface RadioGroupProps {
  options?: { value: string; label: string }[];
  defaultValue?: string;
  value?: string;
  vertical?: boolean;
  onValueChange?: (value: string) => void;
  className?: string;
}

const RadioGroup = ({
  options,
  defaultValue,
  value,
  vertical,
  onValueChange,
  className,
}: RadioGroupProps) => {
  return (
    <Root
      className={`${styles.RadioGroupRoot} ${vertical && styles.flexColumn}`}
      defaultValue={defaultValue}
      value={value}
      onValueChange={onValueChange}>
      {options?.map((option) => (
        <div className={styles.radioGroupFlex}>
          <Item
            className={styles.RadioGroupItem}
            value={option.value}
            id={option.label}>
            <Indicator className={styles.RadioGroupIndicator} />
          </Item>
          <label htmlFor={option.label} className={className}>
            {option.label}
          </label>
        </div>
      ))}
    </Root>
  );
};

export default RadioGroup;

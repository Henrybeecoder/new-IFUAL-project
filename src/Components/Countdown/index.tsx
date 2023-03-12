import styles from "./style.module.css";

interface IndicatorProps {
  text: string;
  value: string | number;
  mode?: "light" | "dark";
  size?: "md" | "lg";
}

export const Indicator = ({
  text,
  value,
  mode = "dark",
  size = "md",
}: IndicatorProps) => {
  return (
    <div
      className={`${styles.indicator} ${
        mode === "light" ? styles.Ilight : styles.Idark
      } ${size === "lg" ? styles.Ilg : styles.Imd}`}>
      <p>{text}</p>
      <h2>{value}</h2>
    </div>
  );
};

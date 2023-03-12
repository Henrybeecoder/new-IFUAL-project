import styles from "./style.module.css";

export interface CheckboxProps {
  checked?: boolean;
  toggleChecked?: () => void;
}

const Checkbox = ({ checked, toggleChecked }: CheckboxProps) => {
  return (
    <button type='button' className={styles.container} onClick={toggleChecked}>
      {checked && (
        <svg
          width={16}
          height={12}
          fill='none'
          xmlns='http://www.w3.org/2000/svg'>
          <path
            d='m14.964 1.357-9.576 9.576-4.352-4.352'
            stroke='#36B44A'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </svg>
      )}
    </button>
  );
};

export default Checkbox;

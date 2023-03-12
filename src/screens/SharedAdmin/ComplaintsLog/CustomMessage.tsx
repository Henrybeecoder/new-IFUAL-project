import Button from "../../../Components/Button";
import {
  InputTemp,
  SelectTemp,
  TextareaTemp,
} from "../../../Components/InputTemp";
import styles from "./style.module.css";

const CustomMessage = () => {
  return (
    <>
      <h3 className='breadcrumb'>
        <span>COMPLAINT LOG / </span> CUSTOM MESSAGE
      </h3>
      <div className={`w-50 flex-col ${styles.customMessage}`}>
        <InputTemp label='TITLE' placeholder='Enter title' />
        <SelectTemp label='RESPONDENTS' placeholder='Select all recipients' />
        <TextareaTemp
          rows={6}
          label='MESSAGE'
          placeholder='Enter body of message'
        />
        <div className='flex-btwn'>
          <Button text='Cancel' width='38%' />
          <Button text='Send Message' width='58%' variant='dark' invalid />
        </div>
      </div>
    </>
  );
};

export default CustomMessage;

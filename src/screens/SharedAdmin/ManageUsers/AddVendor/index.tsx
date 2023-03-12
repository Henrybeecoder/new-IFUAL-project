import Button from "../../../../Components/Button";
import { InputTemp, SelectTemp } from "../../../../Components/InputTemp";
import PageHeader from "../../../../Components/PageHeader";
import UploadImageTemp from "../../../../Components/UploadImageTemp";
import { Link } from "react-router-dom";
import styles from "./style.module.css";

const AddVendor = () => {
  return (
    <>
      <PageHeader
        backBtn
        pageTitle='ADD VENDOR'
        parentPageTitle='MANAGE VENDORS'
      />
      <div className={styles.container} style={{ marginTop: "20px" }}>
        <div className={styles.metaSection}>
          <UploadImageTemp btnText='Add Company Logo' />
        </div>
        <div className={styles.inputSection}>
          <div className='input-flex-btwn'>
            <InputTemp
              label='COMPANY NAME'
              placeholder='Enter name'
              marginRight
            />
            <InputTemp
              label='EMAIL ADDRESS'
              placeholder='Enter email addresss'
              marginLeft
            />
          </div>
          <div className='input-flex-btwn'>
            <InputTemp
              label='PHONE NUMBER'
              placeholder='Enter number'
              marginRight
            />
            <InputTemp
              label='REPRESENTATIVE NAME'
              placeholder='Enter name'
              marginLeft
            />
          </div>
          <div className='input-flex-btwn'>
            <InputTemp
              label='DATE OF REGISTRATIOn'
              placeholder='Enter date'
              marginRight
            />
            <InputTemp
              label='CAC REGISTRATION NUMBER'
              placeholder='Enter number'
              marginLeft
            />
          </div>
          <InputTemp label='COMPANY ADDRESS' placeholder='Enter address' />
          <SelectTemp label='STATE' placeholder='Select State' />
          <SelectTemp
            label='OPERATION LOCATIONS'
            placeholder='Select locations'
          />
          <div className='input-flex-btwn'>
            <InputTemp
              label='ACCOUNT NUMBER'
              placeholder='Enter number'
              marginRight
            />
            <InputTemp
              label='ACCOUNT NAME'
              placeholder='Enter number'
              marginLeft
            />
          </div>
          <p>
            Enter your SAF account number. Dont have one?{" "}
            <Link to={""} style={{ textDecoration: "none" }}>
              <span className='text-green'>Click here</span>
            </Link>{" "}
          </p>
          <InputTemp label='BVN' placeholder='Enter number' />
          <div className='flex-btwn w-50-lg'>
            <Button text='Cancel' width='38%' />
            <Button text='Register Vendor' variant='dark' invalid width='58%' />
          </div>
        </div>
      </div>
    </>
  );
};

export default AddVendor;

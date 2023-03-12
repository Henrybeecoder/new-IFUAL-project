import {
  InputTemp,
  SelectTemp,
  TextareaTemp,
} from "../../../../Components/InputTemp";
import styles from "./style.module.css";
import { ChangeEvent, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import image from "../../../../assets/image/companyName.png";
import Modal from "../../../../Components/Modals";
import { customer_data, vendor_data } from "../data";
import Button from "../../../../Components/Button";
import { VendorProfile } from "../../../../Components/Profile";
import Header from "../../../../Components/PageHeader/Admin";
import { PaginationOf } from "../../../../Components/PageHeader";
import { Indicator } from "../../../../Components/Countdown";

interface ModalState {
  suspend: boolean;
  enable: boolean;
  delete: boolean;
  decline: boolean;
}

type ModalNames = "suspend" | "enable" | "delete" | "decline";

const VendorInfo = () => {
  const [activeModal, setActiveModal] = useState<ModalNames | null>(null);

  const closeModal = () => {
    setActiveModal(null);
  };

  const modalState: ModalState = {
    suspend: !!(activeModal === "suspend"),
    enable: !!(activeModal === "enable"),
    delete: !!(activeModal === "delete"),
    decline: !!(activeModal === "decline"),
  };

  const [searchParams] = useSearchParams();

  const vendorId = searchParams.get("vendor");

  const [data, setData] = useState(
    vendor_data.find((data) => data.id === vendorId)
  );

  const statusColor = () =>
    data?.status === "onboarded"
      ? "#36b44a"
      : data?.status === "rejected"
      ? "#CA0814"
      : "#2F3930";

  return (
    <>
      <Modal openModal={modalState.decline} closeModal={closeModal}>
        <h3>Decline Vendor</h3>
        <p>
          You are about to decline the vendor Aristocrat Plc. To proceed, kindly
          give a reason for this.
        </p>
        <p>
          Please note that the Vendor would be notified of the reason given.
        </p>
        <SelectTemp
          placeholder='Select from Custom response'
          style={{ margin: "20px 0", padding: "0 20px" }}
        />
        <div className={styles.btns}>
          <Button text='Back' width='60%' />
          <Button text='Decline Vendor' width='36%' variant='danger' invalid />
        </div>
      </Modal>
      <Modal openModal={modalState.suspend} closeModal={closeModal}>
        <h3>Suspend Vendor</h3>
        <p>
          You are about to suspend the customer Beatrice Bimpe. Customer will
          temporaily be unable to use iFuel, until enabled by Admin
        </p>
        <div className={styles.btns}>
          <Button text='Back' width='36%' />
          <Button text='Suspend Vendor' variant='danger' width='60%' />
        </div>
      </Modal>
      <Header pageTitle='VENDOR INFO' parentPageTitle='MANAGE VENDORS'>
        <PaginationOf current={[0, 23]} total={4200} />
      </Header>
      <div className={styles.status}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "end",
            gap: "7px",
            color: statusColor(),
          }}>
          {data && vendorId !== "new" ? (
            <h3 style={{}}>#{data.status.toUpperCase()}</h3>
          ) : (
            <h3 style={{ color: "#2F3930" }}>#Pending</h3>
          )}
          {data?.status && data?.status === "rejected" ? (
            <p>Reason: Fraudulent Company. Flagged for Fraud.</p>
          ) : null}
        </div>
      </div>
      {/* response due section */}
      <>
        {data?.type === "new" ? (
          <div className={styles.responseDueContainer}>
            <div className={styles.textArea}>
              <h2>RESPONSE DUE</h2>
              <p>Wed. 26th Oct. 2022</p>
            </div>
            <div className={styles.indicatorsFlex}>
              <Indicator text='Days' value='2' />
              <Indicator text='Hours' value='12' />
              <Indicator text='Minutes' value='15' />
              <Indicator text='Seconds' value='45' />
            </div>
          </div>
        ) : null}
      </>
      <VendorProfile profileImg={image}>
        {data?.status && data.status === "onboarded" ? (
          <>
            <Button
              text='Suspend'
              // style={{ alignSelf: "flex-start" }}
              width='165px'
              height='47px'
              variant='danger'
              onClick={() => setActiveModal("suspend")}
            />
          </>
        ) : null}
      </VendorProfile>
    </>
  );
};

export default VendorInfo;

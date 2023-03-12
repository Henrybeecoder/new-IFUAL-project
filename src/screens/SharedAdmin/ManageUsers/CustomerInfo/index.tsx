import LayoutSuperAdmin from "../../../../containers/LayoutSuperAdmin";
import { InputTemp } from "../../../../Components/InputTemp";
import styles from "./style.module.css";
import { ChangeEvent, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import profile from "../../../../assets/image/profile2Lg.png";
import Modal from "../../../../Components/Modals";
import { customer_data } from "../data";
import Button from "../../../../Components/Button";
import { CustomerProfile } from "../../../../Components/Profile";
import Header from "../../../../Components/PageHeader/Admin";
import useMediaQuery from "../../../../Custom hooks/useMediaQuery";
import { PaginationOf } from "../../../../Components/PageHeader";

interface ModalState {
  suspend: boolean;
  enable: boolean;
  delete: boolean;
}

type ModalNames = "suspend" | "enable" | "delete";

const CustomerInfo = () => {
  const navigate = useNavigate();
  const [activeModal, setActiveModal] = useState<ModalNames | null>(null);

  const matches = useMediaQuery("(min-width: 800px)");

  const closeModal = () => {
    setActiveModal(null);
  };

  const modalState: ModalState = {
    suspend: !!(activeModal === "suspend"),
    enable: !!(activeModal === "enable"),
    delete: !!(activeModal === "delete"),
  };

  const [searchparams] = useSearchParams();

  const customerId = searchparams.get("customer");

  const [data, setData] = useState(
    customer_data.find((data) => data.id === customerId)
  );

  const statusColor = () =>
    data?.status === "active"
      ? "#36b44a"
      : data?.status === "disabled"
      ? "#CA0814"
      : "";

  return (
    <>
      <Modal openModal={modalState.suspend} closeModal={closeModal}>
        <h3>Suspend Customer</h3>
        <p>
          You are about to suspend the customer Beatrice Bimpe. Customer will
          temporaily be unable to use iFuel, until enabled by Admin
        </p>
        <div className={styles.btns}>
          <Button text='Back' width='60%' onClick={closeModal} />
          <Button
            text={matches ? "Suspend Customer" : "Suspend"}
            variant='danger'
            width='37%'
            onClick={() => {
              setData((state) => state && { ...state, status: "disabled" });
              closeModal();
            }}
          />
        </div>
      </Modal>
      <Modal width='lg' openModal={modalState.enable} closeModal={closeModal}>
        <h3>Enable Customer</h3>
        <p>
          You are about to enable the customer Beatrice Bimpe. Customer will now
          be able to use and access the benefits of iFuel.
        </p>
        <div className={styles.btns}>
          <Button text='Back' width='37%' onClick={closeModal} />
          <Button
            text='Enable Customer'
            variant='dark'
            width='60%'
            onClick={() => {
              setData((state) => state && { ...state, status: "active" });
              closeModal();
            }}
          />
        </div>
      </Modal>
      <Modal openModal={modalState.delete} closeModal={closeModal}>
        <h3>Delete Customer</h3>
        <p>
          You are about to <span style={{ color: "#CA0814" }}>delete</span> the
          customer Beatrice Bimpe. Please note that this action is permanent and
          details of customer will be lost.
        </p>
        <div className={styles.btns}>
          <Button text='Back' width='60%' onClick={closeModal} />
          <Button text='Delete Customer' variant='danger' width='37%' />
        </div>
      </Modal>

      <>
        <Header
          pageTitle='CUSTOMER INFO'
          parentPageTitle='MANAGE CUSTOMER'
          backBtn
          onClickBackBtn={() => navigate(-1)}>
          <PaginationOf current={[0, 23]} total={4200} />
        </Header>
        <div className={styles.customerStatus}>
          {data && (
            <h3 style={{ color: statusColor() }}>
              #{data.status.toUpperCase()}
            </h3>
          )}
        </div>
        <CustomerProfile profileImg={profile}>
          <>
            {data?.status && data.status === "active" ? (
              <Button
                text='Suspend'
                style={{ alignSelf: "flex-start" }}
                width='150px'
                variant='danger'
                onClick={() => setActiveModal("suspend")}
              />
            ) : (
              <div className={styles.disabledBtnContainer}>
                <Button
                  text='Enable'
                  style={{ alignSelf: "flex-start" }}
                  width='160px'
                  height='50px'
                  variant='dark'
                  onClick={() => setActiveModal("enable")}
                />
                <Button
                  text='Delete'
                  style={{ alignSelf: "flex-start" }}
                  width='160px'
                  height='50px'
                  variant='danger-outline'
                  onClick={() => setActiveModal("delete")}
                />
              </div>
            )}
          </>
        </CustomerProfile>
      </>
    </>
  );
};

export default CustomerInfo;

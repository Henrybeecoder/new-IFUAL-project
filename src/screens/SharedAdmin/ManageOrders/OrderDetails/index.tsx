import styles from "./style.module.css";
import { ReactComponent as FilterSvg } from "../../../../assets/navbericon/filter-outline.svg";
import { ReactComponent as TrashSvg } from "../../../../assets/svg/trash-outline.svg";
import { data as orders } from "../index";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button, { LinkButton } from "../../../../Components/Button";
import orderedProfile from "../../../../assets/image/orderedProfile.png";
import deliveredProfile from "../../../../assets/image/deliveredProfile.png";
import { InputTemp, SelectTemp } from "../../../../Components/InputTemp";
import { RenderPageProps } from "../../../../types/shared";
import Modal from "../../../../Components/Modals";
import { Root, Trigger, Portal, Content } from "@radix-ui/react-popover";
import Header from "../../../../Components/PageHeader/Admin";
import useMediaQuery from "../../../../Custom hooks/useMediaQuery";
import { limitText } from "../../../../Custom hooks/helpers";
import { PaginationOf } from "../../../../Components/PageHeader";

interface SectionProps {
  data: any;
  setActiveModal: (name: string | null) => void;
  baseUrl?: string;
}

const ManageOrders = ({ baseUrl }: { baseUrl: string }) => {
  const id = useParams()?.id;

  const navigate = useNavigate();

  const matches = useMediaQuery("(min-width: 800px)");

  const [data, setData] = useState(orders.find((data) => data.id === id));

  const [activeModal, setActiveModal] = useState<string | null>(null);

  const modalState = {
    remap: !!(activeModal === "remap"),
    remap_overdue: !!(activeModal === "remap-overdue"),
    track: !!(activeModal === "track"),
    cancel: !!(activeModal === "cancel"),
    cancel_overdue: !!(activeModal === "cancel-overdue"),
  };

  const closeModal = () => setActiveModal(null);

  const renderSection: RenderPageProps = {
    cancelled: <Cancelled data={data} setActiveModal={setActiveModal} />,
    pending: <Pending data={data} setActiveModal={setActiveModal} />,
    overdue: <Overdue data={data} setActiveModal={setActiveModal} />,
    completed: <Completed data={data} />,
  };

  return (
    <>
      <Modal
        openModal={modalState.remap || modalState.remap_overdue}
        closeModal={closeModal}>
        {modalState.remap ? (
          <h3>Remap Order</h3>
        ) : modalState.remap_overdue ? (
          <h3>Remap Overdue Order</h3>
        ) : null}
        <p>
          Please contact the customer - Beatrice Bimpe first to confirm if order
          should be remapped - 08012345678
        </p>
        <div className='flex-btwn'>
          <Button text='Back' width='40%' />
          <Button text='Remap' variant='dark' width='56%' />
        </div>
      </Modal>
      <Modal
        openModal={modalState.cancel || modalState.cancel_overdue}
        closeModal={closeModal}>
        {modalState.cancel ? (
          <h3>Cancel Order</h3>
        ) : modalState.cancel_overdue ? (
          <h3>Cancel Overdue Order</h3>
        ) : null}
        <p>
          You are about to <span className='span-danger'>cancel</span> the order
          for 200l, Diesel. Please contact the customer first to confirm if
          order should be remapped instead - 08012345678
        </p>
        <div className='flex-btwn'>
          <Button text='Back' width='40%' />
          <Button text='Remap' variant='danger' width='56%' />
        </div>
      </Modal>
      <div className={styles.container}>
        <Header pageTitle='ORDER DETAILS' parentPageTitle='MANAGE ORDERS'>
          <PaginationOf current={[0, 23]} total={200} />
        </Header>

        <>{data && renderSection[data.status.toLowerCase()]}</>

        <div className='flex-btwn'>
          {matches ? (
            <div className={styles.detailsCard}>
              <img src={orderedProfile} />
              <div>
                <h3>ABC Ventures</h3>
                <p>
                  Over <span className='span-green'>N300,000</span> purchase
                </p>
              </div>
              <LinkButton
                text='View'
                variant='primary'
                onClick={() => navigate(`profile-customer`)}
              />
            </div>
          ) : (
            <div className={styles.detailsCard}>
              <img src={orderedProfile} />
              <div>
                <h3>{limitText("ABC Ventures", 6)}</h3>
                <LinkButton
                  text='View'
                  variant='primary'
                  onClick={() => navigate(`profile-customer`)}
                />
              </div>
            </div>
          )}
          {matches ? (
            <div className={styles.detailsCard}>
              <img src={deliveredProfile} />
              <div>
                <h3>ABC Ventures</h3>
                <p>
                  Over <span className='span-green'>N300,000</span> purchase
                </p>
              </div>
              <LinkButton
                text='View'
                variant='primary'
                onClick={() => navigate(`profile-customer`)}
              />
            </div>
          ) : (
            <div className={styles.detailsCard}>
              <img src={deliveredProfile} />
              <div>
                <h3>{limitText("ABC Ventures", 6)}</h3>
                <LinkButton
                  text='View'
                  variant='primary'
                  onClick={() => navigate(`profile-customer`)}
                />
              </div>
            </div>
          )}
        </div>
        <div className='input-flex-btwn'>
          <div className={styles.productDetails}>
            <h2 className={styles.headingUdln}>Product Details</h2>
            <div className={styles.table}>
              <h3>
                Product: <span>Diesel</span>{" "}
              </h3>
              <h3>
                Delivery Time: <span>6 hours</span>{" "}
              </h3>
              <h3>
                Price: <span>N800 / ltr</span>{" "}
              </h3>
              <h3>
                Quantity: <span>200 ltr</span>{" "}
              </h3>
              <h3 style={{ textDecoration: "underline" }}>
                Total: <span>N34,500.00</span>{" "}
              </h3>
            </div>
            <div className='divider-dark' />
            <h3 className={styles.chargeText}>
              iFuel Charge <span>N690.00</span>{" "}
            </h3>
          </div>
          <div className={styles.deliveryDetails}>
            <h2 className={styles.headingUdln}>Delivery Details</h2>
            <div className='input-flex-btwn'>
              <InputTemp
                marginRight
                label='FIRST NAME'
                defaultValue='Beatrice'
              />
              <InputTemp marginLeft label='SURNAME' defaultValue='Bimpe' />
            </div>
            <div className='input-flex-btwn'>
              <InputTemp
                marginRight
                label='PHONE NUMBER'
                defaultValue='08123456789'
              />
              <InputTemp
                marginLeft
                label='EMAIL ADDRESS'
                defaultValue='dash@ifuel.com'
              />
            </div>
            <div className='input-flex-btwn'>
              <InputTemp
                marginRight
                label='DELIVERY ADDRESS'
                defaultValue='No. 1, Bosipo district, Ikoyi'
              />
              <SelectTemp
                marginLeft
                // width='170px'
                className={styles.selectTemp}
                label='STATE'
                placeholder='Lagos'
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const Cancelled = ({ data, setActiveModal }: SectionProps) => {
  return (
    <>
      <div className={styles.status} style={{ color: "#CA0814" }}>
        {data && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "end",
            }}>
            <h3>#{data.status.toUpperCase()}</h3>
            <p>Reason: Wrong delivery location</p>
          </div>
        )}
      </div>
      <div className={styles.datesFlex}>
        <div>
          <p>Ordered: 22/09/2022, 09:00</p>
          {data.type === "new" ? (
            <p style={{ fontSize: "17px", marginTop: "2px" }}>
              Time left to remap to another Vendor:{" "}
              <span className='span-danger'>02:35:24</span>{" "}
            </p>
          ) : null}
        </div>
        {data.type === "new" ? (
          <Button
            text='Re-map'
            variant='dark'
            width='120px'
            onClick={() => setActiveModal("remap")}
          />
        ) : (
          <p>...</p>
        )}
      </div>
    </>
  );
};

const Completed = ({ data }: { data: any }) => {
  return (
    <>
      <div className={styles.status} style={{ color: "#36b44a" }}>
        {data && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "end",
            }}>
            <h3>#{data.status.toUpperCase()}</h3>
            <p>Reason: Wrong delivery location</p>
          </div>
        )}
      </div>
      <div className={styles.datesFlex}>
        <p>Ordered: 22/09/2022, 09:00</p>
        <p>Due: 23/09/2022, 09:00</p>
      </div>
    </>
  );
};

const Pending = ({ data, setActiveModal, baseUrl }: SectionProps) => {
  const navigate = useNavigate();
  return (
    <>
      <div className={styles.status} style={{ color: "#CA0814" }}>
        {data && <h3>#{data.status.toUpperCase()}</h3>}
      </div>
      <div className={styles.datesFlex}>
        <div>
          <p>Ordered: 22/09/2022, 09:00</p>
          {data.type !== "accepted" ? (
            <p style={{ fontSize: "17px", marginTop: "2px" }}>
              Time left to remap to another Vendor (Automatic):{" "}
              <span className='span-danger'>02:35:24</span>{" "}
            </p>
          ) : null}
        </div>
        <p>Due: 23/09/2022, 09:00</p>
      </div>
      <div className={styles.trackFlex}>
        <Button
          text='Track Order'
          width='150px'
          onClick={() => navigate(`track-order`)}
        />
        {data.type !== "accepted" ? (
          <Root>
            <Trigger asChild>
              <button className={styles.remapBtn}>Re-map</button>
            </Trigger>
            <Portal>
              <Content className={styles.remapContainer}>
                <h3>Remap;</h3>
                <div className='divider' />
                <div className={styles.inputArea}>
                  <div className={styles.flexWInput}>
                    <p>Current Vendor:</p>
                    <InputTemp width={"65%"} placeholder='ABC OIL AND GAS' />
                  </div>
                  <div className={styles.flexWInput}>
                    <p>New Vendor:</p>
                    <SelectTemp
                      width={"65%"}
                      placeholder='Enter or select name'
                    />
                  </div>
                  <p>Showing Vendors delivering to destination only</p>
                </div>
                <div className='divider' />
                <div className={styles.btnsRemap}>
                  <Button text='Cancel' width='37%' />
                  <Button text='Remap' width='57%' variant='dark' invalid />
                </div>
              </Content>
            </Portal>
          </Root>
        ) : null}
        <button onClick={() => setActiveModal("cancel")}>
          <TrashSvg />
        </button>
      </div>
    </>
  );
};

const Overdue = ({ data, setActiveModal }: SectionProps) => {
  return (
    <>
      <div className={styles.status} style={{ color: "#CA0814" }}>
        {data && <h3>#{data.status.toUpperCase()}</h3>}
      </div>
      <div className={styles.datesFlex}>
        <div>
          <p>Ordered: 22/09/2022, 09:00</p>
          <p style={{ fontSize: "17px", marginTop: "2px" }}>
            Overdue by <span className='span-danger'>02:35:24</span>{" "}
          </p>
        </div>
        <p>Due: 23/09/2022, 09:00</p>
      </div>
      <div className={styles.trackFlex}>
        <Button
          text='Track Order'
          width='150px'
          onClick={() => setActiveModal("track")}
        />
        <Button
          text='Re-map'
          variant='dark'
          width='120px'
          onClick={() => setActiveModal("remap")}
        />
        <button onClick={() => setActiveModal("cancel-overdue")}>
          <TrashSvg />
        </button>
      </div>
    </>
  );
};

export default ManageOrders;

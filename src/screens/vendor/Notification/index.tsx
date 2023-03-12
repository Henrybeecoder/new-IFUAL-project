import React from "react";
import { useEffect, useState } from "react";
import Layout from "../../../containers/LayoutVendor";
import styles from "./style.module.css";
// import right from "../../assets/svg/right.svg";
// import left from "../../assets/svg/left.svg";
// import filter from "../../assets/svg/filter.svg";
import noneSelected from "../../../assets/svg/noneSelected.svg";
import { limitText } from "../../../Custom hooks/helpers";
import Modal from "../../../Components/Modals";
import modalCheck from "../../../assets/svg/modalCheck.svg";
import useMediaQuery from "../../../Custom hooks/useMediaQuery";
import Checkbox, { CheckboxProps } from "../../../Components/Checkbox";
import { SvgArrowLeft } from "../../../assets/Svgs";
import Button from "../../../Components/Button";
import PageHeader, {
  FilterModal,
  PaginationOf,
} from "../../../Components/PageHeader";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "../../../lib/axios";

const notificationList = [
  {
    id: "1",
    heading: "Order Received from customer at Oregun Ikeja",
    body: "A customer, Badu Badmus has ordered for delivery of 100l diesel to be delivered at Oregun Ikeja.",
    question: "Are you available to pick up this order ticket?",
    timeAgo: "2h",
    isRead: true,
  },
  {
    id: "2",
    heading: "Order Received from customer at Oregun Ikeja",
    body: "A customer, Badu Badmus has ordered for delivery of 100l diesel to be delivered at Oregun Ikeja.",
    question: "Are you available to pick up this order ticket?",
    timeAgo: "3h",
    isRead: false,
  },
  {
    id: "3",
    heading: "Order Received from customer at Oregun Ikeja",
    body: `A customer, Badu Badmus has ordered for delivery of 100l diesel to be delivered at Oregun Ikeja.`,
    question: "Are you available to pick up this order ticket?",
    timeAgo: "7h",
    isRead: false,
  },
  {
    id: "4",
    heading: "Order Received from customer at Oregun Ikeja",
    body: "A customer, Badu Badmus has ordered for delivery of 100l diesel to be delivered at Oregun Ikeja.",
    question: "Are you available to pick up this order ticket?",
    timeAgo: "1h",
    isRead: false,
  },
];

// interface ModalState {
//   accept: boolean;
//   decline: boolean;
//   accepted: boolean;
//   declined: boolean;
// }

type ModalNames = "accept" | "decline" | "accepted" | "declined" | null;

const Notification = () => {
  const matches = useMediaQuery("(min-width: 800px)");
  const [selected, setSelected] = useState<string | null>(null);
  const [activeModal, setActiveModal] = useState<ModalNames>(null);

  const [checkboxes, setCheckboxes] = useState<{ [key: string]: boolean }>({
    "1": false,
    "2": false,
    "3": false,
    "4": false,
    "5": false,
    "6": false,
    "7": false,
    "8": false,
  });

  const tickCheckbox = (key: string) => {
    setCheckboxes((oldState) => ({ ...oldState, [key]: !oldState[key] }));
  };

  const modalState = {
    accept: !!(activeModal === "accept"),
    decline: !!(activeModal === "decline"),
    accepted: !!(activeModal === "accepted"),
    declined: !!(activeModal === "declined"),
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  const selectedContent = notificationList.find(
    (notification) => notification.id === selected
  );

  const { data: notifications } = useQuery(["/Notification/GetNotifications"], {
    initialData: [],
  });

  return (
    <Layout>
      <Modal
        name="accept"
        openModal={modalState.accept}
        closeModal={closeModal}
      >
        <h3>Accept Order</h3>
        <p className={styles.modalOption}>
          You are about to accept the order for{" "}
          <span className={styles.spanGreen}>200l</span> of Diesel at
          <span className={styles.spanGreen}>N34,500</span> from 234 Ventures at
          Ikoyi, Lagos
        </p>
        <p className={styles.clickToConfirm}>Kindly click to confirm</p>
        <div className="flex-btwn">
          <Button text="Cancel" width="40%" onClick={closeModal} />
          <Button
            text="Confirm"
            variant="primary"
            width="55%"
            onClick={() => setActiveModal("accepted")}
          />
        </div>
      </Modal>

      <Modal
        name="accept"
        openModal={modalState.decline}
        closeModal={closeModal}
      >
        <h3>Decline Order</h3>
        <p>
          You are about to decline the order for{" "}
          <span className={styles.spanGreen}>200l</span> of Diesel at{" "}
          <span className={styles.spanGreen}>N34,500</span> from 234 Ventures at
          Ikoyi, Lagos
        </p>
        <p>Kindly click to confirm</p>
        <div className="flex-btwn">
          <Button text="Cancel" width="56%" onClick={closeModal} />
          <Button
            text="Decline"
            variant="danger"
            width="40%"
            onClick={() => setActiveModal("declined")}
          />
        </div>
      </Modal>

      <Modal variant="unstyled" openModal={modalState.declined}>
        <div className={styles.orderDeclined}>
          <h2>Why Are you declining this order?</h2>
          <div className={styles.divider} />
          <div className={styles.checkBoxWithTextContainer}>
            <CheckBoxWithText
              checked={checkboxes[1]}
              toggleChecked={() => tickCheckbox("1")}
              text="I don’t deliver to this location"
            />
            <CheckBoxWithText
              checked={checkboxes[2]}
              toggleChecked={() => tickCheckbox("2")}
              text="I don’t have order quantity"
            />
            <CheckBoxWithText
              checked={checkboxes[3]}
              toggleChecked={() => tickCheckbox("3")}
              text="It will take a long time to deliver"
            />
            <CheckBoxWithText
              checked={checkboxes[4]}
              toggleChecked={() => tickCheckbox("4")}
              text="Customer’s delivery location is not accessible"
            />
            <CheckBoxWithText
              checked={checkboxes[5]}
              toggleChecked={() => tickCheckbox("5")}
              text="I don’t trust this customer"
            />
            <CheckBoxWithText
              checked={checkboxes[6]}
              toggleChecked={() => tickCheckbox("6")}
              text="I would just like to pass"
            />
            <CheckBoxWithText
              checked={checkboxes[7]}
              toggleChecked={() => tickCheckbox("7")}
              text="There is a difference in price now"
            />
            <CheckBoxWithText
              checked={checkboxes[8]}
              toggleChecked={() => tickCheckbox("8")}
              text="Other"
            />
          </div>
          <div className={styles.divider} />
          <div className={styles.declinedBtns}>
            <Button text="Skip" width="40%" onClick={closeModal} />
            <Button
              text="Submit"
              variant="primary"
              width="55%"
              onClick={() => setActiveModal(null)}
            />
          </div>
        </div>
      </Modal>
      <Modal openModal={modalState.accepted} closeModal={closeModal}>
        <h3>Order Accepted</h3>
        <img src={modalCheck} />
      </Modal>

      <>
        {!selected ? (
          <button className={styles.breadCrumb}>
            <SvgArrowLeft />
            <p>Back</p>
          </button>
        ) : (
          <button
            className={styles.breadCrumb}
            onClick={() => setSelected(null)}
          >
            <SvgArrowLeft />
            <p>Back to Notifications</p>
          </button>
        )}
        <PageHeader pageTitle="Notifications">
          <PaginationOf current={[1, 4]} total={4} />
          <FilterModal options={[]} />
        </PageHeader>
        <div className={styles.notificationsContainer}>
          <div
            className={styles.notificationsList}
            style={{ display: !matches && selected ? "none" : "unset" }}
          >
            {notificationList?.map((notification, index) => (
              <div key={notification.id}>
                <div
                  className={styles.notificationContainer}
                  style={{
                    backgroundColor:
                      selected === notification.id ? "#F2F6F2" : "transparent",
                  }}
                  onClick={() => setSelected(notification.id)}
                >
                  <div>
                    <div
                      className={styles.badge}
                      style={{
                        backgroundColor: !notification.isRead
                          ? "#D4D8D5"
                          : "#36B44A",
                      }}
                    />
                  </div>
                  <div className={styles.textContents}>
                    <div className="flex-btwn">
                      <h2>{notification.heading}</h2>
                      <p className={styles.timeAgo}>{notification.timeAgo}</p>
                    </div>
                    <p>{limitText(notification.body, 82)}</p>
                  </div>
                </div>
                <div
                  className={styles.divider}
                  style={{
                    display:
                      index + 1 === notificationList.length ? "none" : "block",
                  }}
                />
              </div>
            ))}
          </div>
          <NotificationView
            selected={selectedContent}
            setActiveModal={setActiveModal}
          />
        </div>
      </>
    </Layout>
  );
};

interface CheckboxWithTextProps extends CheckboxProps {
  text: string;
}

const CheckBoxWithText = ({
  checked,
  toggleChecked,
  text,
}: CheckboxWithTextProps) => {
  return (
    <div className={styles.checkboxFlex}>
      <div>
        <Checkbox checked={checked} toggleChecked={toggleChecked} />
      </div>
      <p>{text}</p>
    </div>
  );
};

interface ViewProps {
  selected?: {
    id: string;
    heading: string;
    body: string;
    question: string;
    timeAgo: string;
    isRead: boolean;
  } | null;
  setActiveModal: (modalName: ModalNames) => void;
}

const NotificationView = ({ selected, setActiveModal }: ViewProps) => {
  const matches = useMediaQuery("(min-width: 800px)");

  const { mutate } = useMutation<any, any, { id: string; isRead: boolean }>({
    mutationFn: async (variables) =>
      axios.post("/Notification/UpdateNotification", variables),
  });

  useEffect(() => {
    if (selected && !selected.isRead) {
      mutate({
        id: selected.id,
        isRead: true,
      });
    }
  }, [selected]);

  return (
    <div
      className={styles.selectedContainer}
      style={{ display: !matches && !selected ? "none" : "unset" }}
    >
      {!selected ? (
        <div className={styles.noneSelected}>
          <div className={styles.noneSelectedContent}>
            <img src={noneSelected} />
            <p>Click to read notifications</p>
          </div>
        </div>
      ) : (
        <div className={styles.selectedNotificationContainer}>
          <div className={styles.flexBetween}>
            <h2>
              {matches ? selected.heading : limitText(selected.heading, 30)}
            </h2>
            <p className={styles.timeAgo}>{selected.timeAgo}</p>
          </div>
          <p>{selected.body}</p>
          <p>{selected.question}</p>
          <div className="flex-btwn" style={{ width: "90%" }}>
            <Button
              text="No"
              width="37%"
              height="55px"
              onClick={() => setActiveModal("decline")}
            />

            <Button
              text="Yes I am"
              width="58%"
              height="55px"
              variant="primary"
              onClick={() => setActiveModal("accept")}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Notification;

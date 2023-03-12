import { useState } from "react";
import { SvgArrowLeft } from "../../../assets/Svgs";
import styles from "./style.module.css";
import noneSelected from "../../../assets/svg/noneSelected.svg";
import useMediaQuery from "../../../Custom hooks/useMediaQuery";
import { limitText } from "../../../Custom hooks/helpers";
import Header from "../../../Components/PageHeader/Admin";
import { useNavigate } from "react-router-dom";
import Button from "../../../Components/Button";
import { FilterModal } from "../../../Components/PageHeader";

const notificationList = [
  {
    id: "1",
    heading: "10 Customers Onboarded",
    body: "10 Customers just uploaded at 4 States. Please see the details below;",
    timeAgo: "2h",
    opened: true,
  },
  {
    id: "2",
    heading: "10 Customers Onboarded",
    body: "10 Customers just uploaded at 4 States. Please see the details below;",
    timeAgo: "3h",
    opened: false,
  },
  {
    id: "3",
    heading: "10 Customers Onboarded",
    body: `10 Customers just uploaded at 4 States. Please see the details below;`,
    timeAgo: "7h",
    opened: false,
  },
  {
    id: "4",
    heading: "10 Customers Onboarded",
    body: "10 Customers just uploaded at 4 States. Please see the details below;",
    timeAgo: "1h",
    opened: false,
  },
];

const Notification = () => {
  const navigate = useNavigate();

  const [selected, setSelected] = useState<string | null>(null);

  const selectedContent = notificationList.find(
    (notification) => notification.id === selected
  );

  const removeSelected = () => {
    setSelected(null);
  };

  const matches = useMediaQuery("(min-width: 800px)");

  return (
    <>
      <Header
        pageTitle='NOTIFICATIONS'
        backBtn
        onClickBackBtn={() => {
          !selected ? navigate(-1) : removeSelected();
        }}>
        <FilterModal options={[]} />
      </Header>

      <div className={styles.notificationsContainer}>
        <div
          className={styles.notificationsList}
          style={{ display: !matches && selected ? "none" : "unset" }}>
          {notificationList?.map((notification, index) => (
            <div key={notification.id}>
              <div
                key={notification.id}
                className={styles.notificationContainer}
                style={{
                  backgroundColor:
                    selected === notification.id ? "#F2F6F2" : "transparent",
                }}
                onClick={() => setSelected(notification.id)}>
                <div>
                  <div
                    className={styles.badge}
                    style={{
                      backgroundColor: !notification.opened
                        ? "#D4D8D5"
                        : "#36B44A",
                    }}
                  />
                </div>
                <div className={styles.textContents}>
                  <div className={"flex-btwn"}>
                    <h2>{notification.heading}</h2>
                    <p className={styles.timeAgo}>{notification.timeAgo}</p>
                  </div>
                  <p>{limitText(notification.body, 82)}</p>
                </div>
              </div>
              <div
                className={"divider"}
                style={{
                  display:
                    index + 1 === notificationList.length ? "none" : "block",
                }}
              />
            </div>
          ))}
        </div>
        <div
          className={styles.selectedContainer}
          style={{ display: !matches && !selected ? "none" : "unset" }}>
          {!selectedContent ? (
            <div className={styles.noneSelected}>
              <div className={styles.noneSelectedContent}>
                <img src={noneSelected} />
                <p>Click to read notifications</p>
              </div>
            </div>
          ) : (
            <div className={styles.selectedNotificationContainer}>
              <div className={"flex-btwn"}>
                <h2>
                  {matches
                    ? selectedContent.heading
                    : limitText(selectedContent.heading, 30)}
                </h2>
                <p className={styles.timeAgo}>{selectedContent.timeAgo}</p>
              </div>
              <p>{selectedContent.body}</p>
              <div className='flex-btwn'>
                <Button text='Back' width='40%' />
                <Button text='Review' variant='dark' width='55%' />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Notification;

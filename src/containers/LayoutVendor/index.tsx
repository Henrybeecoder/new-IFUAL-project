import React, { ReactNode, useState } from "react";
import styles from "./style.module.css";
import useMediaQuery from "../../Custom hooks/useMediaQuery";
import { useNavigate } from "react-router-dom";
import SideBar from "./SideBar";
import Header from "./Header";

interface Props {
  children: ReactNode;
}

export default function Layout({ children }: Props) {
  const matches = useMediaQuery("(min-width: 800px)");
  const navigate = useNavigate();

  const userStr = localStorage.getItem("user");
  const user = userStr && JSON.parse(userStr);

  const [sideBarOpen, setSideBarOpen] = useState(false);

  return (
    <>
      <div className={styles.flex}>
        <SideBar open={sideBarOpen} setOpen={setSideBarOpen} />
        <div className={styles.relative}>
          <Header setOpen={setSideBarOpen} user={user} />
          <div className={styles.page}>{children}</div>
        </div>
      </div>
    </>
  );
}

{
  /* <div className={styles.container}>
  {!matches && openHamburger && (
    <div className={styles.mobilesidebar}>
      <img src={logo} alt='' className={styles.logo} />
      <div className={styles.LinkItem}>
        <div
          className={`${
            props.active === "dashboard" ? styles.active : styles.item
          }`}
          onClick={routeToDashboard}>
          {props.active === "dashboard" ? (
            <img src={dashboardActive} alt='' />
          ) : (
            <img src={dashboard} alt='' />
          )}
          <p>Dashboard</p>
        </div>
        <div
          className={`${
            props.active === "product-list" ? styles.active : styles.item
          }`}
          onClick={routeToProductList}>
          {props.active === "product-list" ? (
            <img src={productListActive} alt='' />
          ) : (
            <img src={productList} alt='' />
          )}
          <p>Product List</p>
        </div>

        <div
          className={`${
            props.active === "order-status" ? styles.active : styles.item
          }`}
          onClick={routeToOrderStatus}>
          {props.active === "order-status" ? (
            <img src={orderStatusActive} alt='' />
          ) : (
            <img src={orderStatus} alt='' />
          )}
          <p>Order Status</p>
        </div>

        <div
          className={`${
            props.active === "notification" ? styles.active : styles.item
          }`}
          onClick={routeToNotification}>
          {props.active === "notification" ? (
            <img src={notificationActive} alt='' />
          ) : (
            <img src={notification} alt='' />
          )}
          <p>Notification</p>
        </div>

        <div
          className={`${
            props.active === "report" ? styles.active : styles.item
          }`}
          onClick={routeToReport}>
          {props.active === "report" ? (
            <img src={reportActive} alt='' />
          ) : (
            <img src={report} alt='' />
          )}
          <p>Report</p>
        </div>
        <div className={styles.item} onClick={routeToLogin}>
          <img src={logOut} alt='' />
          <p>Log out</p>
        </div>
      </div>
    </div>
  )}

  {!matches && (
    <div className={styles.mobileheader}>
      <div className={styles.logoContainer}>
        <img src={logo} alt='' />
      </div>
      <div className={styles.iconContainer}>
        <div className={styles.iconHolder}>
          <img src={mobileSearch} alt='' />
        </div>
        <div className={styles.iconHolder} onClick={toggleHamburger}>
          <img src={hamburger} alt='' />
        </div>
      </div>
    </div>
  )}
  {matches && (
    <div className={styles.sidebar}>
      <img src={logo} alt='' className={styles.logo} />
      <div className={styles.LinkItem}>
        <div
          className={`${
            props.active === "dashboard" ? styles.active : styles.item
          }`}
          onClick={routeToDashboard}>
          {props.active === "dashboard" ? (
            <img src={dashboardActive} alt='' />
          ) : (
            <img src={dashboard} alt='' />
          )}
          <p>Dashboard</p>
        </div>
        <div
          className={`${
            props.active === "product-list" ? styles.active : styles.item
          }`}
          onClick={routeToProductList}>
          {props.active === "product-list" ? (
            <img src={productListActive} alt='' />
          ) : (
            <img src={productList} alt='' />
          )}
          <p>Product List</p>
        </div>
        <div
          className={`${
            props.active === "order-status" ? styles.active : styles.item
          }`}
          onClick={routeToOrderStatus}>
          {props.active === "order-status" ? (
            <img src={orderStatusActive} alt='' />
          ) : (
            <img src={orderStatus} alt='' />
          )}
          <p>Order Status</p>
        </div>
        <div
          className={`${
            props.active === "notification" ? styles.active : styles.item
          }`}
          onClick={routeToNotification}>
          {props.active === "notification" ? (
            <img src={notificationActive} alt='' />
          ) : (
            <img src={notification} alt='' />
          )}
          <p>Notification</p>
        </div>
        <div
          className={`${
            props.active === "report" ? styles.active : styles.item
          }`}
          onClick={routeToReport}>
          {props.active === "report" ? (
            <img src={reportActive} alt='' />
          ) : (
            <img src={report} alt='' />
          )}
          <p>Report</p>
        </div>
        <div className={styles.item} onClick={routeToLogin}>
          <img src={logOut} alt='' />
          <p>Log out</p>
        </div>
      </div>
    </div>
  )}
  <div className={styles.body}>
    {matches && (
      <div className={styles.header}>
        <div className={styles.searchbar}>
          <input placeholder='Enter keyword' />
          <img src={searchIcon} alt='' />
        </div>
        <img src={notificatonBar} alt='' />
        <img src={boxBar} alt='' />
        <img src={profile} alt='' className={styles.profile} />
      </div>
    )}
    <div>{props.children}</div>
  </div>
</div>; */
}

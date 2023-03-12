import styles from "./style.module.css";
import logo from "../../assets/logo.svg";
import {
  SvgArrowDown,
  SvgArrowUp,
  SvgDashboard,
  SvgLogOut,
  SvgNotification,
  SvgOrderStatus,
  SvgReport,
  SvgSettings,
} from "../../assets/Svgs";
import { ReactNode, useState } from "react";
import useMediaQuery from "../../Custom hooks/useMediaQuery";
import { Content, Overlay, Portal, Root } from "@radix-ui/react-dialog";
import NavLinkItem from "../../Components/NavLinkItem";
import { ReactComponent as OrderStatusSvg } from "../../assets/navbericon/orderStatus.svg";

interface SideBarProps {
  open: boolean;
  setOpen: (state: boolean) => void;
  baseUrl: "admin" | "super-admin";
}

const SideBar = ({ open, setOpen, baseUrl }: SideBarProps) => {
  const [manage, setManage] = useState(false);

  const matches = useMediaQuery("(min-width: 800px)");

  return (
    <>
      {!matches ? (
        <Root open={open} onOpenChange={setOpen}>
          <Portal>
            <Overlay className={"overlay"} />
            <Content className={"sideBarContainer"}>
              <div className={styles.logoSm}>
                <img alt='logo' src={logo} />
              </div>
              <div className={styles.navLinksContainer}>
                <NavLinkItem to={`/${baseUrl}/dashboard`} heading='Overview'>
                  <SvgDashboard />
                </NavLinkItem>
                <div className='divider' />
                <div
                  className={`${styles.manageContainerSm} ${
                    manage && styles.active
                  }`}>
                  <button
                    // className={`${styles.flexLink} ${manage && styles.active}`}
                    onClick={() => setManage((state) => !state)}>
                    <OrderStatusSvg />
                    <h3 className={` ${manage && styles.active}`}>Manage</h3>
                    {manage ? <SvgArrowUp /> : <SvgArrowDown />}
                  </button>
                  {manage && (
                    <div className={styles.manageDropdown}>
                      <NavLinkItem
                        marginMd
                        to={`/${baseUrl}/manage-users`}
                        heading='Manage Users'
                      />
                      {baseUrl === "super-admin" ? (
                        <NavLinkItem
                          marginMd
                          to={`/${baseUrl}/manage-products`}
                          heading='Manage Products'
                        />
                      ) : null}
                      <NavLinkItem
                        marginMd
                        to={`/${baseUrl}/manage-orders`}
                        heading='Manage Orders'
                      />
                    </div>
                  )}
                </div>
                <div className='divider' />
                <NavLinkItem
                  to={`/${baseUrl}/complaints-log`}
                  heading='Complaints Log'>
                  <SvgReport />
                </NavLinkItem>
                <div className='divider' />
                <NavLinkItem
                  to={`/${baseUrl}/activity-log`}
                  heading='Activity Log'>
                  <SvgNotification />
                </NavLinkItem>
                <div className='divider' />
                <NavLinkItem to={`/${baseUrl}/settings`} heading='Settings'>
                  <SvgSettings />
                </NavLinkItem>
                <div className='divider' />
                <NavLinkItem to={`/${baseUrl}/log-out`} heading='Log out'>
                  <SvgLogOut />
                </NavLinkItem>
                <div className='divider' />
              </div>
            </Content>
          </Portal>
        </Root>
      ) : (
        <div className={styles.sideBarContainer}>
          <div className={styles.sidebarInner}>
            <img src={logo} />
            <div className={styles.navLinksContainer}>
              <NavLinkItem to={`/${baseUrl}/dashboard`} heading='Overview'>
                <SvgDashboard />
              </NavLinkItem>
              <button
                className={`${styles.manageDropdownBtn} ${
                  manage && styles.active
                }`}
                onClick={() => setManage((state) => !state)}>
                <OrderStatusSvg />
                <h3>Manage</h3>
                {manage ? <SvgArrowUp /> : <SvgArrowDown />}
              </button>
              {manage && (
                <div className={styles.manageDropdown}>
                  <NavLinkItem
                    marginMd
                    to={`/${baseUrl}/manage-users`}
                    heading='Manage Users'
                  />
                  {baseUrl === "super-admin" ? (
                    <NavLinkItem
                      marginMd
                      to={`/${baseUrl}/manage-products`}
                      heading='Manage Products'
                    />
                  ) : null}
                  <NavLinkItem
                    marginMd
                    to={`/${baseUrl}/manage-orders`}
                    heading='Manage Orders'
                  />
                </div>
              )}
              <NavLinkItem
                to={`/${baseUrl}/complaints-log`}
                heading='Complaints Log'>
                <SvgReport />
              </NavLinkItem>
              <NavLinkItem
                to={`/${baseUrl}/activity-log`}
                heading='Activity Log'>
                <SvgNotification />
              </NavLinkItem>
              <NavLinkItem to={`/${baseUrl}/settings`} heading='Settings'>
                <SvgSettings />
              </NavLinkItem>
              <NavLinkItem to={`/${baseUrl}/log-out`} heading='Log out'>
                <SvgLogOut />
              </NavLinkItem>
            </div>
          </div>
          <div className={styles.footer}>
            <p>&copy; 2022 iFuel. All rights reserved.</p>
          </div>
        </div>
      )}
    </>
  );
};

export default SideBar;

import styles from "./style.module.css";
import logo from "../../assets/logo.svg";
import { NavLink, useNavigate } from "react-router-dom";
import Button from "../../Components/Button";
import profile from "../../assets/image/profile2.png";
import { ReactNode, useState } from "react";
import { ReactComponent as NotificationSvg } from "../../assets/navbericon/notification-outline.svg";
import { ReactComponent as CartSvg } from "../../assets/navbericon/cart-outline.svg";
import { ReactComponent as HamburgerSvg } from "../../assets/navbericon/hamburger.svg";
import { ReactComponent as SvgSearchIcon } from "../../assets/navbericon/mobileSearch.svg";
import { ReactComponent as SearchIconWBorder } from "../../assets/navbericon/searchIcon.svg";
import { User } from "../../../src/types/shared";
import { getInitials, limitText } from "../../../src/Custom hooks/helpers";
import useMediaQuery from "../../../src/Custom hooks/useMediaQuery";
import { Content, Root, Trigger } from "@radix-ui/react-dialog";

const Header = ({ user }: { user: User }) => {
  const navigate = useNavigate();

  const toCart = () => {
    navigate("/cart");
  };

  const toLogin = () => {
    navigate("/start-page");
  };

  return (
    <div className={styles.headerContainer}>
      <div className={styles.flexHeader}>
        <img alt='' src={logo} />
        {!user && (
          <div className={styles.linksContainer}>
            <NavLink to='/' style={{ textDecoration: "none" }}>
              {({ isActive }) => (
                <span className={`${isActive && styles.active}`}>Home</span>
              )}
            </NavLink>
            <NavLink to='/support' style={{ textDecoration: "none" }}>
              {({ isActive }) => (
                <span className={`${isActive && styles.active}`}>Support</span>
              )}
            </NavLink>
          </div>
        )}
      </div>

      <div className={`${styles.flexHeader}`}>
        <div className={styles.lg}>
          <div className={`${styles.searchBar}`}>
            <input placeholder='Enter Keyword' />
            <SvgSearchIcon className={styles.searchIcon} />
          </div>

          {!user ? (
            <Button
              variant='primary'
              text='login'
              width='150px'
              onClick={toLogin}
            />
          ) : (
            <>
              <button>
                <NotificationSvg width={52} />
              </button>
              <button onClick={toCart} className={styles.btnCart}>
                <CartSvg width={52} />
              </button>
            </>
          )}
        </div>

        <div className={styles.mobile}>
          <button>
            <HamburgerSvg width={48} />
          </button>
          <button>
            <SearchIconWBorder width={48} />
          </button>
        </div>

        <ProfileModal user={user}>
          <button className={styles.imageHolder} style={{ cursor: "pointer" }}>
            {getInitials(user)}
          </button>
        </ProfileModal>
      </div>
    </div>
  );
};

const ProfileModal = ({
  user,
  children,
}: {
  user?: Partial<User>;
  children: ReactNode;
}) => {
  const navigate = useNavigate();
  const matches = useMediaQuery("(min-width: 800px)");

  const logout = () => {
    localStorage.removeItem("user");
    navigate("/");
    //@ts-ignore
    window.location.reload(false);
  };
  // console.log(user, "This is the user");
  return (
    <>
      <Root>
        <Trigger>{children}</Trigger>
        {user && (
          <Content className={styles.modalContainer}>
            <div className={styles.profileContainer}>
              <div className={styles.imageHolder}>{getInitials(user)}</div>
              {/* <img src={user.profileImage} alt="" /> */}

              <div className={styles.profileText}>
                <h3>{user?.name}</h3>
                <p>
                  {matches
                    ? limitText(user.email, 35)
                    : limitText(user.email, 17)}
                </p>
              </div>
            </div>

            <div className='divider' />
            <div className={styles.profileLinksContainer}>
              <button onClick={() => navigate("/customer/profile")}>
                View Profile
              </button>
              <button>View Orders</button>
              <button>Track Order</button>
              <button>Support</button>
            </div>
            <div className='divider' />
            <div className={styles.logoutContainer}>
              <button onClick={logout}>logout</button>
            </div>
          </Content>
        )}
      </Root>
    </>
  );
};

export default Header;

import styles from "./style.module.css";
import logo from "../../assets/logo.svg";
import { NavLink, useNavigate } from "react-router-dom";
import Button from "../../Components/Button";
import profile from "../../assets/image/profile2.png";
import { useState } from "react";
import { ReactComponent as NotificationSvg } from "../../assets/navbericon/notification-outline.svg";
import { ReactComponent as CartSvg } from "../../assets/navbericon/cart-outline.svg";
import { ReactComponent as HamburgerSvg } from "../../assets/navbericon/cart-outline.svg";
import { ReactComponent as SvgSearchIcon } from "../../assets/navbericon/mobileSearch.svg";
import { ReactComponent as SearchIconWBorder } from "../../assets/navbericon/cart-outline.svg";
import { User } from "../../../src/types/shared";
import { getInitials, limitText } from "../../../src/Custom hooks/helpers";
import useMediaQuery from "../../../src/Custom hooks/useMediaQuery";

const Header = ({ user }: { user: User }) => {
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);

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
        <div className={styles.mobile}>
          <button>
            <SearchIconWBorder width={48} />
          </button>
          {!user ? (
            <button>
              <HamburgerSvg width={48} />
            </button>
          ) : (
            <>
              <button>
                <NotificationSvg width={48} />
              </button>
              <button onClick={toCart} className={styles.btnCart}>
                <CartSvg width={48} />
              </button>
              <img
                alt=''
                src={profile}
                onClick={() => setOpen((state) => !state)}
              />
            </>
          )}
        </div>
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
              {/* <img src={profile} onClick={() => setOpen((state) => !state)} /> */}
              <div
                className={styles.imageHolder}
                style={{ cursor: "pointer" }}
                onClick={() => setOpen((state) => !state)}>
                {getInitials(user)}
              </div>
            </>
          )}
        </div>
        <ProfileModal user={user} open={open} />
      </div>
    </div>
  );
};

const ProfileModal = ({ user, open }: { user: User; open: boolean }) => {
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
      {open && (
        <div className={styles.modalContainer}>
          <div className={styles.profileContainer}>
            <div className={styles.imageHolder}>{getInitials(user)}</div>
            {/* <img src={user.profileImage} alt="" /> */}

            <div className={styles.profileText}>
              <h3>{user.name}</h3>
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
        </div>
      )}
    </>
  );
};

export default Header;

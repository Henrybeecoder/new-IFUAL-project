import styles from "./style.module.css";
import profile from "../../assets/image/profile3.png";
import { Dispatch, useState } from "react";
import useMediaQuery from "../../Custom hooks/useMediaQuery";
import logo from "../../assets/logo.svg";
import { SetStateAction } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { ReactComponent as HamburgerSvg } from "../../assets/navbericon/hamburger.svg";
import { ReactComponent as NotificationSvg } from "../../assets/navbericon/notification-outline.svg";
import { ReactComponent as BoxBarSvg } from "../../assets/navbericon/boxBar.svg";
import { ReactComponent as SearchIcon } from "../../assets/navbericon/mobileSearch.svg";
import { ReactComponent as SvgSearchIcon } from "../../assets/navbericon/mobileSearch.svg";
import { ReactComponent as SearchIconWBorder } from "../../assets/navbericon/searchIcon.svg";

interface HeaderProps {
  user?: any;
  setOpen?: Dispatch<SetStateAction<boolean>>;
}

const Header = ({ user, setOpen = () => {} }: HeaderProps) => {
  const navigate = useNavigate();

  const matches = useMediaQuery("(min-width: 800px)");

  const [profileModal, setProfileModal] = useState(false);

  const [searchActive, setSearchActive] = useState(false);

  return (
    <>
      <div className={styles.headerContainer}>
        <img src={logo} style={{ width: searchActive ? "40px" : "" }} />
        {!matches ? (
          <div className={styles.flexHeaderSm}>
            {searchActive ? (
              <div className={styles.searchBarSm}>
                <input placeholder='Enter Keyword' />
                <SvgSearchIcon className={styles.searchIcon} />
              </div>
            ) : (
              <button onClick={() => setSearchActive(true)}>
                <SearchIconWBorder width={48} />
              </button>
            )}
            <button
              style={{ marginLeft: "7px" }}
              onClick={() => setOpen((state) => !state)}>
              <HamburgerSvg />
            </button>
          </div>
        ) : (
          <div className={`${styles.flexHeader}`}>
            <div className={`${styles.searchBar}`}>
              <input placeholder='Enter Keyword' />

              <div className={styles.searchIcon}>
                <SearchIcon />
              </div>
            </div>
            <NavLink
              to={`/vendor/notification`}
              style={{ marginRight: "15px" }}>
              {({ isActive }) => (
                <NotificationSvg
                  style={{ stroke: !isActive ? "#344437" : "#36b44a" }}
                />
              )}
            </NavLink>
            <BoxBarSvg style={{ marginRight: "15px" }} />
            <img
              src={profile}
              onClick={() => setProfileModal((state) => !state)}
            />
          </div>
        )}
        <ProfileModal user={user} open={profileModal} />
      </div>
    </>
  );
};

const ProfileModal = ({ user, open }: { user: any; open: boolean }) => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <>
      {open && (
        <div className={styles.modalContainer}>
          <div className={styles.profileContainer}>
            <img src={profile} />
            <div className={styles.profileText}>
              <h3>{user.name}</h3>
              <p>{user.email}</p>
            </div>
          </div>
          <div className='divider' />
          <div className={styles.profileLinksContainer}>
            <button onClick={() => navigate("/vendor/profile")}>
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

import styles from "./style.module.css";
import { NavLink, useNavigate } from "react-router-dom";
import Button from "../../Components/Button";
import {
  SearchIconWBorder,
  SvgArrowLeft,
  SvgBellOutline,
  SvgCartOutline,
  SvgHamburger,
  SvgSearchIcon,
} from "../../assets/Svgs";
import profile from "../../assets/image/profile3.png";
import { Dispatch, useState } from "react";
import useMediaQuery from "../../Custom hooks/useMediaQuery";
import logo from "../../assets/logo.svg";
import { SetStateAction } from "react";

interface HeaderProps {
  baseUrl: "admin" | "super-admin";
  user?: any;
  backBtn?: boolean;
  onClickBackBtn?: () => void;
  setOpen?: Dispatch<SetStateAction<boolean>>;
}

const Header = ({
  baseUrl,
  user,
  backBtn,
  onClickBackBtn,
  setOpen = () => {},
}: HeaderProps) => {
  const navigate = useNavigate();

  const matches = useMediaQuery("(min-width: 800px)");

  const [profileOpen, setProfileOpen] = useState(false);

  const toLogin = () => {
    navigate("/login");
  };

  const toggleProfileModal = () => {
    setProfileOpen((state) => !state);
  };

  return (
    <>
      <div className={styles.headerContainer}>
        <div className={styles.flexHeader} style={{ alignItems: "flex-end" }}>
          {backBtn && (
            <button className={styles.btnBack} onClick={onClickBackBtn}>
              <SvgArrowLeft />
              <p>Back</p>
            </button>
          )}
          {!matches && <img src={logo} />}
        </div>

        <div className={`${styles.flexHeader}`}>
          <div className={styles.mobileMenu}>
            <SearchIconWBorder />
          </div>
          <div className={`${styles.searchBar} ${styles.hiddenMobile}`}>
            <input placeholder='Enter Keyword' />
            <div className={styles.searchIcon}>
              <SvgSearchIcon />
            </div>
          </div>
          {!user ? (
            <div className={styles.hiddenMobile}>
              <Button
                variant='primary'
                text='login'
                width='150px'
                onClick={toLogin}
              />
            </div>
          ) : (
            <div className={styles.flexIcons}>
              <NavLink to={`/${baseUrl}/notification`} style={{}}>
                {({ isActive }) => (
                  <SvgBellOutline
                    style={{ stroke: !isActive ? "#344437" : "#36b44a" }}
                  />
                )}
              </NavLink>

              {!matches ? (
                <button
                  style={{ marginLeft: "7px" }}
                  onClick={() => setOpen((state) => !state)}>
                  <SvgHamburger />
                </button>
              ) : (
                <img src={profile} onClick={toggleProfileModal} />
              )}
              <ProfileModal user={user} open={profileOpen} />
            </div>
          )}
        </div>
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
            <button>View Profile</button>
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

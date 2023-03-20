import styles from "./style.module.css";
import logo from "../../assets/logo.svg";
import { NavLink, useNavigate } from "react-router-dom";
import Button from "../../Components/Button";
import notificationLogo from "../../assets/svg/Ellipse.svg";
import { Fragment, ReactNode, useState } from "react";
import { ReactComponent as NotificationSvg } from "../../assets/navbericon/notification-outline.svg";
import { ReactComponent as CartSvg } from "../../assets/navbericon/cart-outline.svg";
import { ReactComponent as HamburgerSvg } from "../../assets/navbericon/hamburger.svg";
import { ReactComponent as SvgSearchIcon } from "../../assets/navbericon/mobileSearch.svg";
import { ReactComponent as SearchIconWBorder } from "../../assets/navbericon/searchIcon.svg";
import { User } from "../../t/shared";
import { getInitials, limitText } from "../../../src/Custom hooks/helpers";
import useMediaQuery from "../../../src/Custom hooks/useMediaQuery";
import { Content, Root, Trigger } from "@radix-ui/react-dialog";
import X from "../../assets/svg/x.svg";

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
            <NavLink to='/' end style={{ textDecoration: "none" }}>
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

      <div className={`${styles.flexHeaderRight}`}>
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
              <Root>
                <Trigger>
                  <NotificationSvg width={52} />
                </Trigger>
                <Content className={styles.nModal}>
                  <NotificationModal />
                </Content>
              </Root>
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

        <ProfileModal user={user}>{getInitials(user)}</ProfileModal>
      </div>
    </div>
  );
};

const notData = [
  {
    id: "1",
    title: "Bently Ltd confirmed your order.",
    time: "14 hours ago",
    status: "sealed",
  },
  {
    id: "2",
    title: "Bently Ltd confirmed your order.",
    time: "14 hours ago",
    status: "sealed",
  },
  {
    id: "3",
    title: "Bently Ltd confirmed your order.",
    time: "14 hours ago",
    status: "opened",
  },
  {
    id: "4",
    title: "Bently Ltd confirmed your order.",
    time: "14 hours ago",
    status: "opened",
  },
  {
    id: "5",
    title: "Bently Ltd confirmed your order.",
    time: "14 hours ago",
    status: "opened",
  },
  {
    id: "6",
    title: "Bently Ltd confirmed your order.",
    time: "14 hours ago",
    status: "opened",
  },
  {
    id: "7",
    title: "Bently Ltd confirmed your order.",
    time: "14 hours ago",
    status: "opened",
  },
];

const NotificationModal = () => {
  const navigate = useNavigate();
  const matches = useMediaQuery("(min-width: 800px)");

  const [active, setActive] = useState<string | undefined>();
  const activeNData = notData.find((not) => active === not.id);

  //TODO fetch data

  return (
    <>
      {activeNData && (
        <div className={styles.activeNOuter}>
          <div className={styles.activeN}>
            <button
              className={styles.closeModalX}
              onClick={() => setActive(undefined)}>
              <img alt='closemodal' src={X} />
            </button>

            <div className={styles.activeNFlex}>
              <img alt='nLogo' src={notificationLogo} />

              <h3>{activeNData.title.slice(0, 11)}</h3>

              <p>{activeNData.time}</p>
            </div>

            <p>
              Bently is on the way for delivery of 200 litres of diesel to No.
              25, Bello Street, Ikotun.
            </p>
          </div>
        </div>
      )}
      {notData.slice(0, 6).map((not) => (
        <Fragment key={not.id}>
          <div className='divider' />
          <div
            className={styles.notificationContainer}
            onClick={() => setActive(not.id)}>
            <div
              style={{
                backgroundColor:
                  not.status === "opened" ? "#3444374a" : "#36B44A",
              }}
              className={`${
                not.status === "opened"
                  ? styles.nStatusOpened
                  : styles.nStatusClosed
              } ${styles.nIndicator}`}
            />
            <img alt='nLogo' src={notificationLogo} />
            <div className={styles.nTextArea}>
              <h3>{not.title}</h3>
              <p>{not.time}</p>
            </div>
          </div>
        </Fragment>
      ))}
    </>
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
      {user && (
        <Root>
          <Trigger className={styles.imageHolder}>{children}</Trigger>
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
        </Root>
      )}
    </>
  );
};

export default Header;

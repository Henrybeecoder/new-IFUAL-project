import styles from "./style.module.css";
import { NavLink } from "react-router-dom";
import { ReactNode } from "react";

interface NavLinkProps {
  heading: string;
  to: string;
  children?: ReactNode;
  marginMd?: boolean;
}

const NavLinkItem = ({ heading, to, children, marginMd }: NavLinkProps) => {
  return (
    <NavLink to={to} style={{ textDecoration: "none" }}>
      {({ isActive }) => (
        <div
          className={`${styles.flexLink} ${
            marginMd ? styles.marginMd : styles.marginLg
          } ${isActive && styles.active}`}>
          {children}
          <h3>{heading}</h3>
        </div>
      )}
    </NavLink>
  );
};

export default NavLinkItem;

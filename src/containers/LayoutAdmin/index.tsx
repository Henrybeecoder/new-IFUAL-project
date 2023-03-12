import { useState, ReactNode } from "react";
import Header from "../SharedLayoutAdmin/Header";
import SideBar from "../SharedLayoutAdmin/SideBar";
import styles from "../SharedLayoutAdmin/style.module.css";

interface LayoutProps {
  children: ReactNode;
  backBtn?: boolean;
  onClickBackBtn?: () => void;
}

const LayoutCustomer = ({ children, backBtn, onClickBackBtn }: LayoutProps) => {
  const userStr = localStorage.getItem("user");
  const user = userStr && JSON.parse(userStr);

  const [open, setOpen] = useState(false);

  return (
    <>
      <div className={styles.flex}>
        <SideBar open={open} setOpen={setOpen} baseUrl='admin' />
        <div className={styles.relative}>
          <Header
            baseUrl='admin'
            setOpen={setOpen}
            user={user}
            backBtn={backBtn}
            onClickBackBtn={onClickBackBtn}
          />
          <div className={styles.page}>{children}</div>
        </div>
      </div>
    </>
  );
};

export default LayoutCustomer;

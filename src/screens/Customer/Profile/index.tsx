import styles from "./style.module.css";
import { useNavigate } from "react-router-dom";
import { SvgArrowback, SvgEdit } from "../../../assets/Svgs";
import LayoutCustomer from "../../../containers/LayoutCustomer";
import profile from "../../../assets/image/profile2Lg.png";
import { useState } from "react";
import { CustomerProfile } from "../../../Components/Profile";

const Profile = () => {
  const navigate = useNavigate();

  const [page, setPage] = useState("home");

  const backHome = () => navigate("/");

  const [changePassword, setChangePassword] = useState(false);

  return (
    <LayoutCustomer>
      <div className={styles.breadCrumb}>
        <button onClick={backHome}>
          <SvgArrowback />
          <p>Back to Home</p>
        </button>
      </div>

      <div className={styles.header}>
        <h3>Basic Profile</h3>
        {!changePassword && (
          <button
            className={`${styles.flexEdit} ${
              page === "edit" && styles.flexEditActive
            }`}
            onClick={() =>
              setPage((state) => (state !== "edit" ? "edit" : "home"))
            }>
            <h2>Edit</h2>
            <SvgEdit />
          </button>
        )}
      </div>
      <CustomerProfile
        page={page}
        changePassword={changePassword}
        setChangePassword={setChangePassword}
        backHome={backHome}
        edit={page === "edit"}
        setEditFalse={() => setPage("home")}
      />
    </LayoutCustomer>
  );
};

export default Profile;

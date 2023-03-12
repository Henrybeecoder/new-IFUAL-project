import React from "react";
import PageHeader, { EditBtn } from "../../../Components/PageHeader";
import { useRef, useState } from "react";
import Layout from "../../../containers/LayoutVendor";
import styles from "./style.module.css";
import profileImage from "../../../assets/image/companyName.png";
import { InputTemp } from "../../../Components/InputTemp";
import Button from "../../../Components/Button";
import { Form, Formik } from "formik";

const Profile = () => {
  const [page, setPage] = useState("home");
  const imageRef = useRef<HTMLInputElement>(null);

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const handleImage = () => {};

  return (
    <Layout>
      <PageHeader pageTitle="Basic Profile" backBtn>
        {page !== "change-password" && (
          <EditBtn onClick={() => setPage(page !== "edit" ? "edit" : "home")} />
        )}
      </PageHeader>
      <div className={styles.metaSection}>
        <div style={{ position: "relative", width: "fit-content" }}>
          {page === "edit" && (
            <div className={styles.changeImage}>
              <input
                hidden
                ref={imageRef}
                type="file"
                accept="image/*"
                onChange={handleImage}
              />
              <button
                onClick={() => imageRef.current && imageRef.current.click()}
              >
                Change Image
              </button>
            </div>
          )}
          <img src={profileImage} />
        </div>
        <div
          className={styles.textArea}
          style={{ opacity: page === "edit" ? 0.5 : 1 }}
        >
          <div>
            <h3>Account Details</h3>
            <p>0123456789</p>
            <h2>Sterling Bank</h2>
          </div>
          <button onClick={() => setPage("change-password")}>
            Change Password
          </button>
        </div>
      </div>
      <div className="divider" style={{ margin: "30px 0" }} />

      {page !== "change-password" ? (
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        <Formik initialValues={{}} onSubmit={() => {}}>
          {({}) => (
            <Form className={styles.inputSection}>
              <h2>Company Information</h2>
              <div className="input-flex-btwn">
                <InputTemp
                  disabled={!(page === "edit")}
                  label="COMPANY NAME"
                  value="Aristocrat Plc"
                  marginRight
                />
                <InputTemp
                  disabled={!(page === "edit")}
                  label="REPRSENTATIVE NAME"
                  value="Aliu Jinadu"
                  marginLeft
                />
              </div>
              <div className="input-flex-btwn">
                <InputTemp
                  disabled={!(page === "edit")}
                  label="DATE OF REGISTRATION"
                  value="23/12/2012"
                  marginRight
                />
                <InputTemp
                  disabled={!(page === "edit")}
                  label="REGISTRATION NUMBER"
                  placeholder="Aliu Jinadu"
                  value="37198jdhs83892"
                  marginLeft
                />
              </div>
              <InputTemp
                disabled={!(page === "edit")}
                label="OPERATION LOCATION"
                value="Abeokuta, Lagos, Maiduguri"
              />
              <InputTemp
                disabled={!(page === "edit")}
                label="DETAIL"
                placeholder="Detail"
              />
            </Form>
          )}
        </Formik>
      ) : (
        <Formik initialValues={{}} onSubmit={() => {}}>
          {({ getFieldProps }) => (
            <Form className={styles.CPSection}>
              <h2>Change Password</h2>
              <InputTemp label="CURRENT PASSWORD" placeholder="New Password" />
              <InputTemp label="NEW PASSWORD" placeholder="New Password" />
              <InputTemp label="CONFIRM PASSWORD" placeholder="New Password" />
              <div className="flex-btwn">
                <Button text="Back" width="37%" />
                <Button text="Change" variant="primary" width="60%" />
              </div>
            </Form>
          )}
        </Formik>
      )}
    </Layout>
  );
};

export default Profile;

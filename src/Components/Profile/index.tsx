import styles from "./style.module.css";
import { InputTemp, TextareaTemp } from "../InputTemp";
import { ChangeEvent, ReactNode, useRef, useState, useEffect } from "react";
import useMediaQuery from "../../Custom hooks/useMediaQuery";
import Button from "../Button";
import { useNavigate, useSearchParams } from "react-router-dom";
import { customer_data } from "../../screens/SharedAdmin/ManageUsers/data";
import { ReactComponent as StarSvg } from "../../assets/svg/star.svg";
import UploadImageTemp from "../UploadImageTemp";
import { customerBaseUrl } from "../../utils/baseUrl";
import errorAlert from "../../assets/svg/errorAlert.svg";
import { SelectTemp } from "../../Components/InputTemp";
import { ToastContainer, toast } from "react-toastify";
import Loading from "../../Components/Loading";
import axios from "axios";
import ChangePassword from "./ChangePassword";
import ChangePaymentCard from "./ChangePaymentCard";
import ChangeAccount from "./ChangeAccount";

interface CustomerProfileProps {
  profileImg: string;
  children?: ReactNode;
  data?: any;
  page?: any;
  changePassword?: any;
  setChangePassword?: any;
  backHome?: any;
  edit?: boolean;
}

interface VendorProfileProps {
  profileImg: string;
  children?: ReactNode;
  data?: any;
  setActiveModal?: (string: string | null) => void;
}

export const CustomerProfile = ({
  profileImg,
  children,
  page,
  changePassword,
  setChangePassword,
  backHome,
  edit = true,
}: CustomerProfileProps) => {
  const matches = useMediaQuery("(min-width: 800px)");

  const [profileImage, setProfileImage] = useState(profileImg);

  const handleImage = (e: any) => {
    const file = e.target?.files?.[0];
    setProfileImage(URL.createObjectURL(file));
  };

  const [searchparams] = useSearchParams();

  const customerId = searchparams.get("customer");
  const str = localStorage.getItem("user");
  const newUser = str && JSON.parse(str);

  const [firstName, setFirstName] = useState(newUser?.firstName);
  const [lastName, setLastName] = useState(newUser?.lastName);
  const [phoneNumber, setPhoneNumber] = useState(newUser?.phoneNumber);
  const [email, setEmail] = useState(newUser?.email);
  const [homeAddress, setHouseAddress] = useState(newUser?.homeAddress);
  const [companyAddress, setCompanyAddress] = useState(newUser?.companyAddress);
  const [state, setState] = useState(newUser?.state);
  const [lga, setLga] = useState(newUser?.lga);
  const [loading, setLoading] = useState(false);

  const [stateValue, setStateValue] = useState<any>({ label: "SELECT STATE" });
  console.log(stateValue);
  const [lgaValue, setLgaValue] = useState({ label: "SELECT LGA" });
  const [allStateData, setAllStateData] = useState([]);
  const [lgaStateData, setLgaStateData] = useState([]);

  const [changeAccount, setChangeAccount] = useState(false);
  const [changeMainAccount, setChangeMainAccount] = useState(true);
  const [changePaymentCard, setChangePaymentCard] = useState(false);

  const getAllState = () => {
    setLoading(true);
    axios
      .get(`${customerBaseUrl}Account/GetState`)
      .then((response) => {
        setAllStateData(response.data.data);

        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  const handleLgaGlobalChange = (event: any) => {
    if (stateValue?.value?.length > 1) {
      setLgaValue(event);
    } else {
      toast.error("Please Select a State First");
    }
  };
  const handleStateGlobalChange = (event: any) => {
    setStateValue(event);
  };

  useEffect(() => {
    getAllState();
    setLoading(true);
    axios
      .get(`${customerBaseUrl}Account/GetLocalGovt/${stateValue.value}`)
      .then((response) => {
        setLgaStateData(response.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [stateValue.value]);
  const EditAccount = () => {
    setLoading(true);
    let editAccountPayload = {
      firstName: firstName,
      lastName: lastName,
      mobileNumber: phoneNumber,
      emailAddress: email,
      houseAddress: homeAddress,
      companyAddress: companyAddress,
      stateId: stateValue.value,
      lga: lgaValue.value,
    };
    axios
      .post(`${customerBaseUrl}Account/EditCustomer`, editAccountPayload)
      .then((response) => {
        console.log(response);
        if (response) {
          console.log(response);
          backHome();
          toast.success("Profile Edited Successfully");
          setLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };
  const changePasswordOnCick = () => {
    setChangePassword(true);
    setChangeAccount(false);
    setChangeMainAccount(false);
    setChangePaymentCard(false);
  };

  const changeMainAccountOnClick = () => {
    setChangeAccount(false);
    setChangePassword(false);
    setChangePaymentCard(false);
    setChangeMainAccount(true);
  };
  const changePaymentCardOnClick = () => {
    setChangePaymentCard(true);
    setChangeAccount(false);
    setChangePassword(false);
    setChangeMainAccount(false);
  };
  const changeAccountOnClick = () => {
    setChangePaymentCard(false);
    setChangeAccount(true);
    setChangePassword(false);
    setChangeMainAccount(false);
  };

  return (
    <>
      {loading && <Loading />}
      <ToastContainer
        position='bottom-right'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='light'
      />
      <div className={styles.container}>
        <div
          className={styles.metaSection}
          style={{ opacity: page === "edit" ? 0.5 : 1 }}>
          <UploadImageTemp src={profileImage} btnText='Change Image' />
          <div>
            <h3>Account Details</h3>
            <p>{newUser?.bankAccountNumber}</p>
            <h2>Sterling Bank</h2>
            {children}

            <div className={styles.btns}>
              <button
                onClick={changeAccountOnClick}
                className={
                  changeAccount ? `${styles.click}` : `${styles.normal} `
                }>
                Change account
              </button>
              <button
                onClick={changePaymentCardOnClick}
                className={
                  changePaymentCard ? `${styles.click}` : `${styles.normal} `
                }>
                Add Payment Card
              </button>
              <button
                onClick={changePasswordOnCick}
                className={
                  changePassword ? `${styles.click}` : `${styles.normal} `
                }>
                Change Password
              </button>
            </div>
          </div>
        </div>
        <div className={styles.inputSection}>
          {changePassword && (
            <ChangePassword
              newUser={newUser}
              setLoading={setLoading}
              backToProfile={changeMainAccountOnClick}
            />
          )}
          {changeMainAccount && (
            <>
              <div className={styles.inputFlex}>
                <InputTemp
                  marginRightSm
                  label={"FIRST NAME"}
                  placeholder='Enter first name'
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
                <InputTemp
                  marginLeftSm
                  label='SURNAME'
                  placeholder='Enter last name'
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
              <div className={styles.inputFlex}>
                <InputTemp
                  marginRightSm
                  label='PHONE NUMBER'
                  placeholder='Enter phone number'
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
                <InputTemp
                  marginLeftSm
                  label='EMAIL ADDRESS'
                  placeholder='Enter email address'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <InputTemp
                label='HOUSE ADDRESS'
                placeholder='Enter house address'
                value={homeAddress}
                onChange={(e) => setHouseAddress(e.target.value)}
              />
              <InputTemp
                label='COMPANY ADDRESS'
                placeholder='Enter Company Address'
                value={companyAddress}
                onChange={(e) => setCompanyAddress(e.target.value)}
              />
              <div className={styles.inputFlex}>
                <SelectTemp
                  marginRightSm
                  mode='dark'
                  options={allStateData.map((state) => ({
                    label: state.text,
                    value: state.value,
                  }))}
                  value={stateValue}
                  onValueChange={handleStateGlobalChange}
                  className={styles.singleFilterSelect}
                />

                <SelectTemp
                  marginRightSm
                  mode='dark'
                  options={lgaStateData.map((state) => ({
                    label: state.text,
                    value: state.value,
                  }))}
                  value={lgaValue}
                  onValueChange={handleLgaGlobalChange}
                  className={styles.singleFilterSelect}
                />
              </div>
              {page !== "edit" && (
                <div className={styles.buttonFlex}>
                  <Button
                    text='Cancel'
                    variant='outlinePrimary'
                    width='20%'
                    className={styles.cancelButton}
                  />
                  <Button
                    text='Save'
                    variant='primary'
                    width='20%'
                    onClick={EditAccount}
                  />
                </div>
              )}
            </>
          )}

          {changeAccount && (
            <ChangeAccount
              newUser={newUser}
              setLoading={setLoading}
              backToProfile={changeMainAccountOnClick}
              edit={edit}
            />
          )}

          {changePaymentCard && <ChangePaymentCard />}
        </div>
      </div>
    </>
  );
};

export const VendorProfile = ({
  profileImg,
  children,
  data,
  setActiveModal = () => {},
}: VendorProfileProps) => {
  const page = undefined;

  const navigate = useNavigate();
  const imageRef = useRef<HTMLInputElement>(null);

  const [profileImage, setProfileImage] = useState(profileImg);

  const handleImage = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target?.files?.[0];
    if (!file) return;
    setProfileImage(URL.createObjectURL(file));
  };

  const vendorId = "new";

  return (
    <>
      <div className={styles.container}>
        <div
          className={styles.metaSection}
          style={{ opacity: page === "edit" ? 0.5 : 1 }}>
          <div style={{ position: "relative", width: "fit-content" }}>
            {page === "edit" && (
              <div className={styles.changeImage}>
                <input
                  hidden
                  ref={imageRef}
                  type='file'
                  accept='image/*'
                  onChange={handleImage}
                />
                <button
                  onClick={() => imageRef.current && imageRef.current.click()}>
                  Change Image
                </button>
              </div>
            )}
            <img src={profileImage} alt='' />
          </div>
          <div>
            <h3>Account Details</h3>
            <p>0123456789</p>
            <h2>Sterling Bank</h2>
            {children}
          </div>
        </div>

        {/* section 2 */}
        <div className={styles.section2}>
          {vendorId === "new" ? (
            <>
              <div className={styles.quickStatsSection}>
                <h3>QUICK STATS</h3>
                <div className={styles.quickStatsContainer}>
                  <p>
                    Orders Completed: <span>20</span>
                  </p>
                  <div className='divider' />
                  <p>
                    Orders Rejacted: <span>5</span>
                  </p>
                  <div className='divider' />
                  <p>
                    Total Revenue: <span>N2,000,000.00</span>
                  </p>
                  <div className='divider' />
                  <p>
                    Rating:{" "}
                    <span>
                      5 <StarSvg />{" "}
                    </span>
                  </p>
                </div>
              </div>
              <div className='divider' />
            </>
          ) : null}
          <div className={styles.inputSection}>
            <h3>COMPANY DETAILS</h3>
            <div className={styles.inputFlex}>
              <InputTemp
                marginRightSm
                label={"COMPANY NAME"}
                placeholder='Aristocrat Plc'
              />
              <InputTemp
                marginLeftSm
                label='REPRESENTATIVE NAME'
                placeholder='Aliu Jinadu'
              />
            </div>
            <div className={styles.inputFlex}>
              <InputTemp
                marginRightSm
                label='DATE OF REGISTRATION'
                placeholder='23/12/2012'
              />
              <InputTemp
                marginLeftSm
                label='REGISTRATION NUMBER'
                placeholder='37198jdhs83892'
              />
            </div>
            <TextareaTemp
              label='OPERATION LOCATIONS'
              placeholder='Kosafe, Lagos'
              rows={3}
            />
            {data?.status === "pending" ? (
              <div className={styles.btnFooter}>
                <Button
                  text='Decline'
                  width='40%'
                  onClick={() => setActiveModal("decline")}
                />
                <Button text='Approve' variant='dark' width='57%' />
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
};

const PassWordMisMatch = () => {
  return (
    <div className={styles.passwordMisMatch}>
      <img src={errorAlert} alt='' />
      <p>Both passwords don’t match</p>
    </div>
  );
};

import styles from "./style.module.css";
import { InputTemp, TextareaTemp } from "../InputTemp";
import {
  ChangeEvent,
  ReactNode,
  useRef,
  useState,
  useEffect,
  useMemo,
} from "react";
import Button from "../Button";
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
import { State, User } from "../../t/shared";
import { Formik } from "formik";

interface CustomerProfileProps {
  children?: ReactNode;
  data?: any;
  page?: any;
  changePassword?: any;
  setChangePassword?: any;
  backHome?: any;
  edit?: boolean;
  setEditFalse: () => void;
}

interface VendorProfileProps {
  children?: ReactNode;
  data?: any;
  setActiveModal?: (string: string | null) => void;
}

type SelectEvent = { label: string; value?: string };

export const CustomerProfile = ({
  children,
  page,
  changePassword,
  setChangePassword,
  backHome,
  edit = true,
  setEditFalse,
}: CustomerProfileProps) => {
  const str = localStorage.getItem("user");
  const newUser: User = useMemo(() => str && JSON.parse(str), [str]);
  const formValues: Omit<
    User,
    "profileImage" | "bankAccountNumber" | "state" | "lga" | "token"
  > & { state: SelectEvent; lga: SelectEvent } = {
    companyAddress: newUser.companyAddress || "",
    email: newUser.email || "",
    firstName: newUser.firstName || "",
    lastName: newUser.lastName || "",
    homeAddress: newUser.homeAddress || "",
    lga: { label: newUser.lga } || { label: "SELECT LGA" },
    name: newUser.name || "",
    phoneNumber: newUser.phoneNumber || "",
    state: { label: newUser.state, value: newUser.state } || {
      label: "SELECT STATE",
    },
  };

  const [data, setData] = useState<{ lgas: any[]; states: any[] }>({
    lgas: [],
    states: [],
  });

  const [loading, setLoading] = useState(false);

  const [changeAccount, setChangeAccount] = useState(false);
  const [changeMainAccount, setChangeMainAccount] = useState(true);
  const [changePaymentCard, setChangePaymentCard] = useState(false);

  const getLGAS = async (state: string) => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `${customerBaseUrl}Account/GetLocalGovt/${state}`
      );
      setData((prevState) => ({ ...prevState, lgas: data.data }));
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  };

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const { data } = await axios.get<{ data: State[] }>(
          `${customerBaseUrl}Account/GetState`
        );
        const str = localStorage.getItem("user");
        const user: User = str && JSON.parse(str);
        const userStateId = data.data.find(
          (state) => state.text === user.state
        );
        const { data: lgasData } = await axios.get<{ data: State[] }>(
          `${customerBaseUrl}Account/GetLocalGovt/${userStateId.value}`
        );
        setData({ lgas: lgasData.data, states: data.data });
        setLoading(false);
      } catch (err) {
        setLoading(false);
      }
    })();
  }, []);

  const editAccount = async (values: typeof formValues) => {
    setLoading(true);
    let payload = {
      firstName: values.firstName,
      lastName: values.lastName,
      mobileNumber: values.phoneNumber,
      emailAddress: values.email,
      houseAddress: values.homeAddress,
      companyAddress: values.companyAddress,
      stateId: values.state.value,
      lga: values.lga.value,
    };
    try {
      const { data: response } = await axios.post(
        `${customerBaseUrl}Account/EditCustomer`,
        payload
      );
      if (response) {
        console.log(response);
        backHome();
        toast.success("Profile Edited Successfully");
        setLoading(false);
      }
    } catch (err) {
      setLoading(false);
    }
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

  //replace with user profile image (currently not an image string)
  const [profileImagePreview, setProfileImagePreview] = useState<{
    url: string | undefined;
    file?: File | null;
  }>({ url: `data:image/png;base64,${newUser.profileImage}` });

  const handleImage = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target?.files?.[0];
    if (!file) return;
    //if previous preview was a blob url revoke to save memory
    if (
      profileImagePreview?.url &&
      profileImagePreview?.url.slice(0, 5) === "blob:"
    ) {
      URL.revokeObjectURL(profileImagePreview?.url);
    }
    setProfileImagePreview({ url: URL.createObjectURL(file), file });
  };

  const changeImage = async () => {
    let form = new FormData();
    form.append("UploadImage", profileImagePreview?.file);
    setLoading(true);
    try {
      const { data } = await axios.post(
        `${customerBaseUrl}Account/ChangeImage`,
        form,
        {
          headers: { Authorization: `${newUser.token}` },
        }
      );
      localStorage.setItem(
        "user",
        JSON.stringify({ ...newUser, profileImage: data?.data })
      );
      setProfileImagePreview({
        url: `data:image/png;base64,${data.data}`,
      });
      setLoading(false);
    } catch (err) {
      console.log(err as any);
      setLoading(false);
    }
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
          <UploadImageTemp
            fallback={newUser.name}
            btnText='Change Image'
            onChange={handleImage}
            src={profileImagePreview?.url}
          />
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
            <Formik initialValues={formValues} onSubmit={editAccount}>
              {({
                dirty,
                errors,
                getFieldProps,
                touched,
                setFieldValue,
                values,
                submitForm,
              }) => (
                <>
                  <div className={styles.inputFlex}>
                    <InputTemp
                      marginRightSm
                      label={"FIRST NAME"}
                      placeholder='Enter first name'
                      {...getFieldProps("firstName")}
                    />
                    <InputTemp
                      marginLeftSm
                      label='SURNAME'
                      placeholder='Enter last name'
                      {...getFieldProps("lastName")}
                    />
                  </div>
                  <div className={styles.inputFlex}>
                    <InputTemp
                      marginRightSm
                      label='PHONE NUMBER'
                      placeholder='Enter phone number'
                      {...getFieldProps("phoneNumber")}
                    />
                    <InputTemp
                      marginLeftSm
                      label='EMAIL ADDRESS'
                      placeholder='Enter email address'
                      {...getFieldProps("email")}
                    />
                  </div>
                  <InputTemp
                    label='HOUSE ADDRESS'
                    placeholder='Enter house address'
                    {...getFieldProps("homeAddress")}
                  />
                  <InputTemp
                    label='COMPANY ADDRESS'
                    placeholder='Enter Company Address'
                    {...getFieldProps("companyAddress")}
                  />
                  <div className={styles.inputFlex}>
                    <SelectTemp
                      marginRightSm
                      mode='dark'
                      options={data.states.map((state) => ({
                        label: state.text,
                        value: state.value,
                      }))}
                      value={values.state}
                      onValueChange={(e: any) => {
                        getLGAS(e.value);
                        setFieldValue("state", e);
                      }}
                      className={styles.singleFilterSelect}
                    />

                    <SelectTemp
                      marginRightSm
                      mode='dark'
                      options={data.lgas.map((state) => ({
                        label: state.text,
                        value: state.value,
                      }))}
                      value={values.lga}
                      onValueChange={(e: any) => {
                        if (values.state?.value?.length > 1) {
                          setFieldValue("lga", e);
                        } else {
                          toast.error("Please Select a State First");
                        }
                      }}
                      className={styles.singleFilterSelect}
                    />
                  </div>
                  {page === "edit" && (
                    <div className={styles.buttonFlex}>
                      <Button
                        text='Cancel'
                        variant='outline'
                        width='35%'
                        className={styles.cancelButton}
                        type='button'
                        onClick={setEditFalse}
                      />
                      <Button
                        text='Save'
                        variant='primary'
                        width='65%'
                        invalid={!dirty && !profileImagePreview?.file}
                        onClick={() => {
                          if (dirty) {
                            submitForm();
                          }
                          if (profileImagePreview?.file) {
                            changeImage();
                          }
                        }}
                      />
                    </div>
                  )}
                </>
              )}
            </Formik>
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
  children,
  data,
  setActiveModal = () => {},
}: VendorProfileProps) => {
  const page = undefined;

  const imageRef = useRef<HTMLInputElement>(null);

  const [profileImage, setProfileImage] = useState<string | undefined>();

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
                  accept='image/jpeg'
                  onChange={handleImage}
                />
                {/* TODO accept only jpeg file. Should convert or warn? */}
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

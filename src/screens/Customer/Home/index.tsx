import { useIdleTimer } from "react-idle-timer";
import { SvgRateStars } from "../../../assets/Svgs";
import Layout from "../../../containers/LayoutCustomer";
import styles from "./style.module.css";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import companyLogo from "../../../assets/image/companyLogo.png";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Reducer, useCallback, useEffect, useReducer, useState } from "react";
import Button from "../../../Components/Button";
import Modal from "../../../Components/Modals";
import PageHeader, {
  FilterModal,
  PaginationOf,
} from "../../../Components/PageHeader";
import useMediaQuery from "../../../Custom hooks/useMediaQuery";
import { ReactComponent as ArrowRight } from "../../../assets/svg/dark-arrow-right.svg";
import { limitText } from "../../../Custom hooks/helpers";
import Loading from "../../../Components/Loading";
import { customerBaseUrl } from "../../../utils/baseUrl";
import { SelectTemp } from "../../../Components/InputTemp";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import EmptyStates from "../../../containers/EmptyStates";
import { priceRangeData, productTypeData, supplyTimeData } from "./data";

const initialData: InitialData = {
  data: { products: [], states: [], lgas: [] },
  values: {
    productType: {},
    state: { value: undefined },
    lga: {},
    priceRange: {},
    supplyTime: {},
  },
};

interface InitialData {
  data: { products: any[]; states: any[]; lgas: any[] };
  values: {
    productType: { value?: any };
    state: { value?: any };
    lga: { value?: any };
    priceRange: { value?: any };
    supplyTime: { value?: any };
  };
}

type Actions =
  | {
      type: "setData";
      payload: { products: any[]; states: any[]; lgas: any[] };
    }
  | {
      type:
        | "setProductTypeV"
        | "setStateV"
        | "setLgaV"
        | "setPriceRangeV"
        | "setSupplyTimeV";
      payload: {};
    };

const reducer: Reducer<InitialData, Actions> = (state, actions) => {
  switch (actions.type) {
    case "setData":
      return { ...state, data: actions.payload };
    case "setLgaV":
      return { ...state, values: { ...state.values, lga: actions.payload } };
    case "setProductTypeV":
      return {
        ...state,
        values: { ...state.values, productType: actions.payload },
      };
    case "setStateV":
      return { ...state, values: { ...state.values, state: actions.payload } };
    case "setPriceRangeV":
      return {
        ...state,
        values: { ...state.values, priceRange: actions.payload },
      };
    case "setSupplyTimeV":
      return {
        ...state,
        values: { ...state.values, supplyTime: actions.payload },
      };
    default:
      return state;
  }
};

const Home = () => {
  const navigate = useNavigate();
  const matches = useMediaQuery("(min-width: 800px)");
  const str = localStorage.getItem("user");
  const user = str && JSON.parse(str);
  const [searchParams] = useSearchParams();
  const orderStatus = searchParams.get("order");
  const [loading, setLoading] = useState(false);

  const [confmDelivery, setConfmDelivery] = useState(false);
  const [reviewModal, setReviewModal] = useState(false);

  const [{ data, values }, dispatch] = useReducer(reducer, initialData);

  const handleLgaGlobalChange = (event: any) => {
    if (values.state?.value?.length > 1) {
      dispatch({ type: "setLgaV", payload: event });
    } else {
      toast.error("Please Select a State First");
    }
  };
  // const handleGlobalChange = (actions: Actions) => {
  //   dispatch(actions);
  // };

  const handleStateGlobalChange = (event: any) => {
    dispatch({ type: "setStateV", payload: event });
  };

  const handleProductTypeGlobalChange = (event: any) => {
    dispatch({ type: "setProductTypeV", payload: event });
  };

  const handlePriceRangeGlobalChange = (event: any) => {
    dispatch({ type: "setPriceRangeV", payload: event });
  };

  const handleSupplyTimeGlobalChange = (event: any) => {
    dispatch({ type: "setSupplyTimeV", payload: event });
  };

  useEffect(() => {
    if (!orderStatus) return;
    setConfmDelivery(true);
    setReviewModal(false);
  }, [orderStatus]);

  const [page, setPage] = useState("home");

  const [selected, setSelected] = useState<string | null>(null);
  const selectedProduct = data.products.find(
    (product) => product.id === selected
  );

  const confirmDelivery = () => {
    setConfmDelivery(false);
    setReviewModal(true);
  };

  const buyProduct = (productId: string) => {
    setSelected(productId);
    setPage("order-page");
  };

  const backHome = () => {
    setPage("home");
  };

  const review = () => {
    setReviewModal(false);
  };

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const { data: products } = await axios.get(
          `${customerBaseUrl}Product/Product`,
          {
            headers: { Authorization: `${user?.token}` },
          }
        );
        const { data: states } = await axios.get(
          `${customerBaseUrl}Account/GetState`
        );
        const { data: lgas } = await axios.get(
          `${customerBaseUrl}Account/GetLocalGovt/${values.state.value}`
        );
        dispatch({ type: "setData", payload: { products, lgas, states } });
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    })();
  }, [user?.token, values.state?.value]);

  const [state, setState] = useState<string>("Active");
  const [count, setCount] = useState<number>(0);
  const [remaining, setRemaining] = useState<number>(0);

  const onIdle = () => {
    setState("Idle");
  };

  const onActive = () => {
    setState("Active");
  };

  const onAction = () => {
    setCount(count + 1);
  };

  const { getRemainingTime } = useIdleTimer({
    onIdle,
    onActive,
    onAction,
    // Change to 10
    // timeout: 40_000,
    throttle: 500,
  });

  const logout = useCallback(() => {
    localStorage.removeItem("user");
    navigate("/login");
    //@ts-ignore
    window.location.reload(false);
  }, [navigate]);

  useEffect(() => {
    if (state === "Idle") {
      logout();
    }
    if (user?.token) {
      const interval = setInterval(() => {
        setRemaining(Math.ceil(getRemainingTime() / 1000));
      }, 500);

      return () => {
        clearInterval(interval);
      };
    }
  }, [getRemainingTime, user, logout, state]);

  const [tags, setTags] = useState([{ value: "Surulere" }]);

  const addTag = (value: string) =>
    setTags((state) => [
      ...state.filter((tag) => tag.value !== value),
      { value },
    ]);
  const removeTag = (value: string) =>
    setTags((state) => state.filter((tag) => tag.value !== value));

  const applyFilter = () => {
    addTag(values.priceRange.value);
  };

  return (
    <>
      {/* <h1>React Idle Timer</h1>
      <h2>useIdleTimer</h2>
      <br />
      <p>Current State: {state}</p>
      <p>Action Events: {count}</p>
      <p>{remaining} seconds remaining</p> */}
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
      <Layout>
        <Modal
          openModal={confmDelivery}
          closeModal={() => setConfmDelivery(false)}>
          <h3>Confirm Delivery</h3>
          <p>
            Sunny Jay has delivered{" "}
            <span className={styles.spanGreen}>100 Ltrs</span> Diesel to you at
            11:25am on Mon, 25th July, 2022.
          </p>
          <p>
            Kindly click to confirm delivery or use{" "}
            <span className={styles.spanGreen}>code 0234</span>
          </p>
          <div className={"flex-btwn"}>
            <Button text='Cancel' width={"180px"} onClick={confirmDelivery} />
            <Button
              variant='primary'
              text='Confirm'
              width={"260px"}
              onClick={confirmDelivery}
            />
          </div>
        </Modal>
        <Modal
          variant='unstyled'
          style={{ top: "50px" }}
          openModal={reviewModal}
          closeModal={() => setReviewModal(false)}>
          <div className={styles.reviewOrder}>
            <h2>Rate Sunny Jay & Co’s service</h2>
            <div>
              <SvgRateStars />
            </div>
            <div className={styles.divider} />
            <p>Please share your opinion about their service</p>
            <textarea placeholder='Write review' rows={5} />
            <div className={styles.btnCfm}>
              <Button text='Cancel' width={"40%"} onClick={review} />
              <Button
                variant='primary'
                text='Submit'
                width={"55%"}
                onClick={review}
              />
            </div>
          </div>
        </Modal>
        <>
          <PageHeader pageTitle='Available Products'>
            {matches && <PaginationOf current={[1, 20]} total={45} />}
            <FilterModal table>
              <>
                <div className={styles.singleFilter}>
                  <p>State:</p>
                  <SelectTemp
                    mode='dark'
                    options={data.states.map((state) => ({
                      label: state.text,
                      value: state.value,
                    }))}
                    value={values.state.value}
                    onValueChange={handleStateGlobalChange}
                    className={styles.singleFilterSelect}
                  />
                </div>
                <div className={styles.singleFilter}>
                  <p>LGA:</p>
                  <SelectTemp
                    mode='dark'
                    options={data.lgas.map((state) => ({
                      label: state.text,
                      value: state.value,
                    }))}
                    value={values.lga}
                    onValueChange={handleLgaGlobalChange}
                    className={styles.singleFilterSelect}
                  />
                </div>
                <div className={styles.singleProductFilter}>
                  <p>Product Type:</p>
                  <SelectTemp
                    mode='dark'
                    options={productTypeData.map((state) => ({
                      label: state.name,
                      value: state.value,
                    }))}
                    value={values.productType}
                    onValueChange={handleProductTypeGlobalChange}
                    className={styles.singleProductFilterSelect}
                  />
                </div>
                <div className={styles.singleProductFilter}>
                  <p>Price range:</p>
                  <SelectTemp
                    mode='dark'
                    options={priceRangeData.map((state) => ({
                      label: state.name,
                      value: state.value,
                    }))}
                    value={values.priceRange}
                    onValueChange={handlePriceRangeGlobalChange}
                    className={styles.singleProductFilterSelect}
                  />
                </div>
                <div className={styles.singleProductFilter}>
                  <p>Supply Time:</p>
                  <SelectTemp
                    mode='dark'
                    options={supplyTimeData.map((state) => ({
                      label: state.name,
                      value: state.value,
                    }))}
                    value={values.supplyTime}
                    onValueChange={handleSupplyTimeGlobalChange}
                    className={styles.singleProductFilterSelect}
                  />
                </div>
                <div
                  className='divider'
                  style={{ width: "100%", margin: "15px 0" }}
                />
                <div className={"flex-btwn"}>
                  <Button variant='outline' text='Cancel' width='40%' />
                  <Button
                    variant='primary'
                    text='Search'
                    width='55%'
                    onClick={applyFilter}
                  />
                </div>
              </>
            </FilterModal>
          </PageHeader>

          <div className={styles.filterTags}>
            {tags.map((tag) => (
              <div key={tag.value} className={styles.filterTag}>
                <p>{tag.value}</p>
                <button>x</button>
              </div>
            ))}
          </div>

          {data.products.length < 1 ? (
            <>
              <EmptyStates table />
            </>
          ) : (
            <TableContainer
              style={{
                marginTop: "35px",
                borderRadius: "17px",
                borderTop: "0.5px solid rgba(52, 68, 55, 0.3)",
              }}
              component={Paper}>
              {matches ? (
                <Table sx={{ minWidth: 700 }} aria-label='customized table'>
                  <TableBody>
                    <StyledTableRow>
                      <StyledTableCell>
                        <h2 className={styles.title}>Company</h2>
                      </StyledTableCell>
                      <StyledTableCell align='center'>
                        <h2 className={styles.title}>Location</h2>
                      </StyledTableCell>
                      <StyledTableCell align='center'>
                        <h2 className={styles.title}>Category</h2>
                      </StyledTableCell>
                      <StyledTableCell align='center'>
                        <h2 className={styles.title}>Supply Time</h2>
                      </StyledTableCell>
                      <StyledTableCell align='center'>
                        <h2 className={styles.title}>Price/Ltr</h2>
                      </StyledTableCell>
                      <StyledTableCell align='right'></StyledTableCell>
                    </StyledTableRow>

                    <>
                      {data.products.map((row, index) => (
                        <StyledTableRow key={row.id}>
                          <StyledTableCell component='th' scope='row'>
                            <div className={styles.companyLogo}>
                              <img alt='company-logo' src={companyLogo} />
                              <h3 className={styles.subText}>
                                {row.productName}
                              </h3>
                            </div>
                          </StyledTableCell>
                          <StyledTableCell align='center'>
                            <h3 className={styles.subText}>{row.state}</h3>
                          </StyledTableCell>
                          <StyledTableCell align='center'>
                            <h3
                              className={
                                row.category === "Diesel"
                                  ? `${styles.subTextGreen}`
                                  : `${styles.subTextRed}`
                              }>
                              {row.category}
                            </h3>
                          </StyledTableCell>
                          <StyledTableCell align='center'>
                            <h3
                              className={
                                styles.subText
                              }>{`${row.intervalOf} hours`}</h3>
                          </StyledTableCell>
                          <StyledTableCell align='center'>
                            <h3
                              className={
                                styles.subText
                              }>{`N${row.unitPrice}.00`}</h3>
                            <p
                              className={
                                styles.discountedPrice
                              }>{`-${row.discountPrice}%`}</p>
                          </StyledTableCell>
                          <StyledTableCell align='right'>
                            <Button
                              text='Buy'
                              width='70px'
                              height='40px'
                              onClick={() => navigate(row.productId)}
                            />
                          </StyledTableCell>
                        </StyledTableRow>
                      ))}
                    </>
                  </TableBody>
                </Table>
              ) : (
                <Table sx={{ width: "100%" }} aria-label='customized table'>
                  <TableBody>
                    <StyledTableRow>
                      <StyledTableCell>
                        <h2 className={styles.title}>Company</h2>
                      </StyledTableCell>
                      <StyledTableCell align='center'>
                        <h2 className={styles.title}>Cat.</h2>
                      </StyledTableCell>
                      <StyledTableCell align='center'>
                        <h2 className={styles.title}>N/Ltr</h2>
                      </StyledTableCell>
                      <StyledTableCell align='right'></StyledTableCell>
                    </StyledTableRow>
                    {data.products.map((row, index) => (
                      <StyledTableRow key={row.id}>
                        <StyledTableCell
                          align='center'
                          style={{ padding: "15x 3px" }}>
                          <h3 className={styles.subText}>
                            {limitText(row.productName, 9)}
                          </h3>
                        </StyledTableCell>
                        <StyledTableCell align='center'>
                          <h3 className={styles.subText}>
                            {limitText(row.category, 3)}
                          </h3>
                        </StyledTableCell>
                        <StyledTableCell align='center'>
                          <h3 className={styles.subText}>{row.unitPrice}</h3>
                        </StyledTableCell>
                        <StyledTableCell
                          align='left'
                          style={{ padding: "10px 3px" }}>
                          <ArrowRight
                            style={{ cursor: "pointer" }}
                            onClick={() => {
                              navigate(row.productId);
                            }}
                          />
                        </StyledTableCell>
                      </StyledTableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </TableContainer>
          )}
        </>
      </Layout>
    </>
  );
};

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default Home;

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
import { useEffect, useState } from "react";
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
const Home = () => {
  const navigate = useNavigate();

  const matches = useMediaQuery("(min-width: 800px)");

  const [confmDelivery, setConfmDelivery] = useState(false);
  const [reviewModal, setReviewModal] = useState(false);
  const [stateValue, setStateValue] = useState<any>({});

  const [searchParams] = useSearchParams();
  const [allStateData, setAllStateData] = useState([]);
  const [lgaStateData, setLgaStateData] = useState([]);
  const [lgaValue, setLgaValue] = useState({});
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
  const orderStatus = searchParams.get("order");

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

  const getAllGAUnderState = () => {
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
  };

  useEffect(() => {
    if (!orderStatus) return;
    setConfmDelivery(true);
    setReviewModal(false);
  }, [orderStatus]);

  const [page, setPage] = useState("home");
  const [filterSet, setFilterSet] = useState(false);

  const [selected, setSelected] = useState<string | null>(null);

  const confirmDelivery = () => {
    setConfmDelivery(false);
    setReviewModal(true);
  };

  const buyProduct = (productId: string) => {
    setSelected(productId);
    setPage("order-page");
  };

  const toggleFilter = () => {
    setFilterSet((state) => !state);
  };

  const backHome = () => {
    setPage("home");
  };

  const review = () => {
    setReviewModal(false);
  };

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  const selectedProduct = data.find((product) => product.id === selected);

  const str = localStorage.getItem("user");
  const user = str && JSON.parse(str);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${customerBaseUrl}Product/Product`, {
        headers: { Authorization: `${user?.token}` },
      })
      .then((response) => {
        console.log(response, "the products");
        setData(response.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });

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
  }, [user?.token, stateValue?.value]);

  const productTypeData = [
    {
      key: "1",
      name: "Diesel",
      value: "Diesel",
    },
    {
      key: "2",
      name: "Fuel",
      value: "Fuel",
    },
    {
      key: "3",
      name: "Oil",
      value: "Oil",
    },
    {
      key: "4",
      name: "AGO",
      value: "AGO",
    },
    {
      key: "5",
      name: "Fissile",
      value: "Fissile",
    },
  ];

  const priceRangeData = [
    {
      key: "1",
      name: "0 - 100",
      value: "0 - 100",
    },
    {
      key: "2",
      name: "100 - 200",
      value: "100 - 200",
    },
    {
      key: "3",
      name: "200 - 300",
      value: "200 - 300",
    },
    {
      key: "4",
      name: "300 - 400",
      value: "300 - 400",
    },
  ];

  const supplyTimeData = [
    {
      key: "1",
      name: "1",
      value: "1",
    },
    {
      key: "2",
      name: "2",
      value: "2",
    },
    {
      key: "3",
      name: "3",
      value: "3",
    },
    {
      key: "4",
      name: "4",
      value: "4",
    },
  ];

  const [productTypeValue, setProductTypeValue] = useState({});
  const [priceRangeValue, setPriceRangeValue] = useState({});
  const [supplyTimeValue, setsupplyTimeValue] = useState({});

  const handleProductTypeGlobalChange = (event: any) => {
    setProductTypeValue(event);
  };

  const handlePriceRangeGlobalChange = (event: any) => {
    setPriceRangeValue(event);
  };

  const handleSupplyTimeGlobalChange = (event: any) => {
    setsupplyTimeValue(event);
  };

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
    timeout: 40_000,
    throttle: 500,
  });

  const logout = () => {
    localStorage.removeItem("user");
    navigate("/login");
    //@ts-ignore
    window.location.reload(false);
  };

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
  });

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
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Layout>
        <Modal
          openModal={confmDelivery}
          closeModal={() => setConfmDelivery(false)}
        >
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
            <Button text="Cancel" width={"180px"} onClick={confirmDelivery} />
            <Button
              variant="primary"
              text="Confirm"
              width={"260px"}
              onClick={confirmDelivery}
            />
          </div>
        </Modal>
        <Modal
          variant="unstyled"
          style={{ top: "50px" }}
          openModal={reviewModal}
          closeModal={() => setReviewModal(false)}
        >
          <div className={styles.reviewOrder}>
            <h2>Rate Sunny Jay & Co’s service</h2>
            <div>
              <SvgRateStars />
            </div>
            <div className={styles.divider} />
            <p>Please share your opinion about their service</p>
            <textarea placeholder="Write review" rows={5} />
            <div className={styles.btnCfm}>
              <Button text="Cancel" width={"40%"} onClick={review} />
              <Button
                variant="primary"
                text="Submit"
                width={"55%"}
                onClick={review}
              />
            </div>
          </div>
        </Modal>
        <>
          <PageHeader pageTitle="Available Products">
            {matches && <PaginationOf current={[1, 20]} total={45} />}
            <FilterModal
              table
              tableComponent={
                <div>
                  <div>
                    <div className={styles.singleFilter}>
                      <p>State:</p>
                      <SelectTemp
                        mode="dark"
                        options={allStateData.map((state) => ({
                          label: state.text,
                          value: state.value,
                        }))}
                        value={stateValue}
                        onValueChange={handleStateGlobalChange}
                        className={styles.singleFilterSelect}
                      />
                    </div>
                    <div className={styles.singleFilter}>
                      <p>LGA:</p>
                      <SelectTemp
                        mode="dark"
                        options={lgaStateData.map((state) => ({
                          label: state.text,
                          value: state.value,
                        }))}
                        value={lgaValue}
                        onValueChange={handleLgaGlobalChange}
                        className={styles.singleFilterSelect}
                      />
                    </div>
                    <div className={styles.singleProductFilter}>
                      <p>Product Type:</p>
                      <SelectTemp
                        mode="dark"
                        options={productTypeData.map((state) => ({
                          label: state.name,
                          value: state.value,
                        }))}
                        value={productTypeValue}
                        onValueChange={handleProductTypeGlobalChange}
                        className={styles.singleProductFilterSelect}
                      />
                    </div>
                    <div className={styles.singleProductFilter}>
                      <p>Price range:</p>
                      <SelectTemp
                        mode="dark"
                        options={priceRangeData.map((state) => ({
                          label: state.name,
                          value: state.value,
                        }))}
                        value={priceRangeValue}
                        onValueChange={handlePriceRangeGlobalChange}
                        className={styles.singleProductFilterSelect}
                      />
                    </div>
                    <div className={styles.singleProductFilter}>
                      <p>Supply Time:</p>
                      <SelectTemp
                        mode="dark"
                        options={supplyTimeData.map((state) => ({
                          label: state.name,
                          value: state.value,
                        }))}
                        value={supplyTimeValue}
                        onValueChange={handleSupplyTimeGlobalChange}
                        className={styles.singleProductFilterSelect}
                      />
                    </div>
                  </div>
                </div>
              }
            />
          </PageHeader>

          {data.length < 1 ? (
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
              component={Paper}
            >
              {matches ? (
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                  <TableBody>
                    <StyledTableRow>
                      <StyledTableCell>
                        <h2 className={styles.title}>Company</h2>
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        <h2 className={styles.title}>Location</h2>
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        <h2 className={styles.title}>Category</h2>
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        <h2 className={styles.title}>Supply Time</h2>
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        <h2 className={styles.title}>Price/Ltr</h2>
                      </StyledTableCell>
                      <StyledTableCell align="right"></StyledTableCell>
                    </StyledTableRow>

                    <>
                      {data.map((row, index) => (
                        <StyledTableRow key={row.id}>
                          <StyledTableCell component="th" scope="row">
                            <div className={styles.companyLogo}>
                              <img alt="company-logo" src={companyLogo} />
                              <h3 className={styles.subText}>
                                {row.productName}
                              </h3>
                            </div>
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            <h3 className={styles.subText}>{row.state}</h3>
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            <h3
                              className={
                                row.category === "Diesel"
                                  ? `${styles.subTextGreen}`
                                  : `${styles.subTextRed}`
                              }
                            >
                              {row.category}
                            </h3>
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            <h3
                              className={styles.subText}
                            >{`${row.intervalOf} hours`}</h3>
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            <h3
                              className={styles.subText}
                            >{`N${row.unitPrice}.00`}</h3>
                            <p
                              className={styles.discountedPrice}
                            >{`-${row.discountPrice}%`}</p>
                          </StyledTableCell>
                          <StyledTableCell align="right">
                            <Button
                              text="Buy"
                              width="70px"
                              height="40px"
                              onClick={() => navigate(row.productId)}
                            />
                          </StyledTableCell>
                        </StyledTableRow>
                      ))}
                    </>
                  </TableBody>
                </Table>
              ) : (
                <Table sx={{ width: "100%" }} aria-label="customized table">
                  <TableBody>
                    <StyledTableRow>
                      <StyledTableCell>
                        <h2 className={styles.title}>Company</h2>
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        <h2 className={styles.title}>Cat.</h2>
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        <h2 className={styles.title}>N/Ltr</h2>
                      </StyledTableCell>
                      <StyledTableCell align="right"></StyledTableCell>
                    </StyledTableRow>
                    {data.map((row, index) => (
                      <StyledTableRow key={row.id}>
                        <StyledTableCell
                          align="center"
                          style={{ padding: "15x 3px" }}
                        >
                          <h3 className={styles.subText}>
                            {limitText(row.productName, 9)}
                          </h3>
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          <h3 className={styles.subText}>
                            {limitText(row.category, 3)}
                          </h3>
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          <h3 className={styles.subText}>{row.unitPrice}</h3>
                        </StyledTableCell>
                        <StyledTableCell
                          align="left"
                          style={{ padding: "10px 3px" }}
                        >
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

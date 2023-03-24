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
import { useCallback, useEffect, useState } from "react";
import Button from "../../../Components/Button";
import Modal from "../../../Components/Modals";
import PageHeader, { PaginationOf } from "../../../Components/PageHeader";
import useMediaQuery from "../../../Custom hooks/useMediaQuery";
import { ReactComponent as ArrowRight } from "../../../assets/svg/dark-arrow-right.svg";
import { limitText } from "../../../Custom hooks/helpers";
import Loading from "../../../Components/Loading";
import { customerBaseUrl } from "../../../utils/baseUrl";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import EmptyStates from "../../../containers/EmptyStates";
import { getUser } from "../../../../src/Custom hooks/Hooks";
import FilterComponent from "./FilterComponent";
import { ProductFilterValues } from "../../../../src/t/shared";
import { FullProduct } from "../../../../src/t/payloads";
import { ReactComponent as FilterTagX } from "../../../assets/svg/filterTagX.svg";

const Home = () => {
  const navigate = useNavigate();
  const matches = useMediaQuery("(min-width: 800px)");
  const user = getUser();
  const [searchParams] = useSearchParams();
  const [filter, setFilter] = useState<ProductFilterValues>({});

  const orderStatus = searchParams.get("order");
  const [loading, setLoading] = useState(false);

  const [confmDelivery, setConfmDelivery] = useState(false);
  const [reviewModal, setReviewModal] = useState(false);

  const [data, setData] = useState<{
    products?: FullProduct[];
    states: any[];
    lgas: any[];
  }>({ products: [], states: [], lgas: [] });

  useEffect(() => {
    if (!orderStatus) return;
    setConfmDelivery(true);
    setReviewModal(false);
  }, [orderStatus]);

  const confirmDelivery = () => {
    setConfmDelivery(false);
    setReviewModal(true);
  };

  const review = () => {
    setReviewModal(false);
  };

  //filter function
  const filterProducts = () => {
    if (filter.productType) {
      return data.products.filter(
        (product) => filter.productType.value === product.category
      );
    }
    return data.products;
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
        const userState = states.data?.find(
          (state) => state.text === user.state
        );
        const { data: lgas } = await axios.get(
          `${customerBaseUrl}Account/GetLocalGovt/${userState?.value}`
        );
        setData({
          products: products.data,
          lgas: lgas.data,
          states: states.data,
        });
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    })();
  }, [user.token, user.state]);

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

  const buyNow = (productId?: string) => {
    if (user) {
      navigate(`/product/${productId}`);
    } else {
      navigate("/login");
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
            <FilterComponent
              applyFilter={setFilter}
              lgas={data.lgas}
              states={data.states}
            />
          </PageHeader>

          <div className={styles.filterTags}>
            {filter.state && (
              <div className={styles.filterTag}>
                <p>{filter.state.label}</p>
                <button
                  onClick={() =>
                    setFilter((state) => ({ ...state, state: undefined }))
                  }>
                  <FilterTagX />
                </button>
              </div>
            )}
            {filter.lga && (
              <div className={styles.filterTag}>
                <p>{filter.lga.label}</p>
                <button
                  onClick={() =>
                    setFilter((state) => ({ ...state, lga: undefined }))
                  }>
                  <FilterTagX />
                </button>
              </div>
            )}
            {filter.productType && (
              <div className={styles.filterTag}>
                <p>{filter.productType.label}</p>
                <button
                  onClick={() =>
                    setFilter((state) => ({ ...state, productType: undefined }))
                  }>
                  <FilterTagX />
                </button>
              </div>
            )}
            {filter.priceRange && (
              <div className={styles.filterTag}>
                <p>{filter.priceRange.label}</p>
                <button
                  onClick={() =>
                    setFilter((state) => ({ ...state, priceRange: undefined }))
                  }>
                  <FilterTagX />
                </button>
              </div>
            )}
            {filter.supplyTime && (
              <div className={styles.filterTag}>
                <p>{filter.supplyTime.label}</p>
                <button
                  onClick={() =>
                    setFilter((state) => ({ ...state, supplyTime: undefined }))
                  }>
                  <FilterTagX />
                </button>
              </div>
            )}
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
                        <h2 className={"Tabletitle"}>Company</h2>
                      </StyledTableCell>
                      <StyledTableCell align='center'>
                        <h2 className={"Tabletitle"}>Location</h2>
                      </StyledTableCell>
                      <StyledTableCell align='center'>
                        <h2 className={"Tabletitle"}>Category</h2>
                      </StyledTableCell>
                      <StyledTableCell align='center'>
                        <h2 className={"Tabletitle"}>Supply Time</h2>
                      </StyledTableCell>
                      <StyledTableCell align='center'>
                        <h2 className={"Tabletitle"}>Price/Ltr</h2>
                      </StyledTableCell>
                      <StyledTableCell align='right'></StyledTableCell>
                    </StyledTableRow>

                    <>
                      {filterProducts()?.map((row) => (
                        <StyledTableRow key={row.productId}>
                          <StyledTableCell component='th' scope='row'>
                            <div className={styles.companyLogo}>
                              <img alt='company-logo' src={companyLogo} />
                              <h3 className={"TablesubText"}>
                                {row.productName}
                              </h3>
                            </div>
                          </StyledTableCell>
                          <StyledTableCell align='center'>
                            <h3 className={"TablesubText"}>{row.state}</h3>
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
                                "TablesubText"
                              }>{`${row.intervalOf} hours`}</h3>
                          </StyledTableCell>
                          <StyledTableCell align='center'>
                            <h3
                              className={
                                "TablesubText"
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
                              onClick={() => buyNow(row.productId)}
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
                        <h2 className={"Tabletitle"}>Company</h2>
                      </StyledTableCell>
                      <StyledTableCell align='center'>
                        <h2 className={"Tabletitle"}>Cat.</h2>
                      </StyledTableCell>
                      <StyledTableCell align='center'>
                        <h2 className={"Tabletitle"}>N/Ltr</h2>
                      </StyledTableCell>
                      <StyledTableCell align='right'></StyledTableCell>
                    </StyledTableRow>
                    {filterProducts()?.map((row, index) => (
                      <StyledTableRow key={row.productId}>
                        <StyledTableCell
                          align='center'
                          style={{ padding: "15x 3px" }}>
                          <h3 className={"TablesubText"}>
                            {limitText(row.productName, 9)}
                          </h3>
                        </StyledTableCell>
                        <StyledTableCell align='center'>
                          <h3 className={"TablesubText"}>
                            {limitText(row.category, 3)}
                          </h3>
                        </StyledTableCell>
                        <StyledTableCell align='center'>
                          <h3 className={"TablesubText"}>{row.unitPrice}</h3>
                        </StyledTableCell>
                        <StyledTableCell
                          align='left'
                          style={{ padding: "10px 3px" }}>
                          <ArrowRight
                            style={{ cursor: "pointer" }}
                            onClick={() => {
                              buyNow(row.productId);
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

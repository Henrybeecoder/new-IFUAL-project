import useMediaQuery from "../../../../src/Custom hooks/useMediaQuery";
import PageHeader, {
  FilterModal,
  PaginationOf,
} from "../../../../src/Components/PageHeader";
import Layout from "../../../../src/containers/LayoutCustomer";
import styles from "./style.module.css";
import { SelectTemp } from "../../../../src/Components/InputTemp";
import Button from "../../../../src/Components/Button";
import { useEffect, useState } from "react";
import EmptyStates from "../../../../src/containers/EmptyStates";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import { limitText } from "../../../../src/Custom hooks/helpers";
import axios from "axios";
import { customerBaseUrl } from "../../../../src/utils/baseUrl";
import Loading from "../../../../src/Components/Loading";

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const Orders = () => {
  const matches = useMediaQuery("(min-width: 800px)");

  const [loading, setLoading] = useState(false);

  const [data, setData] = useState({ orders: [] });

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(
          `${customerBaseUrl}Order/OrderbyCustomer`
        );
        setData((state) => ({ ...state, orders: data.data }));
        setLoading(false);
      } catch (err) {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <Layout>
      {loading && <Loading />}
      <PageHeader pageTitle='My Orders'>
        {matches && <PaginationOf current={[1, 20]} total={20} />}
        <FilterModal
          currentLabel='Newest to oldest'
          options={[
            { value: "Newest to oldest", code: 1 },
            { value: "Oldest to Newest", code: 1 },
            { value: "Oldest to Newest", code: 1 },
            { value: "Completed", code: 1 },
            { value: "In Progress", code: 1 },
            { value: "Cancelled", code: 1 },
          ]}
        />
      </PageHeader>

      {data.orders.length < 1 ? (
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
                  {data.orders.map((row) => (
                    <StyledTableRow key={row.id}>
                      <StyledTableCell component='th' scope='row'>
                        <div className={styles.companyLogo}>
                          {/* <img alt='company-logo' src={companyLogo} /> */}
                          <h3 className={styles.subText}>{row.productName}</h3>
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
                          //   onClick={() => buyNow(row.productId)}
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
                {data.orders.map((row, index) => (
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
                      {/* <ArrowRight
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          navigate(row.productId);
                        }}
                      /> */}
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </TableContainer>
      )}
    </Layout>
  );
};

export default Orders;

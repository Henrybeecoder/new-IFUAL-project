import useMediaQuery from "../../../../src/Custom hooks/useMediaQuery";
import PageHeader, {
  FilterModal,
  PaginationOf,
} from "../../../../src/Components/PageHeader";
import Layout from "../../../../src/containers/LayoutCustomer";
import styles from "./style.module.css";
import EmptyStates from "../../../../src/containers/EmptyStates";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import {
  dateLocale,
  getDateInMs,
  limitText,
} from "../../../../src/Custom hooks/helpers";
import Loading from "../../../../src/Components/Loading";
import { useData } from "../../../../src/Custom hooks/Hooks";
import { Order } from "../../../../src/t/payloads";
import companyLogo from "../../../assets/image/companyLogo.png";
import { ReactComponent as ArrowRight } from "../../../assets/svg/dark-arrow-right.svg";
import { codeToStatus } from "../../../../src/Custom hooks/helpers";
import { useState } from "react";

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

const options = [
  { value: "Newest to oldest", code: 100 },
  { value: "Oldest to Newest", code: 101 },
  { value: "Completed", code: 2 },
  { value: "In Progress", code: 0 },
  { value: "Cancelled", code: 5 },
];

const Orders = () => {
  const matches = useMediaQuery("(min-width: 800px)");

  const [sort, setSort] = useState(100);
  const { data, loading } = useData("Order/OrderbyCustomer");
  const orderData: Order[] | undefined = data || [];
  const filterOrders = () => {
    switch (sort) {
      case 100:
        return orderData?.sort(
          (a, b) => getDateInMs(a.dateCreated) - getDateInMs(b.dateCreated)
        );
      case 101:
        return orderData?.sort(
          (a, b) => getDateInMs(b.dateCreated) - getDateInMs(a.dateCreated)
        );
      case 0:
      case 4:
        return orderData?.filter(
          (order) => order.orderStatus === 0 || order.orderStatus === 4
        );
      case 2:
        return orderData?.filter((order) => order.orderStatus === 2);
      case 5:
        return orderData?.filter((order) => order.orderStatus === 5);
      default:
        return [];
    }
  };

  const orders = filterOrders();

  return (
    <Layout>
      {loading && <Loading />}
      <PageHeader pageTitle='My Orders'>
        {matches && <PaginationOf current={[1, 20]} total={20} />}
        <FilterModal
          selected={sort}
          currentLabel={options.find((opt) => sort === opt.code)?.value}
          options={options}
          onSelect={({ code }) => setSort(code)}
        />
      </PageHeader>

      {orders && orders.length > 1 ? (
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
                    <h2 className={"Tabletitle"}>Address</h2>
                  </StyledTableCell>
                  <StyledTableCell align='center'>
                    <h2 className={"Tabletitle"}>Date</h2>
                  </StyledTableCell>
                  <StyledTableCell align='center'>
                    <h2 className={"Tabletitle"}>Quantity</h2>
                  </StyledTableCell>
                  <StyledTableCell align='center'>
                    <h2 className={"Tabletitle"}>Price/Ltr</h2>
                  </StyledTableCell>
                  <StyledTableCell align='center'>
                    <h2 className={"Tabletitle"}>Status</h2>
                  </StyledTableCell>
                </StyledTableRow>

                <>
                  {orders &&
                    orders.map((row) => (
                      <StyledTableRow key={row.orderId}>
                        <StyledTableCell component='th' scope='row'>
                          <img
                            alt='company-logo'
                            src={companyLogo}
                            className={styles.companyLogo}
                          />
                        </StyledTableCell>
                        <StyledTableCell align='center'>
                          <h3 className={"TablesubText"}>
                            {row.deliveryStreetAddress}
                          </h3>
                        </StyledTableCell>
                        <StyledTableCell align='center'>
                          <h3 className={"TablesubText"}>
                            {dateLocale(row.dateCreated)}
                          </h3>
                        </StyledTableCell>
                        <StyledTableCell align='center'>
                          <h3
                            className={
                              "TablesubText"
                            }>{`${row.quantity} ltrs`}</h3>
                        </StyledTableCell>
                        <StyledTableCell align='center'>
                          <h3
                            className={
                              "TablesubText"
                            }>{`N${row.unitPrice}.00`}</h3>
                        </StyledTableCell>
                        <StyledTableCell align='center'>
                          <h3
                            className={styles.progressH}
                            style={codeToStatus(row.orderStatus).style}>
                            {codeToStatus(row.orderStatus).text}
                          </h3>
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
                    <h2 className={"Tabletitle"}>Quantity</h2>
                  </StyledTableCell>
                  <StyledTableCell align='center'>
                    <h2 className={"Tabletitle"}>N/Ltr</h2>
                  </StyledTableCell>
                  <StyledTableCell align='center'>
                    <h2 className={"Tabletitle"}>Status</h2>
                  </StyledTableCell>
                  <StyledTableCell align='right'></StyledTableCell>
                </StyledTableRow>
                {orders &&
                  orders.map((row, index) => (
                    <StyledTableRow key={row.orderId}>
                      <StyledTableCell
                        align='center'
                        style={{ padding: "15x 3px" }}>
                        <h3 className={"TablesubText"}>
                          {limitText(row.quantity.toString(), 9)} L
                        </h3>
                      </StyledTableCell>
                      <StyledTableCell align='center'>
                        <h3 className={"TablesubText"}>
                          {limitText(row.unitPrice.toString(), 10)}
                        </h3>
                      </StyledTableCell>
                      <StyledTableCell align='center'>
                        <h3
                          className={styles.progressH}
                          style={codeToStatus(row.orderStatus).style}>
                          {codeToStatus(row.orderStatus).text}
                        </h3>
                      </StyledTableCell>
                      <StyledTableCell
                        align='left'
                        style={{ padding: "10px 3px" }}>
                        <ArrowRight
                          style={{ cursor: "pointer" }}
                          onClick={() => {
                            // navigate(row.productId);
                          }}
                        />
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
              </TableBody>
            </Table>
          )}
        </TableContainer>
      ) : (
        <>
          <EmptyStates table />
        </>
      )}
    </Layout>
  );
};

export default Orders;

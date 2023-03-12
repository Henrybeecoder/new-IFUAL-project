import React, { useState } from "react";
import Layout from "../../../containers/LayoutVendor";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import styles from "./style.module.css";
import right from "../../../assets/svg/right.svg";
import left from "../../../assets/svg/left.svg";
import filter from "../../../assets/svg/filter.svg";
import SubModal from "../../../Components/OptionsModal";
import useMediaQuery from "../../../Custom hooks/useMediaQuery";
import { useNavigate } from "react-router-dom";
import { ReactComponent as ArrowRight } from "../../../assets/svg/dark-arrow-right.svg";
import { limitText, localeDate } from "../../../Custom hooks/helpers";
import PageHeader, {
  FilterModal,
  PaginationOf,
} from "../../../Components/PageHeader";
import { useQuery } from "@tanstack/react-query";
import { OrderStatusType } from "../../../types/vendor";
import { AxiosError } from "axios";

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

const createData = (
  orderId: string,
  description: string,
  quantity: string,
  orderStatus: number,
  purchasedDate: string,
  unitPrice: string
) => {
  return {
    orderId,
    description,
    quantity,
    orderStatus,
    purchasedDate,
    unitPrice,
  };
};

const rows = [
  createData(
    "1",
    ".88 Distilled Diesel",
    "100 l",
    1,
    "2019-05-02T04:52:33",
    "N30,000.00"
  ),
  createData(
    "2",
    "Unadulterated Petrol",
    "100 l",
    0,
    "2019-05-02T04:52:33",
    "N30,000.00"
  ),
  createData(
    "3",
    ".9 Distilled Diesel",
    "100 l",
    3,
    "2019-05-02T04:52:33",
    "N30,000.00"
  ),
  createData(
    "4",
    "Pure, distilled Kerosene",
    "100 l",
    1,
    "2019-05-02T04:52:33",
    "N30,000.00"
  ),
  createData(
    "5",
    "Pure, distilled Kerosene",
    "100 l",
    2,
    "2019-05-02T04:52:33",
    "N30,000.00"
  ),
  createData(
    "6",
    ".9 Distilled Diesel",
    "100 l",
    3,
    "2019-05-02T04:52:33",
    "N30,000.00"
  ),
];

type FilterCode = 0 | 1 | 2 | 3 | 4 | 5 | number;

export default function OrderStatus() {
  const matches = useMediaQuery("(min-width: 800px)");
  const navigate = useNavigate();

  const toText = (code: FilterCode) => (code === 0 ? "Pending" : "");

  const [filter, setFilter] = useState<{ value: string; code?: number }>({
    value: "newest to oldest",
  });

  const { data } = useQuery<unknown, AxiosError, { data: OrderStatusType[] }>(
    ["/Order/GetVendorOrders"],
    {
      initialData: { data: rows },
    }
  );

  const orders = data?.data;

  return (
    <Layout>
      <PageHeader pageTitle='Order Status'>
        <PaginationOf current={[1, 6]} total={6} />
        <FilterModal
          options={[
            { value: "delivered" },
            { value: "pending" },
            { value: "cancelled" },
            { value: "newest to oldest" },
            { value: "oldest to newest" },
          ]}
          onSelect={setFilter}
          selected={filter.value}
        />
      </PageHeader>

      <TableContainer
        style={{ marginTop: "35px", borderRadius: "17px" }}
        component={Paper}>
        {matches ? (
          <Table sx={{ minWidth: 700 }} aria-label='customized table'>
            <TableBody>
              <StyledTableRow>
                <StyledTableCell>
                  <h2 className={styles.title}>Description</h2>
                </StyledTableCell>
                <StyledTableCell align='center'>
                  <h2 className={styles.title}>Quantity</h2>
                </StyledTableCell>
                <StyledTableCell align='center'>
                  <h2 className={styles.title}>Status</h2>
                </StyledTableCell>
                <StyledTableCell align='center'>
                  <h2 className={styles.title}>Order Date</h2>
                </StyledTableCell>
                <StyledTableCell align='center'>
                  <h2 className={styles.title}>Total Price</h2>
                </StyledTableCell>
                <StyledTableCell align='right'></StyledTableCell>
              </StyledTableRow>
              {orders?.slice(0, 6).map((row) => (
                <StyledTableRow key={row.orderId}>
                  <StyledTableCell component='th' scope='row'>
                    <h3 className={styles.subText}>{row.description}</h3>
                  </StyledTableCell>
                  <StyledTableCell align='center'>
                    <h3 className={styles.subText}>{row.quantity}</h3>
                  </StyledTableCell>
                  <StyledTableCell align='center'>
                    <p
                      className={`${
                        row.orderStatus === 1 && styles.delivered
                      } ${row.orderStatus === 0 && styles.pending} ${
                        row.orderStatus === 3 && styles.cancelled
                      } `}>
                      {toText(row.orderStatus)}
                    </p>
                  </StyledTableCell>
                  <StyledTableCell align='center'>
                    <h3 className={styles.subText}>
                      {localeDate(row.purchasedDate)}
                    </h3>
                  </StyledTableCell>
                  <StyledTableCell align='center'>
                    <h3 className={styles.subText}>{row.unitPrice}</h3>
                  </StyledTableCell>
                  <StyledTableCell align='right' style={{ cursor: "pointer" }}>
                    <SubModal>
                      <button onClick={() => navigate(row.orderId)}>
                        View
                      </button>
                      <button>Report</button>
                    </SubModal>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <Table sx={{ width: "100%" }} aria-label='customized table'>
            <TableBody>
              <StyledTableRow>
                <StyledTableCell>
                  <h2 className={styles.title}>Desc.</h2>
                </StyledTableCell>
                <StyledTableCell align='center'>
                  <h2 className={styles.title}>Status</h2>
                </StyledTableCell>
                <StyledTableCell align='center'>
                  <h2 className={styles.title}>N/Ltr</h2>
                </StyledTableCell>
                <StyledTableCell align='right'></StyledTableCell>
              </StyledTableRow>
              {orders?.slice(0, 6).map((row) => (
                <StyledTableRow key={row.orderId}>
                  <StyledTableCell
                    scope='row'
                    align='center'
                    style={{ padding: "10px 3px" }}>
                    <h3 className={styles.subText}>
                      {row.description
                        .split(" ")
                        [row.description.split(" ").length - 1].toString()}
                    </h3>
                  </StyledTableCell>
                  <StyledTableCell
                    align='center'
                    style={{ padding: "10px 3px" }}>
                    <p
                      className={`${
                        row.orderStatus === 1 && styles.delivered
                      } ${row.orderStatus === 0 && styles.pending} ${
                        row.orderStatus === 2 && styles.cancelled
                      } `}>
                      {row.orderStatus}
                    </p>
                  </StyledTableCell>
                  <StyledTableCell
                    align='center'
                    style={{ padding: "10px 3px" }}>
                    <h3 className={styles.subText}>
                      {limitText(localeDate(row.purchasedDate), 6)}
                    </h3>
                  </StyledTableCell>
                  <StyledTableCell align='left' style={{ padding: "10px 3px" }}>
                    <ArrowRight
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        navigate(row.orderId);
                      }}
                    />
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </TableContainer>
    </Layout>
  );
}

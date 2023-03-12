import React, { ReactNode, useReducer, useState } from "react";
import Layout from "../../../containers/LayoutVendor";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import styles from "./style.module.css";
import OptionsModal from "../../../Components/OptionsModal";
import Modal from "../../../Components/Modals";
import PageHeader, {
  FilterModal,
  PaginationOf,
} from "../../../Components/PageHeader";
import Button from "../../../Components/Button";
import { useNavigate } from "react-router-dom";
import useMediaQuery from "../../../Custom hooks/useMediaQuery";
import { ReactComponent as ArrowRight } from "../../../assets/svg/dark-arrow-right.svg";
import { limitText } from "../../../Custom hooks/helpers";
import { useQuery } from "@tanstack/react-query";

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
  id: string,
  name: string,
  calories: string,
  fat: string,
  carbs: string,
  protein: string
) => {
  return { id, name, calories, fat, carbs, protein };
};

export const rows = [
  createData(
    "1",
    ".88 Distilled Diesel",
    "Diesel",
    "In stock",
    "6 hours",
    "N300.00"
  ),
  createData(
    "2",
    "Unadulterated Petrol",
    "Petrol",
    "In stock",
    "6 hours",
    "N300.00"
  ),
  createData(
    "3",
    ".9 Distilled Diesel",
    "AGO Diesel",
    "Out of stock",
    "6 hours",
    "N300.00"
  ),
  createData(
    "4",
    "Pure, distilled Kerosene",
    "AGO Diesel",
    "In stock",
    "6 hours",
    "N300.00"
  ),
  createData(
    "5",
    "Pure, distilled Kerosene",
    "Diesel",
    "Out of stock",
    "6 hours",
    "N300.00"
  ),
  createData(
    "6",
    ".9 Distilled Diesel",
    "AGO Diesel",
    "In stock",
    "6 hours",
    "N300.00"
  ),
  createData(
    "7",
    "Pure, distilled Kerosene",
    "AGO Diesel",
    "In stock",
    "6 hours",
    "N300.00"
  ),
  createData(
    "8",
    ".88 Distilled Diesel",
    "Petrol",
    "Out of stock",
    "6 hours",
    "N300.00"
  ),
  createData(
    "9",
    "Unadulterated Petrol",
    "AGO Diesel",
    "Out of stock",
    "6 hours",
    "N300.00"
  ),
  createData(
    "10",
    ".9 Distilled Diesel",
    "Petrol",
    "In stock",
    "6 hours",
    "N300.00"
  ),
].slice(0, 4);

export default function ProductList() {
  const navigate = useNavigate();
  const matches = useMediaQuery("(min-width: 800px)");
  const [deleteCfmModal, setDCfM] = useState(false);

  // eslint-disable-next-line no-empty-pattern
  const {} = useQuery(["/Product/GetAllProducts"]);

  return (
    <Layout>
      <Modal openModal={deleteCfmModal} closeModal={() => setDCfM(false)}>
        <h3>Alert</h3>
        <p>
          You are about to delete the product “AGO Diesel” Please note the
          product will be permanently deleted.
        </p>
        <p>Kindly click to confirm</p>
        <div className="flex-btwn">
          <Button text="Back" width="55%" />
          <Button text="Delete" variant="danger" width="40%" />
        </div>
      </Modal>
      <>
        <PageHeader pageTitle="Product List">
          {matches && <PaginationOf current={[1, 4]} total={6} />}
          <FilterModal
            selected="In-stock"
            options={[
              { value: "In-stock" },
              { value: "Out of Stock" },
              { value: "Newest to Oldest" },
              { value: "Oldest to Newest" },
            ]}
          />
          <Button
            text={matches ? "Add Product" : "Add"}
            width={matches ? "190px" : "80px"}
            height={matches ? "48px" : "30px"}
            variant="outlinePrimary"
            onClick={() => navigate("new")}
          />
        </PageHeader>

        <TableContainer
          style={{ marginTop: "35px", borderRadius: "17px" }}
          component={Paper}
        >
          {matches ? (
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableBody>
                <StyledTableRow>
                  <StyledTableCell>
                    <h2 className={styles.title}>Description</h2>
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <h2 className={styles.title}>Category</h2>
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <h2 className={styles.title}>Status</h2>
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <h2 className={styles.title}>Supply Time</h2>
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <h2 className={styles.title}>Price/Ltr</h2>
                  </StyledTableCell>
                  <StyledTableCell align="right"></StyledTableCell>
                </StyledTableRow>
                {rows.map((row) => (
                  <StyledTableRow key={row.name}>
                    <StyledTableCell component="th" scope="row">
                      <h3 className={styles.subText}>{row.name}</h3>
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <h3 className={styles.subText}>{row.calories}</h3>
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <p
                        className={`${
                          row.fat === "In stock" && styles.delivered
                        } ${row.fat === "Pending" && styles.pending} ${
                          row.fat === "Out of stock" && styles.cancelled
                        } `}
                      >
                        {row.fat}
                      </p>
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <h3 className={styles.subText}>{row.carbs}</h3>
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <h3 className={styles.subText}>{row.protein}</h3>
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      <OptionsModal>
                        <button
                          onClick={() => {
                            navigate(row.id);
                          }}
                        >
                          View
                        </button>
                        <button>Edit</button>
                        <button onClick={() => setDCfM(true)}>Delete</button>
                      </OptionsModal>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <Table aria-label="customized table">
              <TableBody>
                <StyledTableRow>
                  <StyledTableCell align="center">
                    <h2 className={styles.title}>Category</h2>
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <h2 className={styles.title}>Status</h2>
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <h2 className={styles.title}>N/Ltr</h2>
                  </StyledTableCell>
                  <StyledTableCell align="right"></StyledTableCell>
                </StyledTableRow>
                {rows.map((row) => (
                  <StyledTableRow key={row.name}>
                    <StyledTableCell
                      align="center"
                      style={{ padding: "15x 3px" }}
                    >
                      <h3 className={styles.subText}>{row.calories}</h3>
                    </StyledTableCell>
                    <StyledTableCell
                      align="center"
                      style={{ padding: "10px 3px" }}
                    >
                      <p
                        style={{ padding: "1px 2px" }}
                        className={`${
                          row.fat === "In stock" && styles.delivered
                        } ${row.fat === "Pending" && styles.pending} ${
                          row.fat === "Out of stock" && styles.cancelled
                        } `}
                      >
                        {limitText(row.fat, 8)}
                      </p>
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <h3 className={styles.subText}>{row.protein}</h3>
                    </StyledTableCell>
                    <StyledTableCell
                      align="left"
                      style={{ padding: "10px 3px" }}
                    >
                      <ArrowRight
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          navigate(row.id);
                        }}
                      />
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </TableContainer>
      </>
    </Layout>
  );
}

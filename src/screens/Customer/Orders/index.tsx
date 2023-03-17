import useMediaQuery from "../../../../src/Custom hooks/useMediaQuery";
import PageHeader, {
  FilterModal,
  PaginationOf,
} from "../../../../src/Components/PageHeader";
import Layout from "../../../../src/containers/LayoutCustomer";
import styles from "./style.module.css";
import { SelectTemp } from "../../../../src/Components/InputTemp";
import Button from "../../../../src/Components/Button";
import { useState } from "react";
import EmptyStates from "../../../../src/containers/EmptyStates";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import { limitText } from "../../../../src/Custom hooks/helpers";

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

  const [data, setData] = useState({ orders: [] });

  return (
    <Layout>
      <PageHeader pageTitle='My Orders'>
        {matches && <PaginationOf current={[1, 20]} total={20} />}
        <FilterModal table currentLabel='Newest to oldest'>
          <>
            <div className={styles.singleFilter}>
              <p>State:</p>
              <SelectTemp
                mode='dark'
                // options={data.states.map((state) => ({
                //   label: state.text,
                //   value: state.value,
                // }))}
                // value={values.state.value}
                // onValueChange={handleStateGlobalChange}
                className={styles.singleFilterSelect}
              />
            </div>
            <div className={styles.singleFilter}>
              <p>LGA:</p>
              <SelectTemp
                mode='dark'
                // options={data.lgas.map((state) => ({
                //   label: state.text,
                //   value: state.value,
                // }))}
                // value={values.lga}
                // onValueChange={handleLgaGlobalChange}
                className={styles.singleFilterSelect}
              />
            </div>
            <div className={styles.singleProductFilter}>
              <p>Product Type:</p>
              <SelectTemp
                mode='dark'
                // options={productTypeData.map((state) => ({
                //   label: state.name,
                //   value: state.value,
                // }))}
                // value={values.productType}
                // onValueChange={handleProductTypeGlobalChange}
                className={styles.singleProductFilterSelect}
              />
            </div>
            <div className={styles.singleProductFilter}>
              <p>Price range:</p>
              <SelectTemp
                mode='dark'
                // options={priceRangeData.map((state) => ({
                //   label: state.name,
                //   value: state.value,
                // }))}
                // value={values.priceRange}
                // onValueChange={handlePriceRangeGlobalChange}
                className={styles.singleProductFilterSelect}
              />
            </div>
            <div className={styles.singleProductFilter}>
              <p>Supply Time:</p>
              <SelectTemp
                mode='dark'
                // options={supplyTimeData.map((state) => ({
                //   label: state.name,
                //   value: state.value,
                // }))}
                // value={values.supplyTime}
                // onValueChange={handleSupplyTimeGlobalChange}
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
                // onClick={applyFilter}
              />
            </div>
          </>
        </FilterModal>
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

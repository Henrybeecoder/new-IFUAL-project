import React, { useState } from "react";
import styles from "./style.module.css";
import Layout from "../../../containers/LayoutVendor";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { styled } from "@mui/material/styles";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useNavigate } from "react-router-dom";
import totOrder from "../../../assets/svg/totorder.svg";
import shopOrder from "../../../assets/svg/shopOrder.svg";
import OptionsModal from "../../../Components/OptionsModal";
import useMediaQuery from "../../../Custom hooks/useMediaQuery";
import { ReactComponent as ArrowDown } from "../../../assets/svg/ArrowDownActive.svg";
import { useQuery } from "@tanstack/react-query";
import { vendorId } from "../../../lib/constant";

function createData(
  name: string,
  calories: string,
  fat: string,
  carbs: string,
  protein: string
) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData(
    ".88 Distilled Diesel",
    "100 l",
    "Delivered",
    "28/07/2022",
    "N30,000.00"
  ),
  createData(
    "Unadulterated Petrol",
    "100 l",
    "Pending",
    "28/07/2022",
    "N30,000.00"
  ),
  createData(
    ".9 Distilled Diesel",
    "100 l",
    "Cancelled",
    "28/07/2022",
    "N30,000.00"
  ),
];

const data = [
  {
    name: "JAN",
    uv: 2000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "FEB",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "MAR",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "APR",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "MAY",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "JUN",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "JUL",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
  {
    name: "AUG",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
  {
    name: "SEP",
    uv: 4000,
    pv: 4300,
    amt: 2100,
  },
  {
    name: "OCT",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
  {
    name: "NOV",
    uv: 4000,
    pv: 4300,
    amt: 2100,
  },
  {
    name: "DEC",
    uv: 2000,
    pv: 4300,
    amt: 2100,
  },
];

export default function Dashboard() {
  const navigate = useNavigate();
  const matches = useMediaQuery("(min-width: 800px)");

  const { data: totalRevenue } = useQuery(
    ["/Dash/TotalRevenue", { vendorId: vendorId }],
    { enabled: !!vendorId, initialData: { data: "0.00" } }
  );
  const { data: pendingOrderCount } = useQuery(
    ["/Dash/PendingOrderCount", { vendorId: vendorId }],
    { enabled: !!vendorId, initialData: 0 }
  );
  const { data: totalOrderCount } = useQuery(
    ["/Dash/TotalOrderCount", { vendorId: vendorId }],
    { enabled: !!vendorId, initialData: 0 }
  );

  return (
    <Layout>
      <p className={styles.performance}>
        Hello, <b>ABC OIL & GAS</b>
      </p>

      <p className={styles.performance}>
        <b>PERFORMANCE</b>
      </p>
      <div className={"flex-lg"}>
        <div className={styles.chartContainer}>
          <div className={styles.chartHeader}>
            <div className={styles.firstCon}>
              <h3>TOTAL REVENUE</h3>
              <h2>₦{totalRevenue.data}</h2>
            </div>
            <div className={styles.linkContainer}>
              <button className={styles.active}>WEEKLY</button>
              <button className={styles.active}>MONTHLY</button>
              <button className={styles.active}>YEARLY</button>
            </div>
            <button>
              <p>OCT</p>
              <ArrowDown />
            </button>
          </div>

          <div style={{ width: "100%", height: 200 }}>
            <ResponsiveContainer>
              <AreaChart data={data}>
                {/* <CartesianGrid strokeDasharray='3 3' /> */}
                <XAxis dataKey='name' />

                <Tooltip />
                <Area
                  type='monotone'
                  dataKey='uv'
                  stroke='#35DB9F'
                  fill='rgba(53, 219, 159, 0.24)'
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className={styles.orderStatusChart}>
          <div className={styles.orderCard}>
            <div className={styles.textContainer}>
              <p>TOTAL ORDERS</p>
              <b>{totalOrderCount}</b>
              <span>View</span>
            </div>
            <div className={styles.imgContainer}>
              <img src={totOrder} alt='' />
            </div>
          </div>
          <div className={`${styles.orderCard}`}>
            <div className={styles.textContainer}>
              <p>PENDING ORDERS</p>
              <b>{pendingOrderCount}</b>
              <span>View</span>
            </div>
            <div className={styles.imgContainer}>
              <img src={shopOrder} alt='' />
            </div>
          </div>
        </div>
      </div>
      <div className={styles.table}>
        <div className={styles.tableHeader}>
          <h2>ORDERS</h2>
          <div
            className={styles.orderLink}
            onClick={() => navigate("/vendor/order-status")}>
            <p>VIEW MORE</p>
            {/* <img src={right} alt='' /> */}
          </div>
        </div>
        {/* table */}
        <div className='table-wrapper'>
          {matches ? (
            <table style={{ minWidth: 700 }} aria-label='customized table'>
              <tr>
                <th>Description</th>
                <th align='center'>Quantity</th>
                <th align='center'>Status</th>
                <th align='center'>Order Date</th>
                <th align='center'>Total Price</th>
                <th align='right'></th>
              </tr>
              {rows.map((row) => (
                <>
                  <tr key={row.name}>
                    <td>{row.name}</td>
                    <td align='center'>{row.calories}</td>
                    <td align='center'>
                      <p
                        className={`${
                          row.fat === "Delivered" && styles.delivered
                        } ${row.fat === "Pending" && styles.pending} ${
                          row.fat === "Cancelled" && styles.cancelled
                        } `}>
                        {row.fat}
                      </p>
                    </td>
                    <td align='center'>{row.carbs}</td>
                    <td align='center'>{row.protein}</td>
                    <td
                      align='right'
                      style={{ cursor: "pointer", position: "relative" }}>
                      <OptionsModal>
                        <button>View</button>
                      </OptionsModal>
                    </td>
                  </tr>
                </>
              ))}
            </table>
          ) : (
            <table style={{ minWidth: 700 }} aria-label='customized table'>
              <tr>
                <th>Description</th>
                <th align='center'>Quantity</th>
                <th align='center'>Status</th>
                <th align='center'>Order Date</th>
                <th align='center'>Total Price</th>
                <th align='right'></th>
              </tr>
              {rows.map((row) => (
                <>
                  <tr key={row.name}>
                    <td>{row.name}</td>
                    <td align='center'>{row.calories}</td>
                    <td align='center'>
                      <p
                        className={`${
                          row.fat === "Delivered" && styles.delivered
                        } ${row.fat === "Pending" && styles.pending} ${
                          row.fat === "Cancelled" && styles.cancelled
                        } `}>
                        {row.fat}
                      </p>
                    </td>
                    <td align='center'>{row.carbs}</td>
                    <td align='center'>{row.protein}</td>
                    <td
                      align='right'
                      style={{ cursor: "pointer", position: "relative" }}>
                      <OptionsModal>
                        <button>View</button>
                      </OptionsModal>
                    </td>
                  </tr>
                </>
              ))}
            </table>
          )}
        </div>
      </div>
    </Layout>
  );
}

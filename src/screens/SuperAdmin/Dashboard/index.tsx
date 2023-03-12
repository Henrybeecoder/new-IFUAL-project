import Layout from "../../../containers/LayoutSuperAdmin";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { SvgRightIcon } from "../../../assets/Svgs";
import { useState } from "react";
import useMediaQuery from "../../../Custom hooks/useMediaQuery";
import DashboardShared from "../../../screens/SharedAdmin/Dashboard";

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

const Dashboard = () => {
  const [page, setPage] = useState("home");
  const matches = useMediaQuery("(min-width: 800px)");

  return (
    <Layout
      backBtn={!!(page === "overview-all")}
      onClickBackBtn={() => setPage("home")}>
      <DashboardShared />
    </Layout>
  );
};

export default Dashboard;

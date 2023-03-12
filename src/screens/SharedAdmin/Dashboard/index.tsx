import styles from "./style.module.css";
import {
  AreaChart,
  Area,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { SvgRightIcon } from "../../../assets/Svgs";
import { useState } from "react";
import useMediaQuery from "../../../Custom hooks/useMediaQuery";
import { ReactComponent as ArrowDownSvg } from "../../../assets/svg/arrowDown.svg";

const data = [
  {
    name: "JUN",
    uv: 2000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "JUL",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "AUG",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "SEP",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "OCT",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "NOV",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
];

const Dashboard = () => {
  const [page, setPage] = useState("home");
  const matches = useMediaQuery("(min-width: 800px)");

  return (
    <>
      {page === "overview-all" ? (
        <>
          <OverViewAll />
        </>
      ) : (
        <>
          <div className={styles.flexGreetings}>
            <h3>HELLO, ADEOLA</h3>
            <p>Last activity, 2 mins ago</p>
          </div>

          <div className={styles.flexTitle}>
            <h3>OVERVIEW</h3>
            <button onClick={() => setPage("overview-all")}>
              <p>View more</p>
              <SvgRightIcon />
            </button>
          </div>
          <div className={styles.scrollX}>
            <div className={styles.statsContainer}>
              <StatsCard heading='CUSTOMER COUNT' value='2000' />
              <StatsCard heading='VENDOR COUNT' value='107' />
              <StatsCard heading='ADMIN COUNT' value='8' />
              <StatsCard heading='TOTAL ORDERS PROCESSED' value='2000' />
            </div>
          </div>
          <div className={styles.chartSection}>
            <h3>STATS</h3>
            <div className={styles.chartsFlex}>
              <div className={styles.chartContainer}>
                <div className={styles.chartMeta}>
                  <div>
                    <h3>TOTAL VISITS</h3>
                    <h2>4,000</h2>
                  </div>
                  <button>
                    <p>MONTHLY</p>
                    <ArrowDownSvg />
                  </button>
                  <button>
                    <p>OCT</p>
                    <ArrowDownSvg />
                  </button>
                </div>
                <ResponsiveContainer width={"100%"} height={131}>
                  <AreaChart data={data}>
                    <XAxis
                      dataKey='name'
                      style={{
                        fontSize: "12",
                        fontWeight: 600,
                        color: "#34443774",
                        width: "100%",
                      }}
                      // axisLine={false}
                      axisLine={{ strokeWidth: "0.5px", height: "0.5px" }}
                      tickLine={false}
                    />

                    <Tooltip />
                    <Area
                      type='monotone'
                      dataKey='uv'
                      stroke='transparent'
                      fill='rgba(53, 219, 159, 0.20)'
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              <div className={styles.chartContainer}>
                <div className={styles.chartMeta}>
                  <div>
                    <h3>TOTAL REVENUE</h3>
                    <h2>N23,000,000.00</h2>
                  </div>
                  <button>
                    <p>MONTHLY</p>
                    <ArrowDownSvg />
                  </button>
                  <button>
                    <p>OCT</p>
                    <ArrowDownSvg />
                  </button>
                </div>
                <ResponsiveContainer width={"100%"} height={131}>
                  <AreaChart data={data}>
                    <XAxis
                      dataKey='name'
                      style={{
                        fontSize: "12",
                        fontWeight: 600,
                        color: "#34443774",
                        // width: "100%",
                      }}
                      axisLine={{ strokeWidth: "0.5px", height: "0.5px" }}
                      tickLine={false}
                    />

                    <Tooltip />
                    <Area
                      type='monotone'
                      dataKey='uv'
                      stroke='transparent'
                      fill='rgba(53, 219, 159, 0.20)'
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
          <div className={styles.actionsSection}>
            <div className={styles.actionHeading}>
              <h3>NEEDED ACTIONS</h3>
              <button>
                <p>VIEW MORE</p>
                <SvgRightIcon />
              </button>
            </div>
            <div className={styles.scrollX}>
              <div className={styles.actionsFlex}>
                <ActionCard
                  heading='MANAGE VENDOR'
                  message='You have a new Onboarding request'
                  onClick={() => {}}
                />
                <ActionCard
                  heading='MANAGE ORDER'
                  message='Order delivery overdue'
                  onClick={() => {}}
                  messageRed
                />
                <ActionCard
                  heading='COMPLAINT LOG'
                  message='New Complaint Received - Paymen...'
                  onClick={() => {}}
                />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

interface StatCardProps {
  heading: string;
  value: string;
  onClick?: () => void;
}

const StatsCard = ({ heading, value, onClick }: StatCardProps) => {
  return (
    <div className={styles.statsCard}>
      <h3>{heading}</h3>
      <p>{value}</p>
      <button onClick={onClick}>view</button>
    </div>
  );
};

interface ActionCardProps {
  heading: string;
  message: string;
  onClick?: () => void;
  messageRed?: boolean;
}

const ActionCard = ({
  heading,
  message,
  onClick,
  messageRed,
}: ActionCardProps) => {
  return (
    <div className={`${styles.actionCard} ${messageRed && styles.messageRed}`}>
      <h3>{heading}</h3>
      <p>{message}</p>
      <button onClick={onClick}>ACT</button>
    </div>
  );
};

const TableTemp = ({ item, value }: { item: string; value: string }) => {
  return (
    <div className={styles.tableTemp}>
      <h3>{item}</h3>
      <p>{value}</p>
    </div>
  );
};

const OverViewAll = () => {
  return (
    <div className={styles.overviewContainer}>
      <h2 className={styles.overviewBreadCrumb}>
        OVERVIEW/ <span>VIEW ALL</span>
      </h2>
      <div style={{ width: "60%" }}>
        <TableTemp item='Customer Count:' value='2,000' />
        <TableTemp item='Vendor Count:' value='107' />
        <TableTemp item='Admin Count:' value='8' />
        <TableTemp item='Total Orders Processed:' value='2,000' />
        <TableTemp item='Total Funds Processed:' value='N240,000,000,000.00' />
        <TableTemp item='Total iFuel Revenue:' value='N34,000,000.00' />
      </div>
    </div>
  );
};

export default Dashboard;

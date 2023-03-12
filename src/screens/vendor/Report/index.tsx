import { useState } from "react";
import Layout from "../../../containers/LayoutVendor";
import styles from "./style.module.css";
import noneSelected from "../../../assets/svg/noneSelected.svg";
import { limitText, localeDate } from "../../../Custom hooks/helpers";
import useMediaQuery from "../../../Custom hooks/useMediaQuery";
import { ChevronLeft } from "@material-ui/icons";
import Checkbox from "../../../Components/Checkbox";
import PageHeader, { FilterModal } from "../../../Components/PageHeader";
import Button from "../../../Components/Button";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ReportType } from "../../../types/vendor";
import TimeAgo from "react-timeago";

const reportList: ReportType[] = [
  {
    reportId: "1",
    referencNumber: "RE0000001 ; Payment",
    title: "Delayed payment",
    description:
      "Payment for transaction not received.Customer refused order, while transportation cost has been incured",
    // question: "Are you available to pick up this order ticket?",
    status: "resolved",
    sender: "Order from 234Estate",
    reportDate: "2022-12-22T20:32:22.1361054",
    category: "",
    vendorId: "0000000-00-0t-9-009",
  },
  {
    reportId: "2",
    referencNumber: "RE0000002 ; Payment",
    title: "Delayed payment",
    description:
      "Payment for transaction not received.Customer refused order, while transportation cost has been incured",
    // question: "Are you available to pick up this order ticket?",
    status: "un-resolve",
    sender: "Order from 234Estate",
    reportDate: "2022-12-23T08:25:33.0912979",
    category: "",
    vendorId: "0000000-00-0t-9-009",
  },
  {
    reportId: "3",
    referencNumber: "RE0000003 ; Payment",
    title: "Delayed payment",
    description: `Payment for transaction not received.Customer refused order, while transportation cost has been incured`,
    // question: "Are you available to pick up this order ticket?",
    status: "resolved",
    sender: "Order from 234Estate",
    reportDate: "2022-12-23T21:46:12.315134",
    category: "",
    vendorId: "0000000-00-0t-9-009",
  },
  {
    reportId: "4",
    referencNumber: "RE0000004 ; Payment",
    title: "Delayed payment",
    description:
      "Payment for transaction not received.Customer refused order, while transportation cost has been incured",
    // question: "Are you available to pick up this order ticket?",
    status: "resolved",
    sender: "Order from 234Estate",
    reportDate: "2022-12-23T21:46:27.921535",
    category: "",
    vendorId: "0000000-00-0t-9-009",
  },
];

interface ResponseType {
  data: ReportType[];
  responseCode: "0";
  responseDescription: "SUCCESSFUL";
}

const Report = () => {
  const matches = useMediaQuery("(min-width: 800px)");
  const navigate = useNavigate();
  const [selected, setSelected] = useState<string | null>(null);
  const selectedContent = reportList.find(
    (report) => report.reportId === selected
  );

  const { data: reports } = useQuery(["/Reports/GetReports"], {
    initialData: { data: reportList },
    enabled: false,
  });

  return (
    <Layout>
      {/* maincontainer */}
      <PageHeader pageTitle='Report'>
        <FilterModal options={[]} />
        <Button
          text='New Report'
          width='180px'
          onClick={() => navigate("new")}
        />
      </PageHeader>
      <div className={styles.reportsContainer}>
        <div
          className={styles.reportsList}
          style={{ display: !matches && selected ? "none" : "unset" }}>
          {reports?.data?.map((report, index) => (
            <div key={report.reportId}>
              <div
                className={styles.reportContainer}
                style={{
                  backgroundColor:
                    selected === report.reportId ? "#F2F6F2" : "transparent",
                }}
                onClick={() => setSelected(report.reportId)}>
                <div>
                  <div
                    className={styles.indicator}
                    style={{
                      backgroundColor:
                        report.status === "un-resolved" ? "#CA0814" : "#36B44A",
                    }}
                  />
                </div>
                <div className={styles.textContents}>
                  <div className={"flex-btwn"}>
                    <h2>{report.title}</h2>
                    <TimeAgo date={report.reportDate} />
                  </div>
                  <p>{limitText(report.description, 60)}</p>
                  <p>Customer refused order</p>
                </div>
              </div>
              <div
                className={styles.divider}
                style={{
                  display: index + 1 === reportList.length ? "none" : "block",
                }}
              />
            </div>
          ))}
        </div>
        <div
          className={styles.selectedContainer}
          style={{ display: !matches && !selected ? "none" : "unset" }}>
          {!selectedContent ? (
            <div className={styles.noneSelected}>
              <div className={styles.noneSelectedContent}>
                <img src={noneSelected} />
                <p>Click to read report</p>
              </div>
            </div>
          ) : (
            <div className={styles.selectedReportContainer}>
              <div className={styles.flexBetweenPadding}>
                <h2>
                  {matches
                    ? selectedContent.referencNumber
                    : limitText(selectedContent.title, 30)}
                </h2>
                <p className={styles.timeAgo}>
                  {localeDate(selectedContent?.reportDate)}
                </p>
              </div>
              <div className={styles.flexBetweenPadding}>
                <h2>
                  {matches
                    ? selectedContent.title
                    : limitText(selectedContent.title, 30)}
                </h2>
                <p
                  style={{
                    color:
                      selectedContent.status === "resolved"
                        ? "#36B44A"
                        : "#CA0814",
                  }}>
                  #{" "}
                  {`${selectedContent.status
                    .slice(0, 1)
                    .toUpperCase()}${selectedContent.status.slice(1)}`}
                </p>
              </div>
              <p>{selectedContent.description}</p>
              <div className={styles.details}>
                <h2>Details</h2>
                <p>{selectedContent.sender}</p>
                <p>Date:{localeDate(selectedContent.reportDate)}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

// const CheckBoxWithText = ({ checked, setChecked, text }) => {
//   return (
//     <div className={styles.checkboxFlex}>
//       <Checkbox checked={checked} />
//       <p>{text}</p>
//     </div>
//   );
// };

export default Report;

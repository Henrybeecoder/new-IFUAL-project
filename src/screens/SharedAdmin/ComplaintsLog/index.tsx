import styles from "./style.module.css";
import { SvgFilterIcon, SvgOptions } from "../../../assets/Svgs";
import Button from "../../../Components/Button";
import { ReactComponent as FilterSvg } from "../../../assets/navbericon/filter-outline.svg";
import OptionsModal from "../../../Components/OptionsModal";
import { SharedAdminComponentProps } from "../../../types/shared";
import { Link } from "react-router-dom";
import Header from "../../../Components/PageHeader/Admin";
import { FilterModal } from "../../../Components/PageHeader";

const data = [
  {
    id: "1",
    ref_no: "RE0000001",
    title: "Payment not see...",
    category: "Payment",
    staff: "Bisi Alonge",
    status: "Ongoing",
  },
  {
    id: "2",
    ref_no: "RE0000001",
    title: "Payment not see...",
    category: "Payment",
    staff: "...",
    status: "New",
  },
  {
    id: "3",
    ref_no: "RE0000001",
    title: "Rude Vendor",
    category: "Payment",
    staff: "Bisi Alonge",
    status: "Ongoing",
  },
  {
    id: "4",
    ref_no: "RE0000001",
    title: "Payment not see...",
    category: "Payment",
    staff: "...",
    status: "New",
  },
  {
    id: "5",
    ref_no: "RE0000001",
    title: "Payment not see...",
    category: "Payment",
    staff: "Bisi Alonge",
    status: "Ongoing",
  },
  {
    id: "6",
    ref_no: "RE0000001",
    title: "Payment not see...",
    category: "Payment",
    staff: "Bisi Alonge",
    status: "Resolved",
  },
  {
    id: "7",
    ref_no: "RE0000001",
    title: "Payment not see...",
    category: "Payment",
    staff: "Bisi Alonge",
    status: "Resolved",
  },
  {
    id: "8",
    ref_no: "RE0000001",
    title: "Payment not see...",
    category: "Payment",
    staff: "Bisi Alonge",
    status: "Resolved",
  },
  {
    id: "9",
    ref_no: "RE0000001",
    title: "Payment not see...",
    category: "Payment",
    staff: "Bisi Alonge",
    status: "Resolved",
  },
];

const ComplaintLog = ({ baseUrl }: SharedAdminComponentProps) => {
  return (
    <>
      <Header pageTitle='COMPLAINTS LOG'>
        <Link to='custom-message'>
          <Button
            text='Custom Message'
            height='40px'
            style={{ width: "130px" }}
          />
        </Link>
        <FilterModal options={[]} />
      </Header>
      <div className={"table-wrapper"}>
        <table>
          <thead>
            <tr>
              <th>Ref No.</th>
              <th>Title</th>
              <th>Category</th>
              <th>Staff</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data?.map((row) => {
              const status = row.status.toLowerCase();
              const bgColor =
                status === "ongoing"
                  ? "#F2F6F2"
                  : status === "new"
                  ? "#FCDEE4"
                  : "#F3FFF3";
              const color =
                status === "ongoing"
                  ? "#344437"
                  : status === "new"
                  ? "#CA0814"
                  : "#36B44A";
              return (
                <tr key={row.id}>
                  <td>{row.ref_no}</td>
                  <td>{row.title}</td>
                  <td>{row.category}</td>
                  <td>{row.staff}</td>
                  <td className={styles.statusContainer}>
                    <p
                      style={{
                        backgroundColor: bgColor,
                        color,
                        padding: "2px 10px",
                        borderRadius: "20px",
                        width: "fit-content",
                      }}>
                      {row.status}
                    </p>
                  </td>
                  <td>
                    <OptionsModal>
                      <button>View</button>
                      <button>Edit</button>
                    </OptionsModal>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ComplaintLog;

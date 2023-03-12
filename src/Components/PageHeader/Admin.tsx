import { useNavigate } from "react-router-dom";
import { type Props, type EDBtnProps } from "./index";
import { ReactComponent as LeftSvg } from "../../assets/svg/left.svg";
import { ReactComponent as RightSvg } from "../../assets/svg/right.svg";
import { ReactComponent as FilterSvg } from "../../assets/navbericon/filter-outline.svg";
import { ReactComponent as EditOutlineSvg } from "../../assets/navbericon/edit-outline.svg";
import { ReactComponent as EditSvg } from "../../assets/navbericon/edit.svg";
import { ReactComponent as ArrowBackSvg } from "../../assets/svg/left.svg";
import styles from "./style.module.css";

const PageHeader = ({
  pageTitle,
  parentPageTitle,
  backBtn,
  onClickBackBtn,
  children,
}: Props) => {
  const navigate = useNavigate();
  return (
    <>
      {backBtn ? (
        <button
          className={styles.backBtnAdmin}
          onClick={!onClickBackBtn ? () => navigate(-1) : onClickBackBtn}>
          <ArrowBackSvg />
          <p>Back</p>
        </button>
      ) : null}
      <div className={styles.headerFlexA}>
        <h3 className={styles.breadcrumbAdmin}>
          {parentPageTitle ? <span>{parentPageTitle} /</span> : null}{" "}
          {pageTitle}
        </h3>
        <div className={styles.childrenFlex}>{children}</div>
      </div>
    </>
  );
};

export const EditBtn = ({ onClick, active }: EDBtnProps) => {
  return (
    <button
      className={`${styles.editBtn} ${active ? styles.edit : ""}`}
      onClick={onClick}>
      <h3>EDIT</h3> <EditOutlineSvg />
    </button>
  );
};

export const DeleteBtn = ({ onClick, active }: EDBtnProps) => {
  return (
    <button
      className={`${styles.editBtn} ${active ? styles.delete : ""}`}
      onClick={onClick}>
      <h3>DELETE</h3>
      <EditOutlineSvg />
    </button>
  );
};

export default PageHeader;

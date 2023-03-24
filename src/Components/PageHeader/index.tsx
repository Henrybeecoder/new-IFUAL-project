import { Dispatch, ReactNode, SetStateAction, useState } from "react";
import { ReactComponent as LeftSvg } from "../../assets/svg/left.svg";
import { ReactComponent as RightSvg } from "../../assets/svg/right.svg";
import { ReactComponent as FilterSvg } from "../../assets/navbericon/filter-outline.svg";
import { ReactComponent as EditSvg } from "../../assets/navbericon/edit.svg";
import { ReactComponent as ArrowBackSvg } from "../../assets/svg/left.svg";
import styles from "./style.module.css";
import { Root, Portal, Content, Trigger } from "@radix-ui/react-popover";
import { useNavigate } from "react-router-dom";

export interface Props {
  parentPageTitle?: string;
  pageTitle: string;
  children?: ReactNode;
  backBtn?: boolean;
  onClickBackBtn?: () => void;
}

interface FilterModalProps {
  children?: ReactNode;
  options?: { value: string; code?: number }[];
  onSelect?: ({ value, code }: { value: string; code?: number }) => void;
  selected?: number;
  table?: boolean;
  currentLabel?: string;
  open?: boolean;
  setOpen?: Dispatch<SetStateAction<boolean>>;
}

export const FilterModal = ({
  options,
  selected,
  onSelect = () => {},
  table,
  children,
  currentLabel = "Filter",
  open: filterOpen,
  setOpen: setFilterOpen,
}: FilterModalProps) => {
  const active = (code?: number) => !!(selected === code);

  const [open, setOpen] = useState<boolean | undefined>();

  return (
    <div>
      <Root
        open={filterOpen ?? open}
        onOpenChange={(state) => {
          setOpen(state);
          setOpen && setFilterOpen(state);
        }}>
        <Trigger className={"flex-btwn gap-10"}>
          <h3>{currentLabel}</h3>
          <FilterSvg />
        </Trigger>
        <Portal>
          <Content
            className={
              table
                ? `${styles.bigFilterContainer}`
                : `${styles.filterContainer} `
            }>
            <h3>Filter;</h3>
            <div className='divider' />
            <>
              {table ? (
                <div className={styles.bigFilter}>{children}</div>
              ) : (
                <div className={styles.optionsContainer}>
                  {options?.map((option) => (
                    <button
                      key={option.value}
                      className={`${active(option?.code) ? "text-green" : ""}`}
                      onClick={() => {
                        setOpen(false);
                        onSelect({ code: option.code, value: option.value });
                      }}>
                      {`${option.value
                        .charAt(0)
                        .toUpperCase()}${option.value.slice(1)}`}
                    </button>
                  ))}
                </div>
              )}
            </>
          </Content>
        </Portal>
      </Root>
    </div>
  );
};

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
          className={styles.backBtn}
          onClick={!onClickBackBtn ? () => navigate(-1) : onClickBackBtn}>
          <ArrowBackSvg />
          <p>Back</p>
        </button>
      ) : null}
      <div className={styles.headerFlex}>
        <h3 className={styles.breadcrumb}>
          {parentPageTitle ? <span>{parentPageTitle} /</span> : null}{" "}
          {pageTitle}
        </h3>
        <div className={styles.childrenFlex}>{children}</div>
      </div>
    </>
  );
};

export interface EDBtnProps {
  onClick?: () => void;
  active?: boolean;
}

export const EditBtn = ({ onClick, active }: EDBtnProps) => {
  return (
    <button
      className={`${styles.editBtn} ${!active ? styles.edit : ""}`}
      onClick={onClick}>
      <h3 style={{ fontSize: "23px" }}>Edit</h3>
      <EditSvg />
    </button>
  );
};

export const DeleteBtn = ({ onClick, active }: EDBtnProps) => {
  return (
    <button
      className={`${styles.editBtn} ${!active ? styles.delete : ""}`}
      onClick={onClick}>
      <h3 style={{ fontSize: "23px" }}>Delete</h3>
      <EditSvg />
    </button>
  );
};

export interface PaginationProps {
  onLeftArrowClick?: () => void;
  onRightArrowClick?: () => void;
  current: number | string;
  total: number;
}

export const Pagination = ({
  current,
  total,
  onLeftArrowClick,
  onRightArrowClick,
}: PaginationProps) => {
  return (
    <div className={styles.pagn}>
      <div>
        <span>{current}</span>/<p>{total}</p>
      </div>
      <button onClick={onLeftArrowClick}>
        <LeftSvg />
      </button>
      <button onClick={onRightArrowClick}>
        <RightSvg />
      </button>
    </div>
  );
};

interface PaginationOfProps {
  onLeftArrowClick?: () => void;
  onRightArrowClick?: () => void;
  current: [number | string, number | string];
  total: number;
}

export const PaginationOf = ({
  current = [0, 0],
  total,
  onLeftArrowClick,
  onRightArrowClick,
}: PaginationOfProps) => {
  return (
    <div className={styles.pagnOf}>
      <p>
        <span>{current[0]}</span> - <span>{current[1]}</span> of{" "}
        <span>{total}</span>
      </p>
      <button onClick={onLeftArrowClick}>
        <LeftSvg />
      </button>
      <button onClick={onRightArrowClick}>
        <RightSvg />
      </button>
    </div>
  );
};

export default PageHeader;

import React, { CSSProperties, ReactNode } from "react";
import styles from "./style.module.css";
import X from "../../assets/svg/x.svg";

interface ModalProps {
  name?: string;
  children?: ReactNode;
  openModal?: boolean;
  closeModal?: () => void;
  width?: "lg" | "md" | "sm" | "xl";
  variant?: "default" | "unstyled";
  style?: CSSProperties;
}

export default function Modal({
  children,
  openModal,
  closeModal,
  width = "lg",
  variant = "default",
  style,
}: ModalProps) {
  return (
    <>
      {openModal && (
        <div className={styles.overlay} style={style}>
          <div
            className={`${styles.outerContainer} ${
              variant !== "unstyled" ? styles[width] : ""
            }`}>
            {closeModal && (
              <button className={styles.closeModalX} onClick={closeModal}>
                <img src={X} />
              </button>
            )}

            <div className={`${styles.modal} ${styles[variant]}`}>
              {children}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

import { ReactNode, useState } from "react";
import styles from "./style.module.css";
import { SvgOptions } from "../../assets/Svgs";
import { Root, Trigger, Portal, Content } from "@radix-ui/react-popover";

interface SubModalProps {
  children?: ReactNode;
}

const OptionsModal = ({ children }: SubModalProps) => {
  return (
    <Root>
      <Trigger asChild>
        <button>
          <SvgOptions />
        </button>
      </Trigger>
      <Portal>
        <Content className={styles.container}>{children}</Content>
      </Portal>
    </Root>
  );
};

export default OptionsModal;

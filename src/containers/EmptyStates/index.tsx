import React from "react";
import cartImg from "../../assets/emptyState/cart.svg";
import tableImg from "../../assets/emptyState/table.svg";
import styles from "./style.module.css";

interface EmptyStateProps {
  cart?: boolean;
  table?: boolean;
}

export default function EmptyStates({ cart, table }: EmptyStateProps) {
  return (
    <div className={styles.emptyContainer}>
      {cart && <img src={cartImg} alt="" />}
      {table && <img src={tableImg} alt="" />}

      {cart && <h1>No Item Found</h1>}
      {table && <h1>No result found</h1>}

      {cart && (
        <p>
          Sorry, there is no item in your shopping cart. Go to Home to add
          Products
        </p>
      )}
      {table && (
        <p>Sorry, there is no result, please try another search keyword.</p>
      )}
    </div>
  );
}

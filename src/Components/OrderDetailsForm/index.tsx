import { useEffect, useState } from "react";
import { statesOptions } from "../../Custom hooks/helpers";
import { SvgArrowDown, SvgArrowUp } from "../../assets/Svgs";
import useMediaQuery from "../../Custom hooks/useMediaQuery";
import { InputTemp, SelectTemp } from "../InputTemp";
import styles from "./style.module.css";

const OrderDetailsForm = ({ selectedProduct }: { selectedProduct: any }) => {
  const matches = useMediaQuery("(min-width: 800px)");
  const [productQuantity, setPQ] = useState(0);
  const [productPrice, setProductPrice] = useState("");

  useEffect(() => {
    setPQ(selectedProduct?.quantity);
    setProductPrice(selectedProduct?.unitPrice);
  }, [selectedProduct?.quantity, selectedProduct?.unitPrice]);

  const increment = () => {
    setPQ((state) => state + 1);
  };
  const decrement = () => {
    setPQ((state) => state - 1);
  };

  return (
    <>
      <div className={styles.flexLg}>
        {/* product details */}
        <div className={styles.productDetails}>
          <h3>Product Details</h3>
          <div style={{ width: "100%" }}>
            <div className={styles.flexDetail}>
              <p>Product</p>
              <span>{selectedProduct?.productName}</span>
            </div>
            <div className={styles.flexDetail}>
              <p>Delivery time</p>
              <span>6 hours</span>
            </div>
            <div className={styles.flexDetail}>
              <p>Price</p>
              <span> {`N${productPrice} / 1tr`}</span>
            </div>
            <div className={styles.flexDetail}>
              <p>Quantity</p>
              <span className={styles.inputGroup}>
                <input type='tel' value={productQuantity} />
                <div className={styles.controls}>
                  <button onClick={increment}>
                    <SvgArrowUp />
                  </button>
                  <button onClick={decrement}>
                    <SvgArrowDown />
                  </button>
                </div>
              </span>
            </div>
            <div className={styles.flexDetail}>
              <p>Total</p>
              <span>{`N${selectedProduct?.unitPrice} / 1tr`}</span>
            </div>
          </div>
        </div>
        {/* delivery details */}
        <div className={styles.deliveryDetials}>
          <h3>Delivery Details</h3>
          <div className={styles.flexLg}>
            <InputTemp label='FIRST NAME' value='Beatrice' marginRight />
            <InputTemp label='SURNAME' value='Bimpe' marginLeft />
          </div>
          <div className={styles.flexLg}>
            <InputTemp label='PHONE NUMBER' value='08123456789' marginRight />
            <InputTemp
              label='EMAIL ADDRESS'
              value='dash@ifuel.com'
              marginLeft
            />
          </div>
          <div className={styles.flexLg}>
            <InputTemp
              label='DELIVERY ADDRESS'
              value='No. 1, Bosipo district, Ikoyi'
              marginRight
            />
            <SelectTemp
              width={matches ? "150px" : "100%"}
              label='STATE'
              placeholder='Lagos'
              options={statesOptions}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderDetailsForm;

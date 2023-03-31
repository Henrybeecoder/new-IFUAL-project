import { statesOptions } from "../../Custom hooks/helpers";
import { SvgArrowDown, SvgArrowUp } from "../../assets/Svgs";
import useMediaQuery from "../../Custom hooks/useMediaQuery";
import { InputTemp, SelectTemp } from "../InputTemp";
import styles from "./style.module.css";
import { PaymentPayload } from "src/screens/Checkout/types";

interface Props {
  values: PaymentPayload;
  onValueChange?: (field: string, value: string | number) => void;
}

const OrderDetailsForm = ({ values, onValueChange }: Props) => {
  const matches = useMediaQuery("(min-width: 800px)");

  return (
    <>
      <div className={styles.flexLg}>
        {/* product details */}
        <div className={styles.productDetails}>
          <h3>Product Details</h3>
          <div style={{ width: "100%" }}>
            <div className={styles.flexDetail}>
              <p>Product</p>
              <span>{values.productDetail?.productName}</span>
            </div>
            <div className={styles.flexDetail}>
              <p>Delivery time</p>
              <span>{values.productDetail.deliveryTime}</span>
            </div>
            <div className={styles.flexDetail}>
              <p>Price</p>
              <span> {`N${values.productDetail.price} / 1tr`}</span>
            </div>
            <div className={styles.flexDetail}>
              <p>Quantity</p>
              <span className={styles.inputGroup}>
                <input
                  type='tel'
                  value={values.productDetail.quantity}
                  onChange={(e) =>
                    onValueChange("productDetail.quantity", e.target.value)
                  }
                />
                <div className={styles.controls}>
                  <button
                    onClick={() =>
                      onValueChange(
                        "productDetail.quantity",
                        (Number(values.productDetail.quantity) + 1).toString()
                      )
                    }>
                    <SvgArrowUp />
                  </button>
                  <button
                    type='button'
                    onClick={() =>
                      onValueChange(
                        "productDetail.quantity",
                        (Number(values.productDetail.quantity) - 1).toString()
                      )
                    }
                    disabled={Number(values.productDetail.quantity) < 2}>
                    <SvgArrowDown />
                  </button>
                </div>
              </span>
            </div>
            <div className={styles.flexDetail}>
              <p>Total</p>
              <span>{`₦${values.productDetail.price} / 1tr`}</span>
            </div>
          </div>
        </div>
        {/* delivery details */}
        <div className={styles.deliveryDetials}>
          <h3>Delivery Details</h3>
          <div className={styles.flexLg}>
            <InputTemp
              label='FIRST NAME'
              value={values.deliveryDetail.firstName}
              onChange={(e) =>
                onValueChange("deliveryDetail.firstName", e.target.value)
              }
              marginRight
            />
            <InputTemp
              label='SURNAME'
              value={values.deliveryDetail.surName}
              onChange={(e) =>
                onValueChange("deliveryDetail.surName", e.target.value)
              }
              marginLeft
            />
          </div>
          <div className={styles.flexLg}>
            <InputTemp
              label='PHONE NUMBER'
              value={values.deliveryDetail.phoneNumber}
              onChange={(e) =>
                onValueChange("deliveryDetail.phoneNumber", e.target.value)
              }
              marginRight
            />
            <InputTemp
              label='EMAIL ADDRESS'
              value={values.deliveryDetail.emailAddress}
              onChange={(e) =>
                onValueChange("deliveryDetail.emailAddress", e.target.value)
              }
              marginLeft
            />
          </div>
          <div className={styles.flexLg}>
            <InputTemp
              label='DELIVERY ADDRESS'
              value={values.deliveryDetail.deliveryAdress}
              onChange={(e) =>
                onValueChange("deliveryDetail.deliveryAdress", e.target.value)
              }
              marginRight
            />
            <SelectTemp
              width={matches ? "150px" : "100%"}
              label='STATE'
              placeholder='Lagos'
              options={statesOptions}
              onValueChange={(e) => {
                onValueChange("state", e.value);
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderDetailsForm;

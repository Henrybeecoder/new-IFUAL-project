import React, { useState, useEffect } from "react";
import styles from "./style.module.css";
import { useNavigate } from "react-router-dom";
import { SvgArrowback, SvgEdit, SvgRating } from "../../../assets/Svgs";
import companyLogo from "../../../assets/image/companyLogo2.png";
import Button from "../../../Components/Button";
import LayoutCustomer from "../../../containers/LayoutCustomer";
import useMediaQuery from "../../../Custom hooks/useMediaQuery";
import Loading from "../../../Components/Loading";
import { customerBaseUrl } from "../../../utils/baseUrl";
import axios from "axios";
import EmptyStates from "../../../containers/EmptyStates";
import { EditBtn } from "../../../../src/Components/PageHeader";
import { getUser } from "../../../../src/Custom hooks/Hooks";

const promoProducts = [
  {
    id: "1",
    company: "Venture Capital",
    price: "N300/ltr",
    discount: "@30% disc",
  },
  {
    id: "2",
    company: "Venture Capital",
    price: "N300/ltr",
    discount: "@30% disc",
  },
  {
    id: "3",
    company: "Venture Capital",
    price: "N300/ltr",
    discount: "@30% disc",
  },
  {
    id: "4",
    company: "Venture Capital",
    price: "N300/ltr",
    discount: "@30% disc",
  },
  {
    id: "5",
    company: "Venture Capital",
    price: "N300/ltr",
    discount: "@30% disc",
  },
];

const Cart = () => {
  const navigate = useNavigate();
  const matches = useMediaQuery("(min-width: 800px)");

  const backHome = () => navigate("/");

  const [loading, setLoading] = useState(false);
  const [cartData, setCartData] = useState<any[]>([]);

  const newUser = getUser();

  useEffect(() => {
    setLoading(true);
    (async () => {
      try {
        const { data } = await axios.get(`${customerBaseUrl}Order/GetAllCart`, {
          headers: { Authorization: `${newUser?.token}` },
        });
        setCartData(data.data);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    })();
  }, [newUser?.token]);

  return (
    <>
      {loading && <Loading />}
      <LayoutCustomer>
        <button className={styles.btnBack} onClick={backHome}>
          <SvgArrowback />
          <h2>Back to Home</h2>
        </button>
        <div className={styles.header}>
          <h2>Shopping Cart</h2>
          <EditBtn />
        </div>
        <div className={styles.container}>
          {cartData.length < 1 ? (
            <div className={styles.cartContainer}>
              <EmptyStates cart />
            </div>
          ) : (
            <>
              {cartData.map((data) => {
                return (
                  <div className={styles.cartContainer}>
                    <div className={styles.productContainer}>
                      <div className={styles.productHeader}>
                        <h3>Product 1</h3>
                        <p>Price (N)</p>
                      </div>
                      <div className='divider' />
                      <div className={styles.flexDetail}>
                        <p>Product:</p>
                        <span className={styles.flexBetween}>
                          <p>{data?.productName}</p>
                          <p>{data?.amount ? data?.amount : `0`}</p>
                        </span>
                      </div>
                      <div className={styles.flexDetail}>
                        <p>Vendor:</p>
                        <span>{data.vendorName}</span>
                      </div>
                      <div className={styles.flexDetail}>
                        <p>Quantity:</p>
                        <span>{`${data.quantity} ltrs`} </span>
                      </div>
                      <div className={styles.flexDetail}>
                        <p>Delivery Address:</p>
                        <span>
                          {data?.deliveryAddress
                            ? `${data?.deliveryAddress}`
                            : `None`}
                        </span>
                      </div>
                      <div className={styles.flexDetail}>
                        <p>Recipient:</p>
                        <span>
                          {" "}
                          {`${data?.recipient} / ${newUser?.phoneNumber}`}
                        </span>
                      </div>
                      <div className='divider' />
                      <div className={styles.total}>
                        <h3>{`Total (1): ${
                          data.totalAmount ? data.totalAmount : 0
                        }`}</h3>
                      </div>
                    </div>
                    <div className={styles.btnCheckout}>
                      <Button
                        text='Proceed to Checkout'
                        width={matches ? "400px" : "100%"}
                      />
                    </div>
                  </div>
                );
              })}
            </>
          )}
          {/* section 2 */}
          <div className={styles.promoProductsContainer}>
            <h3 className={styles.promoHeader}>Promo Products</h3>
            <div className={styles.overflowY}>
              {promoProducts.map((product) => (
                <div key={product.id} className={styles.promoProduct}>
                  <img alt='' src={companyLogo} />
                  <div className={styles.promoProductTextArea}>
                    <h2>{product.company}</h2>
                    <h3>
                      {product.price} <span>{product.discount}</span>
                    </h3>
                    <p>Limited Time Offer</p>
                  </div>
                  <div className={styles.ratingView}>
                    <SvgRating />
                    <Button text='View' width='60px' height='36px' />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </LayoutCustomer>
    </>
  );
};

export default Cart;

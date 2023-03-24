import React, { useState, useEffect } from "react";
import Layout from "../../../containers/LayoutCustomer";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { SvgArrowback, SvgRating, SvgRightIcon } from "../../../assets/Svgs";
import styles from "./style.module.css";
import companyLogo from "../../../assets/image/companyLogo.png";
import OrderDetailsForm from "../../../Components/OrderDetailsForm";
import Button from "../../../Components/Button";
import Loading from "../../../Components/Loading";
import { customerBaseUrl } from "../../../utils/baseUrl";
import axios from "axios";
import { getUser } from "../../../../src/Custom hooks/Hooks";

const Order = () => {
  const user = getUser();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  let params = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${customerBaseUrl}Product/Product`, {
        headers: { Authorization: `${user?.token}` },
      })
      .then((response) => {
        console.log(response, "the products");
        setData(response.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [user?.token]);

  const selectedProduct =
    data.find((product) => product.productId === params.id) || {};

  const checkout = () => {
    navigate({
      pathname: `/checkout/${selectedProduct.productId}`,
      //   search: `checkout=${selectedProduct.id}`,
    });
  };
  return (
    <>
      {loading && <Loading />}
      <Layout>
        <button className={styles.btnBack} onClick={() => navigate(-1)}>
          <SvgArrowback />
          <h2>Back to Home</h2>
        </button>
        <div className={styles.header}>
          <h2>{`${selectedProduct?.category || "No"} Order`}</h2>
        </div>
        <div className={""}>
          <div className={styles.productMetaContainer}>
            <div className={styles.productMeta}>
              <img alt='logo' src={companyLogo} />
              <h3>{selectedProduct?.productName}</h3>
              <div className={styles.flexTight}>
                <p className={styles.margin}>{selectedProduct?.rating}</p>{" "}
                <SvgRating />
              </div>
              <p>{`N${selectedProduct?.unitPrice} / 1tr`}</p>
              <p>(30% discount applied)</p>
              <span>14 reviews</span>
            </div>
            <div className={styles.productMetaMob}>
              <div className={styles.textArea}>
                <h3>{selectedProduct?.productName}</h3>
                <div className={styles.ratingReviewMob}>
                  <h3>
                    5
                    <span>
                      <SvgRating />
                    </span>
                  </h3>
                  <p>14 reviews</p>
                </div>
              </div>
              <button>
                <p>See more</p>
                <SvgRightIcon />
              </button>
            </div>
          </div>
          {/* gridlike */}
          <OrderDetailsForm selectedProduct={selectedProduct} />
          <div className={styles.footer}>
            <Button
              variant='primary'
              text='Proceed to Payment'
              onClick={checkout}
            />
            <Button text='Add to Cart' />
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Order;

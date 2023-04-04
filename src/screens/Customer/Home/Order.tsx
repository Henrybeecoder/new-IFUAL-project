import React, { useState, useEffect, useContext } from "react";
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
import EmptyStates from "../../../../src/containers/EmptyStates";
import { usePPInitialValues } from "../../../../src/screens/Checkout/types";
import { Formik } from "formik";
import { Context } from "../../../../src/utils/context";

const Order = () => {
  const user = getUser();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  let params = useParams();

  const [data, setData] = useState<any>();

  useEffect(() => {
    if (!params.id) return;
    setLoading(true);
    axios
      .get(`${customerBaseUrl}Product/Product/${params.id}`, {
        // headers: { Authorization: `${user?.token}` },
      })
      .then((response) => {
        //  console.log(response);
        setData(response.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [user?.token, params.id]);

  const checkout = () => {
    navigate({
      pathname: `/checkout/${data?.productId}`,
      //   search: `checkout=${selectedProduct.id}`,
    });
  };

  const { product } = useContext(Context);

  const initialValues = usePPInitialValues({
    deliveryTime: data?.deliveryTime || "6 hours",
    price: data?.unitPrice || "2000",
    productId: data?.productId,
    quantity: "1",
    discountPrice: 0,
    interval: 0,
    productName: data?.title || "product Title",
    total: "0",
    vendorId: data?.vendorId,
    intervalOf: 0,
  });

  return (
    <>
      {loading && <Loading />}
      <Layout>
        <button className={styles.btnBack} onClick={() => navigate(-1)}>
          <SvgArrowback />
          <h2>Back to Home</h2>
        </button>

        {!data ? (
          <>
            <EmptyStates cart />
          </>
        ) : (
          <div className={""}>
            <div className={styles.header}>
              <h2>{`${data?.category || "No"} Order`}</h2>
            </div>
            <div className={styles.productMetaContainer}>
              <div className={styles.productMeta}>
                <img alt='logo' src={companyLogo} />
                <h3>{data?.productName}</h3>
                <div className={styles.flexTight}>
                  <p className={styles.margin}>{data?.rating}</p> <SvgRating />
                </div>
                <p>{`N${data?.unitPrice} / 1tr`}</p>
                <p>(30% discount applied)</p>
                <span>14 reviews</span>
              </div>
              <div className={styles.productMetaMob}>
                <div className={styles.textArea}>
                  <h3>{data?.productName}</h3>
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
            <Formik
              initialValues={initialValues}
              enableReinitialize
              onSubmit={(values) => {
                product?.setPaymentPayload(values);
                checkout();
              }}>
              {({ isValid, values, setFieldValue, submitForm }) => (
                <>
                  <OrderDetailsForm
                    values={values}
                    onValueChange={setFieldValue}
                  />
                  <div className={styles.footer}>
                    <Button
                      variant='primary'
                      text='Proceed to Payment'
                      onClick={submitForm}
                      invalid={!isValid}
                    />
                    <Button text='Add to Cart' />
                  </div>
                </>
              )}
            </Formik>
          </div>
        )}
      </Layout>
    </>
  );
};

export default Order;

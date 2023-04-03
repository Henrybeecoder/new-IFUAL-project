import React from "react";
import PageHeader from "../../../Components/PageHeader";
import Layout from "../../../containers/LayoutVendor";
import OrderDetailsForm from "../../../Components/OrderDetailsForm";
import { usePPInitialValues } from "../../../../src/screens/Checkout/types";

const OrderDetails = () => {
  const data = undefined;

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
    <Layout>
      <PageHeader backBtn pageTitle='Product Details'>
        <h3>#Declined</h3>
      </PageHeader>
      <div className=''></div>
      <OrderDetailsForm values={initialValues} />
    </Layout>
  );
};

export default OrderDetails;

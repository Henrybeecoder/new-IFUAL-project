import React from "react";
import PageHeader from "../../../Components/PageHeader";
import Layout from "../../../containers/LayoutVendor";
import OrderDetailsForm from "../../../Components/OrderDetailsForm";

const OrderDetails = () => {
  return (
    <Layout>
      <PageHeader backBtn pageTitle='Product Details'>
        <h3>#Declined</h3>
      </PageHeader>
      <div className=''></div>
      <OrderDetailsForm selectedProduct={{}} />
    </Layout>
  );
};

export default OrderDetails;

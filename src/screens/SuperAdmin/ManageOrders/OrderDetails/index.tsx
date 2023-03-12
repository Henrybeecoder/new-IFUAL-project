import Layout from "../../../../containers/LayoutSuperAdmin";
import SharedOrderDetails from "../../../SharedAdmin/ManageOrders/OrderDetails";

const OrderDetails = () => {
  return (
    <Layout>
      <SharedOrderDetails baseUrl='super-admin' />
    </Layout>
  );
};

export default OrderDetails;

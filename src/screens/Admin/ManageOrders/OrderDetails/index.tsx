import Layout from "../../../../containers/LayoutSuperAdmin";
import SharedOrderDetails from "../../../SharedAdmin/ManageOrders/OrderDetails";

const ManageOrders = () => {
  return (
    <Layout>
      <SharedOrderDetails baseUrl='admin' />
    </Layout>
  );
};

export default ManageOrders;

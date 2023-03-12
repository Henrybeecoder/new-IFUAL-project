import Layout from "../../../containers/LayoutSuperAdmin";
import SharedManageUsers from "../../SharedAdmin/ManageUsers";

const ManageUsers = () => {
  return (
    <Layout>
      <SharedManageUsers baseUrl='super-admin' />
    </Layout>
  );
};

export default ManageUsers;

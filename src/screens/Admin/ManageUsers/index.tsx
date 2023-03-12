import Layout from "../../../containers/LayoutAdmin";
import SharedManageUsers from "../../SharedAdmin/ManageUsers";

const ManageUsers = () => {
  return (
    <Layout>
      <SharedManageUsers baseUrl='admin' />
    </Layout>
  );
};

export default ManageUsers;

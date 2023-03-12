import Layout from "../../../containers/LayoutSuperAdmin";
import SharedComplaintLog from "../../SharedAdmin/ComplaintsLog";

const ComplaintLog = () => {
  return (
    <Layout>
      <SharedComplaintLog baseUrl='super-admin' />
    </Layout>
  );
};

export default ComplaintLog;

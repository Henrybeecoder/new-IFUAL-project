import Layout from "../../../containers/LayoutAdmin";
import SharedComplaintLog from "../../SharedAdmin/ComplaintsLog";

const ComplaintLog = () => {
  return (
    <Layout>
      <SharedComplaintLog baseUrl='admin' />
    </Layout>
  );
};

export default ComplaintLog;

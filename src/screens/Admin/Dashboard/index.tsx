import Layout from "../../../containers/LayoutAdmin";
import { useState } from "react";
import DashboardShared from "../../../screens/SharedAdmin/Dashboard";

const Dashboard = () => {
  const [page, setPage] = useState("home");

  return (
    <Layout
      backBtn={!!(page === "overview-all")}
      onClickBackBtn={() => setPage("home")}>
      <DashboardShared />
    </Layout>
  );
};

export default Dashboard;

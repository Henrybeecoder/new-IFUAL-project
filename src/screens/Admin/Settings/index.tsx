import Layout from "../../../containers/LayoutAdmin";
import { useState } from "react";
import SharedSettings from "../../SharedAdmin/Settings";

const Settings = () => {
  const [edit, setEdit] = useState(false);

  return (
    <Layout>
      <SharedSettings />
    </Layout>
  );
};

export default Settings;

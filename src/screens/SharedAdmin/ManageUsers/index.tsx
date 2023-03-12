import styles from "./style.module.css";
import { customer_data, vendor_data, admin_data } from "./data";
import { RenderPageProps } from "../../../types/shared";
import {
  Link,
  NavLink,
  Route,
  Routes,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import OptionsModal from "../../../Components/OptionsModal";
import Button from "../../../Components/Button";
import Header from "../../../Components/PageHeader/Admin";
import { FilterModal } from "../../../Components/PageHeader";
import useMediaQuery from "../../../Custom hooks/useMediaQuery";
import { ReactComponent as ArrowRight } from "../../../assets/svg/dark-arrow-right.svg";
import { limitText } from "../../../Custom hooks/helpers";
import VendorInfo from "./VendorInfo";
import CustomerInfo from "./CustomerInfo";
import AdminInfo from "../../../screens/SuperAdmin/ManageUsers/AdminInfo";

interface ManageUsersProps {
  baseUrl: "admin" | "super-admin";
}

const ManageUsers = ({ baseUrl }: ManageUsersProps) => {
  const navigate = useNavigate();

  return (
    <>
      {/* <Header pageTitle='MANAGE USERS' options={[]}></Header>
        <>
          {page === "vendor" ? (
            // <Button text='Add Vendor' width='100px' height='37px' />
            <Link
              to={{ pathname: "add-vendor" }}
              style={{
                border: "1px solid gainsboro",
                padding: "10px",
                borderRadius: "8px",
                fontSize: "16px",
                fontWeight: "500",
                textDecoration: "none",
                color: "#344437",
              }}>
              Add Vendor
            </Link>
          ) : page === "admin" ? (
            <Button
              text='Add Admin'
              width='100px'
              height='37px'
              onClick={() => navigate(`/${baseUrl}/manage-users/add-admin`)}
            />
          ) : null}
        </>
      </FilterHeader> */}

      <Routes>
        <Route index element={<CustomerPage baseUrl={baseUrl} />} />
        <Route path='customer'>
          <Route index element={<CustomerPage baseUrl={baseUrl} />} />
          <Route path=':id' element={<CustomerInfo />} />
        </Route>
        <Route path='vendor'>
          <Route index element={<VendorPage baseUrl={baseUrl} />} />
          <Route path=':id' element={<VendorInfo />} />
        </Route>
        {baseUrl === "super-admin" && (
          <Route path='admin'>
            <Route index element={<AdminPage />} />
            <Route path=':id' element={<AdminInfo />} />
          </Route>
        )}
      </Routes>
    </>
  );
};

const LinksComponents = ({
  baseUrl,
  active,
}: {
  baseUrl: string;
  active: "customer" | "vendor" | "admin";
}) => {
  return (
    <div className={styles.flexMenu}>
      <Link
        to={`/${baseUrl}/manage-users/customer`}
        replace={true}
        style={{
          textDecoration: active === "customer" ? "underline" : "none",
          color: active === "customer" ? "#36b44a" : "black",
        }}>
        CUSTOMER
      </Link>
      <Link
        to={`/${baseUrl}/manage-users/vendor`}
        replace={true}
        style={{
          textDecoration: active === "vendor" ? "underline" : "none",
          color: active === "vendor" ? "#36b44a" : "black",
        }}>
        VENDOR
      </Link>
      {baseUrl === "super-admin" && (
        <Link
          to='/super-admin/manage-users/admin'
          replace={true}
          style={{
            textDecoration: active === "admin" ? "underline" : "none",
            color: active === "admin" ? "#36b44a" : "black",
          }}>
          ADMIN
        </Link>
      )}
    </div>
  );
};

const CustomerPage = ({ baseUrl }: { baseUrl: string }) => {
  const navigate = useNavigate();
  const matches = useMediaQuery("(min-width: 800px)");
  return (
    <>
      <Header pageTitle='MANAGE USERS'>
        <FilterModal options={[]} />
      </Header>
      <LinksComponents active='customer' baseUrl={baseUrl} />
      <div className={"table-wrapper"}>
        {matches ? (
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Location</th>
                <th>Email</th>
                <th>Last ACtivity</th>
              </tr>
            </thead>
            <tbody>
              {customer_data?.map((row) => {
                return (
                  <tr key={row.id}>
                    <td>{row.name}</td>
                    <td>{row.location}</td>
                    <td>{row.email}</td>
                    <td>{row.lastAct}</td>
                    <td>
                      <OptionsModal>
                        <button onClick={() => navigate(`${row.id}`)}>
                          View
                        </button>
                        <button>Edit</button>
                        <button>Suspend</button>
                      </OptionsModal>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Locat...</th>
                <th>Last Act</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {customer_data?.map((row) => {
                return (
                  <tr key={row.id}>
                    <td>{row.name}</td>
                    <td>{row.location}</td>
                    <td>{row.lastAct}</td>
                    <td>
                      <button
                        style={{ marginLeft: "-7px" }}
                        onClick={() => navigate(`${row.id}`)}>
                        <ArrowRight />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};

const VendorPage = ({ baseUrl }: { baseUrl: string }) => {
  const navigate = useNavigate();
  const matches = useMediaQuery("(min-width: 800px)");
  return (
    <>
      <Header pageTitle='MANAGE USERS'>
        <FilterModal options={[]} />
        <Button
          text='Add Vendor'
          width='130px'
          onClick={() => navigate("new")}
        />
      </Header>
      <LinksComponents active='vendor' baseUrl={baseUrl} />
      <div className={"table-wrapper"}>
        {matches ? (
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Location</th>
                <th>Email</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {vendor_data?.map((row) => {
                return (
                  <tr key={row.id}>
                    <td>{row.name}</td>
                    <td>{row.location}</td>
                    <td>{row.email}</td>
                    <td>{row.status}</td>
                    <td>
                      <OptionsModal>
                        <button onClick={() => navigate(`${row.id}`)}>
                          View
                        </button>
                        <button>Edit</button>
                        <button>Suspend</button>
                      </OptionsModal>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Locat..</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {vendor_data?.map((row) => {
                return (
                  <tr key={row.id}>
                    <td>{row.name}</td>
                    <td>{row.location}</td>
                    <td>{row.status}</td>
                    <td>
                      <button
                        style={{ marginLeft: "-7px" }}
                        onClick={() => navigate(`${row.id}`)}>
                        <ArrowRight />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};

const AdminPage = () => {
  const matches = useMediaQuery("(min-width: 800px)");
  const navigate = useNavigate();
  return (
    <>
      <Header pageTitle='MANAGE USERS'>
        <FilterModal options={[]} />
        <Button
          text='Add Admin'
          width='130px'
          onClick={() => navigate("new")}
        />
      </Header>
      <LinksComponents active='admin' baseUrl={"super-admin"} />
      <div className={"table-wrapper"}>
        {matches ? (
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Category</th>
                <th>Email</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {admin_data?.map((row) => {
                return (
                  <tr key={row.id}>
                    <td>{row.name}</td>
                    <td>{row.category}</td>
                    <td>{row.email}</td>
                    <td>
                      <Button text='deactivate' height='25px' width='80px' />
                    </td>
                    <td>
                      <OptionsModal>
                        <button onClick={() => navigate(`${row.id}`)}>
                          View
                        </button>
                      </OptionsModal>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Cat...</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {admin_data?.map((row) => {
                return (
                  <tr key={row.id}>
                    <td>{limitText(row.name, 7)}</td>
                    <td>{limitText(row.category, 5)}</td>
                    <td>
                      <Button text='Deacti...' height='25px' width='80px' />
                    </td>
                    <td>
                      <button
                        style={{ marginLeft: "-7px" }}
                        onClick={() => navigate(`${row.id}`)}>
                        <ArrowRight />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};

export default ManageUsers;

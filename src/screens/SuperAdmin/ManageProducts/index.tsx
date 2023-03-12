import Layout from "../../../containers/LayoutSuperAdmin";
import styles from "./style.module.css";
import Button from "../../../Components/Button";
import OptionsModal from "../../../Components/OptionsModal";
import { useNavigate } from "react-router-dom";
import Header from "../../../Components/PageHeader/Admin";
import useMediaQuery from "../../../Custom hooks/useMediaQuery";
import { ReactComponent as ArrowRight } from "../../../assets/svg/dark-arrow-right.svg";
import { FilterModal } from "../../../Components/PageHeader";

const data = [
  {
    id: "1",
    category: "Diesel",
    vendors: 14,
    locations: "20",
    price: "N800/ltr",
  },
  { id: "2", category: "Gas", vendors: 20, locations: "16", price: "N750/ltr" },
  {
    id: "3",
    category: "Kerosene",
    vendors: 100,
    locations: "37",
    price: "N120/ltr",
  },
  {
    id: "4",
    category: "Petrol",
    vendors: 20,
    locations: "37",
    price: "N300/ltr",
  },
];

const ManageProducts = () => {
  const matches = useMediaQuery("(min-width: 800px)");

  const navigate = useNavigate();

  return (
    <Layout>
      <>
        <Header pageTitle='MANAGE PRODUCTS'>
          <FilterModal
            options={[
              { value: "diesel" },
              { value: "kerosene" },
              { value: "petrol" },
              { value: "gas" },
            ]}
            selected='diesel'
          />
          <Button
            text='Add New'
            height='40px'
            width='120px'
            className={""}
            onClick={() => navigate("new")}
          />
        </Header>

        <div className={"table-wrapper"}>
          {matches ? (
            <table>
              <thead>
                <tr>
                  <th>Product Category</th>
                  <th>Vendors</th>
                  <th>Locations</th>
                  <th>Price Cap</th>
                </tr>
              </thead>
              <tbody>
                {data?.map((row) => {
                  return (
                    <tr key={row.id}>
                      <td>{row.category}</td>
                      <td>{row.vendors}</td>
                      <td>{row.locations}</td>
                      <td>{row.price}</td>
                      <td>
                        <OptionsModal>
                          <button onClick={() => navigate(`${row.id}`)}>
                            View
                          </button>
                          <button
                            onClick={() =>
                              navigate({
                                pathname: `${row.id}`,
                                search: "mode=edit",
                              })
                            }>
                            Edit
                          </button>
                          <button>Delete</button>
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
                  <th>Product</th>
                  <th>Locat...</th>
                  <th>Price Cap</th>
                </tr>
              </thead>
              <tbody>
                {data?.map((row) => {
                  return (
                    <tr key={row.id}>
                      <td>{row.category}</td>
                      <td>{row.locations}</td>
                      <td>{row.price}</td>
                      <td>
                        <button onClick={() => navigate(`${row.id}`)}>
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
    </Layout>
  );
};

export default ManageProducts;

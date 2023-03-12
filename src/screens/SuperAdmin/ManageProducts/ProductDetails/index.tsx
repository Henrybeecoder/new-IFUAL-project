import Button from "../../../../Components/Button";
import { InputTemp, SelectTemp } from "../../../../Components/InputTemp";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import Layout from "../../../../containers/LayoutSuperAdmin";
import styles from "./style.module.css";
import { useState } from "react";
import Modal from "../../../../Components/Modals";
import Header, { EditBtn } from "../../../../Components/PageHeader/Admin";
import { PaginationOf } from "../../../../Components/PageHeader";

const NewProduct = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [searchparams] = useSearchParams();
  const mode = searchparams.get("mode");
  const id = params?.id;

  const edit = !!(mode === "edit");

  const [activeModal, setActiveModal] = useState<string | null>(null);

  return (
    <>
      <Layout
        backBtn
        onClickBackBtn={() =>
          navigate("/super-admin/manage-products", { replace: false })
        }>
        <Modal
          // width={"650px"}
          openModal={!!(activeModal === "delete")}
          closeModal={() => setActiveModal(null)}>
          <h3>Delete Product Category</h3>
          <p>
            You are about to delete the product category - Diesel. Please note
            that this action is permanent and vendors will no longer have access
            to this product category.
          </p>
          <div className={"flex-btwn"}>
            <Button
              text='Back'
              width='55%'
              onClick={() => setActiveModal(null)}
            />
            <Button text='Delete Category' width='42%' variant='danger' />
          </div>
        </Modal>
        <Header
          backBtn
          pageTitle={
            id !== "new"
              ? `${edit ? "EDIT PRODUCT DETAILS" : "PRODUCT DETAILS"}`
              : "ADD NEW "
          }
          parentPageTitle='MANAGE PRODUCTS'>
          <PaginationOf current={[1, 8]} total={8} />
          <EditBtn />
        </Header>
        <div className={styles.flex}>
          <MainInputComponent id={id} />
          <>
            {id !== "new" ? (
              <div className={styles.actionSection}>
                <Button
                  text='Delete'
                  variant='danger'
                  width='130px'
                  height='45px'
                  invalid={edit}
                  onClick={() => setActiveModal("delete")}
                />
              </div>
            ) : null}
          </>
        </div>
      </Layout>
    </>
  );
};

const MainInputComponent = ({ id }: { id?: string }) => {
  const navigate = useNavigate();
  return (
    <div className={styles.mainSection}>
      <InputTemp label='CATEGORY NAME' placeholder='Enter Name' />
      <SelectTemp
        label='LOCATIONS'
        placeholder='Select all locations applicable'
      />
      <div className={styles.inputWT}>
        <InputTemp
          label='PRICE CAP IN LITRE'
          placeholder='Enter numbers only e.g 200'
        />
        <p>Please note that price cap set will affect all selected locations</p>
      </div>
      <InputTemp
        label='IFUEL COMMISSION PER LITRE'
        placeholder='Enter charge per litre e.g 20'
      />
      {id === "new" ? (
        <div className={"flex-btwn"}>
          <Button
            text='Back'
            width='40%'
            onClick={() => navigate("/super-admin/manage-products")}
          />
          <Button text='Create Category' width='57%' variant='dark' invalid />
        </div>
      ) : null}
    </div>
  );
};

export default NewProduct;

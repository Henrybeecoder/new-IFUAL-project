import Layout from "../../../containers/LayoutVendor";
import { InputTemp, SelectTemp } from "../../../Components/InputTemp";
import PageHeader, { DeleteBtn, EditBtn } from "../../../Components/PageHeader";
import { useState } from "react";
import styles from "./style.module.css";
import { rows } from "./index";
import { useNavigate, useParams } from "react-router-dom";
import { statesOptions } from "../../../Custom hooks/helpers";
import Button from "../../../Components/Button";
import { Form, Formik } from "formik";
import { useQuery } from "@tanstack/react-query";
import { Product } from "../../../types/product";
import Modal from "../../../Components/Modals";

const ProductInfo = () => {
  const params = useParams();
  const navigate = useNavigate();
  const id = params?.id;

  const [deleteCfmModal, setDCfM] = useState(false);

  const initialData = {
    description: "",
    category: "",
    status: "",
    supplyTime: "",
    price: "",
    locations: [],
    discount: "",
  };

  const { data } = useQuery(["product", id], {
    enabled: id !== "new",
    initialData,
  });

  const saveForm = () => {};

  const statusOptions = [
    { value: "In stock", label: "In stock" },
    { value: "Out of stock", label: "Out of stock" },
  ];

  const categoryOptions = [
    { value: "diesel", label: "Diesel" },
    { value: "petrol", label: "Petrol" },
    { value: "AGO-diesel", label: "AGO Diesel" },
  ];

  // const initialState =
  //   id === "new"
  //     ? data
  //         .map((row) => ({
  //           id: row.id,
  //           description: row.name,
  //           category: row.calories,
  //           status: row.fat,
  //           supplyTime: row.carbs,
  //           price: row.protein,
  //           locations: [],
  //           discount: "",
  //         }))
  //         .find((row) => row.id === id)
  //     : {};

  return (
    <Layout>
      <Modal openModal={deleteCfmModal} closeModal={() => setDCfM(false)}>
        <h3>Alert</h3>
        <p>
          You are about to delete the product “AGO Diesel” Please note the
          product will be permanently deleted.
        </p>
        <p>Kindly click to confirm</p>
        <div className='flex-btwn'>
          <Button text='Back' width='55%' />
          <Button text='Delete' variant='danger' width='40%' />
        </div>
      </Modal>
      {id !== "new" ? (
        <PageHeader
          backBtn
          onClickBackBtn={() => navigate(-1)}
          pageTitle='Product Details'>
          <div className={styles.EditDelete}>
            <EditBtn />
            <DeleteBtn onClick={() => setDCfM(true)} />
          </div>
        </PageHeader>
      ) : (
        <PageHeader
          backBtn
          onClickBackBtn={() => navigate(-1)}
          pageTitle='Add Product'
        />
      )}
      <Formik initialValues={data} enableReinitialize onSubmit={saveForm}>
        {({ dirty, errors, getFieldProps }) => {
          return (
            <Form>
              <div className={styles.flexForm}>
                <InputTemp
                  inputType='text'
                  label='PRODUCT DESCRIPTION'
                  placeholder='Enter Description'
                  marginRight
                  {...getFieldProps("description")}
                />
                <SelectTemp
                  inputType='text'
                  label='CATEGORY'
                  placeholder='Select Category'
                  marginLeft
                  options={categoryOptions}
                  {...getFieldProps("category")}
                />
              </div>
              <div className={styles.flexForm}>
                <InputTemp
                  inputType='text'
                  label='SUPPLY TIME (IN HOURS)'
                  placeholder='E.g 12 Hours'
                  marginRight
                  {...getFieldProps("supplyTime")}
                />
                <InputTemp
                  inputType='text'
                  label='PRICE/LITRE IN NAIRA'
                  placeholder='300.00'
                  marginLeft
                  {...getFieldProps("price")}
                />
              </div>
              <div className={styles.flexForm}>
                <SelectTemp
                  inputType='text'
                  label='STATUS'
                  placeholder='In stock'
                  // value='In stock'
                  marginRight
                  options={statusOptions}
                  {...getFieldProps("status")}
                />
                <InputTemp
                  inputType='text'
                  label='DISCOUNT (IN PERCENTAGE)'
                  placeholder='E.g 50%'
                  marginLeft
                  {...getFieldProps("discount")}
                />
              </div>
              <SelectTemp
                inputType='text'
                label='LOCATION'
                placeholder='Select all that applies'
                isMulti
                options={statesOptions}
              />
              <div className={styles.flexFooter}>
                <Button text='Back' width='42%' type='button' />
                <Button
                  text='Save'
                  variant='primary'
                  invalid
                  width='53%'
                  type='submit'
                />
              </div>
            </Form>
          );
        }}
      </Formik>
    </Layout>
  );
};

export default ProductInfo;

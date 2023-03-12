import React from "react";
import styles from "./style.module.css";
import Button from "../../../Components/Button";
import {
  InputTemp,
  SelectTemp,
  TextareaTemp,
} from "../../../Components/InputTemp";
import PageHeader from "../../../Components/PageHeader";
import Layout from "../../../containers/LayoutVendor";
import { useMutation } from "@tanstack/react-query";
import axios from "../../../lib/axios";
import { Form, Formik } from "formik";
import { vendorId } from "../../../lib/constant";

interface Input {
  vendorId: string;
  referencNumber: string;
  title: string;
  category: string;
  description: string;
}

const New = () => {
  const { mutate } = useMutation<any, any, Input>({
    mutationFn: async (data) => axios.post("/Reports/SendReport", data),
  });
  return (
    <Layout>
      <PageHeader pageTitle="Send a Report" backBtn />
      <Formik
        initialValues={{
          title: "",
          category: "",
          description: "",
          referencNumber: "",
        }}
        onSubmit={(values) => mutate({ vendorId: vendorId, ...values })}
      >
        {({ getFieldProps, dirty }) => (
          <Form>
            <div className="input-flex-btwn">
              <InputTemp
                label="TITLE"
                placeholder="Enter Title"
                marginRight
                {...getFieldProps("title")}
              />
              <SelectTemp
                label="CATEGORY"
                placeholder="Select Category"
                // marginLeft {...getFieldProps("")}
              />
            </div>
            <div className="w-50-lg">
              <InputTemp
                label="REFERENCE NUMBER"
                placeholder="RE0000001"
                marginRight
                {...getFieldProps("referencNumber")}
              />
            </div>
            <TextareaTemp
              label="DESCRIPTION"
              placeholder="Body of the report"
              rows={6}
              {...getFieldProps("description")}
            />
            <div className={styles.btnsNewR}>
              <Button text="Back" width="40%" type="button" />
              <Button
                text="Send"
                variant="primary"
                width="55%"
                type="submit"
                invalid={!dirty}
              />
            </div>
          </Form>
        )}
      </Formik>
    </Layout>
  );
};

export default New;

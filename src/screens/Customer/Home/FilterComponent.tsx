import { FilterModal } from "../../../../src/Components/PageHeader";
import { priceRangeData, productTypeData, supplyTimeData } from "./data";
import styles from "./style.module.css";
import { SelectTemp } from "../../../Components/InputTemp";
import { useState } from "react";
import Button from "../../../../src/Components/Button";
import { ProductFilterValues, ServerData } from "../../../../src/t/shared";

interface Props {
  states: ServerData[] | undefined;
  lgas: ServerData[] | undefined;
  applyFilter: (values: ProductFilterValues) => void;
  fetchLga: (e: string) => void;
}

const FilterComponent = ({ states, lgas, applyFilter, fetchLga }: Props) => {
  const [values, setValues] = useState<ProductFilterValues>({});

  const [open, setOpen] = useState<boolean | undefined>();

  return (
    <FilterModal table open={open} setOpen={setOpen}>
      <>
        <div className={styles.singleFilter}>
          <p>State:</p>
          <SelectTemp
            mode='dark'
            options={states?.map((state) => ({
              label: state.text,
              value: state.value,
            }))}
            value={values?.state}
            onValueChange={(e: any) => {
              setValues((state) => ({ ...state, state: e }));
              fetchLga(e?.value);
            }}
            className={styles.singleFilterSelect}
          />
        </div>
        <div className={styles.singleFilter}>
          <p>LGA:</p>
          <SelectTemp
            mode='dark'
            options={lgas?.map((state) => ({
              label: state.text,
              value: state.value,
            }))}
            value={values.lga}
            onValueChange={(e: any) =>
              setValues((state) => ({ ...state, lga: e }))
            }
            className={styles.singleFilterSelect}
          />
        </div>
        <div className={styles.singleProductFilter}>
          <p>Product Type:</p>
          <SelectTemp
            mode='dark'
            options={productTypeData.map((state) => ({
              label: state.name,
              value: state.value,
            }))}
            value={values?.productType}
            onValueChange={(e: any) =>
              setValues((state) => ({ ...state, productType: e }))
            }
            className={styles.singleProductFilterSelect}
          />
        </div>
        <div className={styles.singleProductFilter}>
          <p>Price range:</p>
          <SelectTemp
            mode='dark'
            options={priceRangeData?.map((state) => ({
              label: state.name,
              value: state.value,
            }))}
            value={values?.priceRange}
            onValueChange={(e) =>
              setValues((state) => ({ ...state, priceRange: e }))
            }
            className={styles.singleProductFilterSelect}
          />
        </div>
        <div className={styles.singleProductFilter}>
          <p>Supply Time:</p>
          <SelectTemp
            mode='dark'
            options={supplyTimeData?.map((state) => ({
              label: state.name,
              value: state.value,
            }))}
            value={values?.supplyTime}
            onValueChange={(e) =>
              setValues((state) => ({ ...state, supplyTime: e }))
            }
            className={styles.singleProductFilterSelect}
          />
        </div>
        <div className='divider' style={{ width: "100%", margin: "15px 0" }} />
        <div className={"flex-btwn"}>
          <Button
            variant='outline'
            text='Cancel'
            width='40%'
            onClick={() => setOpen(false)}
          />
          <Button
            variant='primary'
            text='Search'
            width='55%'
            onClick={() => {
              applyFilter(values);
              setOpen(false);
            }}
          />
        </div>
      </>
    </FilterModal>
  );
};

export default FilterComponent;

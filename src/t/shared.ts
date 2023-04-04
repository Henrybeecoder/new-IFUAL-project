import { ReactNode } from "react";

export type RenderPageProps = {
  [key: string]: ReactNode;
};

export interface SharedAdminComponentProps {
  baseUrl: "admin" | "super-admin";
}

export interface User {
  firstName: string;
  lastName: string;
  name: string;
  email: string;
  profileImage: string;
  homeAddress: string;
  companyAddress: string | null;
  phoneNumber: string;
  state: string;
  lga: string;
  bankAccountNumber: string;
  token: string;
}

export type State = { value: string; text: string };

export interface ProductFilterValues {
  productType?: { value?: string; label?: string };
  state?: { value?: string; label?: string };
  lga?: { value?: string; label?: string };
  priceRange?: { value?: string; label?: string };
  supplyTime?: { value?: string; label?: string };
}

export type ServerData = { value: string; text: string };

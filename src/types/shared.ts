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
}

export type State = { value: string; text: string };

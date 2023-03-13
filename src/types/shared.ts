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
}

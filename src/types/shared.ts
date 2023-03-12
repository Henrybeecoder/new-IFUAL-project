import { ReactNode } from "react";

export type RenderPageProps = {
  [key: string]: ReactNode;
};

export interface SharedAdminComponentProps {
  baseUrl: "admin" | "super-admin";
}

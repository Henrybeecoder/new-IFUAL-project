import { CSSProperties } from "react";
import { User } from "src/t/shared";
import { states } from "../utils/state";

export const limitText = (text: string, limit: number) =>
  text?.length > limit ? text.slice(0, limit) + "..." : text;

export const statesOptions = states.map((state) => ({
  value: state.name.toLowerCase(),
  label: state.name,
}));

export const dateLocale = (date: Date | string) => {
  const conv = new Date(date);
  return conv.toLocaleDateString("en", {
    day: "2-digit",
    month: "numeric",
    year: "numeric",
  });
};

export const dateTimeLocale = (date: Date | string) => {
  const conv = new Date(date);
  return conv.toLocaleString("en", {
    month: "short",
    day: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const localeDate = (value: string | number | Date) => {
  const date = new Date(value);
  return date.toLocaleDateString();
};

export const getInitials = (user?: Partial<User>) => {
  if (user?.firstName && user.lastName)
    return `${
      user.firstName.split("").find((char, index) => index === 0) || ""
    } ${user.lastName.split("").find((char, index) => index === 0) || ""}`;
  else if (user?.name) {
    return user.name
      .split(" ")
      .map((name) => name.charAt(0).toUpperCase())
      .join(" ");
  }
};

export type StatusCode = 0 | 1 | 2 | 3 | 4 | 5 | number;

export const codeToStatus: (code: StatusCode) => {
  text: string;
  style: CSSProperties;
} = (code) =>
  code === 0 || code === 4
    ? {
        text: "In Progress",
        style: { backgroundColor: "#E2E5E3", color: "#344437" },
      }
    : code === 2
    ? {
        text: "Completed",
        style: { backgroundColor: "#F3FFF3", color: "#36B44A" },
      }
    : code === 5
    ? {
        text: "Cancelled",
        style: { backgroundColor: "#FCDEE4", color: "#CD2B65" },
      }
    : {
        text: "In Progress",
        style: { backgroundColor: "#E2E5E3", color: "#344437" },
      };

export const getDateInMs = (date: Date | string) => new Date(date).getTime();

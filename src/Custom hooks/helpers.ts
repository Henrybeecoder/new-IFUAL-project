import { User } from "src/types/shared";
import { states } from "../utils/state";

export const limitText = (text: string, limit: number) =>
  text?.length > limit ? text.slice(0, limit) + "..." : text;

export const statesOptions = states.map((state) => ({
  value: state.name.toLowerCase(),
  label: state.name,
}));

export const dateLocale = (date: Date) => {
  const conv = new Date(date);
  return conv.toLocaleDateString("en", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });
};

export const dateTimeLocale = (date: Date) => {
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

export const getInitials = (user: User) =>
  `${user.firstName.split("").find((char, index) => index === 0) || ""} ${
    user.lastName.split("").find((char, index) => index === 0) || ""
  }`;

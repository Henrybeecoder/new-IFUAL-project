import { object, string, ref, boolean } from "yup";

export const authSchema = {
  login: object().shape({
    email: string().email("enter email").required("enter email"),
    password: string().min(6, "password too short").max(40, "oop").required(),
  }),
  register: {
    acceptTAC: boolean().oneOf(
      [true],
      "To continue you must accept the terms and conditions"
    ),
    companyName: string().min(2, "too short").max(30, "").required(),
    phoneNo: string()
      .min(9, "too short")
      .max(14, "enter a valid phone number")
      .required(),
    email: string().email("enter email").required("enter email"),
    companyAddress: string().min(5, "too short").max(50, "").required(),
    state: object().shape({
      value: string()
        .min(2, "select a valid state")
        .max(30, "select a valid state")
        .required("select a state"),
      label: string(),
    }),
    password: string()
      .min(6, "too short")
      .max(30, "")
      .required("enter a password"),
    confirmPassword: string().oneOf(
      [ref("password"), null],
      "Passwords don't match"
    ),
  },
};

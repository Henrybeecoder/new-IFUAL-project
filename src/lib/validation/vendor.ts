import { object, string, ref, boolean, number, array } from "yup";
const phoneRegExp =
  /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/;
export const authSchema = {
  login: object().shape({
    emailAddress: string()
      .email("Enter a Valid Email Address")
      .required("Email is Required"),
    password: string().min(6, "Password too short").max(40, "oops").required(),
  }),
  register: object().shape({
    acceptTAC: boolean().oneOf(
      [true],
      "To continue you must accept the terms and conditions"
    ),
    CompanyName: string()
      .min(2, "too short")
      .max(30, "")
      .required("Company Name is Required"),
    PhoneNumber: string()
      .matches(phoneRegExp, "Phone number is not valid")
      .min(9, "Phone number is too short")
      .max(14, "enter a valid phone number")
      .required(),
    EmailAddress: string().email("enter email").required("Email is Required"),
    CompanyAddress: string()
      .min(5, "Address is too short")
      .max(50, "")
      .required(),
    StateId: object()
      .shape({
        value: string()
          // .min(2, "select a valid state")
          // .max(30, "select a valid state")
          .required("select a state"),
        label: string().required("select a state"),
      })
      .nullable()
      .required("This field is required."),
    LgaId: string(),
    Password: string()
      .min(6, "Password is too short")
      .max(30, "")
      .required("Enter a password"),
    ConfirmPassword: string()
      .oneOf([ref("Password"), null], "Passwords don't match")
      .required("Confirm Password is required"),
  }),
  kyc: object().shape({
    // uploadImage: string().required("Image not Uploaded"),
    representativeName1: string().required("Representative 1 Name is required"),
    representativeName2: string().required("Representative 2 Name is required"),
    dateofRegistration: string().required("Date of Registration is required"),
    cacRegistrationNumber: string().required(
      "CAC Registration Number is required"
    ),
    operationLocation: array().min(1, "At least one option is required").required(),
    // .of(
    //   object().shape({
    //     key: string().required("select a local government"),
    //     value: string().required("select a local government"),
    //     label: string().required("select a local government"),
    //   })
    // )
    // .nullable()
    // .required("This field is required."),
    accountNumber: string().required("Account Number is required"),
    accountName: string().required("Account Name is required"),
    bvn: string().required("BVN is required"),
    // acctPhoneNumber: string().required("Phone Number is required"),
  }),
};

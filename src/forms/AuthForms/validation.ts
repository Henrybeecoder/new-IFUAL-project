import * as Yup from "yup";

export const CustomerRVS = Yup.object().shape({
  //   firstName: Yup.string()
  //     .min(2, "enter a valid name")
  //     .max(30, "")
  //     .required("firstName required"),
  //   lastName: Yup.string()
  //     .min(2, "enter a valid name")
  //     .max(30, "")
  //     .required("lastName required"),
  //   phoneNumber: Yup.string()
  //     .min(2, "enter a valid name")
  //     .max(15, "")
  //     .required("phoneNumber required"),
  //   email: Yup.string().email("enter your email").required("Email required"),
  //   houseAddress: Yup.string()
  //     .min(2, "enter a valid name")
  //     .max(50, "")
  //     .required("phoneNumber required"),
  //   //   accountNumber: Yup.string()
  //   //     .min(2, "enter a valid name")
  //   //     .max(40, "")
  //   //     .required("phoneNumber required"),
  //   stateValue: Yup.string().optional(),
  //   password: Yup.string()
  //     .min(6, "not strong enough")
  //     .max(30, "")
  //     .required("enter password"),
  //   confirmPassword: Yup.string().oneOf(
  //     [Yup.ref("password"), null],
  //     "Passwords don't match"
  //   ),
});

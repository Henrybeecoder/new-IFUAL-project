import { Reducer } from "react";

export const initialState = {
  values: { accountNo: "", currentPassword: "", otp: "", serverOtp: "" },
  modals: {
    password: false,
    success: false,
  },
  errors: {
    currentPassword: false,
    otp: false,
  },
  visibility: {
    password: false,
  },
  filled: {
    currentPassword: false,
  },
};

type Actions =
  | {
      type: "accountNo" | "currentPassword" | "otp" | "serverOtp";
      payload: string;
    }
  | {
      type:
        | "passwordModal"
        | "successModal"
        | "currentPasswordError"
        | "filledCurrentPassword"
        | "otpError";
      payload: boolean;
    }
  | { type: "passwordVisible" };

export const reducer: Reducer<typeof initialState, Actions> = (
  state,
  action
) => {
  switch (action.type) {
    case "accountNo":
      return {
        ...state,
        values: { ...state.values, accountNo: action.payload },
      };
    case "currentPassword":
      return {
        ...state,
        values: { ...state.values, currentPassword: action.payload },
      };
    case "otp":
      return {
        ...state,
        values: { ...state.values, otp: action.payload },
      };
    case "serverOtp":
      return {
        ...state,
        values: { ...state.values, serverOtp: action.payload },
      };
    case "passwordModal":
      return {
        ...state,
        modals: { ...state.modals, password: action.payload },
      };
    case "successModal":
      return {
        ...state,
        modals: { ...state.modals, success: action.payload },
      };
    case "currentPasswordError":
      return {
        ...state,
        errors: { ...state.errors, currentPassword: action.payload },
      };
    case "passwordVisible":
      return {
        ...state,
        Visibility: {
          ...state.visibility,
          password: !state.visibility.password,
        },
      };
    case "filledCurrentPassword":
      return {
        ...state,
        filled: { ...state.filled, currentPassword: action.payload },
      };
    default:
      return state;
  }
};

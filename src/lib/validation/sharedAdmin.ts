import { object, string, ref, boolean } from "yup";

export const authSchema = {
  login: object().shape({
    username_email: string().min(2, "").max(20, "").required(),
    password: string().min(5).max(40).required(),
  }),
  m_token: string().length(6),
};

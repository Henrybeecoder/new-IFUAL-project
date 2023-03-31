import { createContext, Dispatch, SetStateAction } from "react";
import { PaymentPayload } from "src/screens/Checkout/types";

export const Context = createContext<{
  product?: {
    paymentPayload?: PaymentPayload;
    setPaymentPayload: Dispatch<SetStateAction<PaymentPayload>>;
  };
}>({});

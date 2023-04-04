import { getUser } from "../../../src/Custom hooks/Hooks";

export interface PayWAccountPayload {
  bankAccount: string;
  data: PaymentPayload[];
}

interface ProductDetail {
  productName: string;
  deliveryTime: string;
  quantity: string;
  price: string;
  total: string;
  interval: number;
  intervalOf: number;
  vendorId: string;
  discountPrice: number;
  productId: string;
}

export interface PaymentPayload {
  productDetail: ProductDetail;
  deliveryDetail: DeliveryDetail;
}

export interface DeliveryDetail {
  firstName: string;
  surName: string;
  phoneNumber: string;
  emailAddress: string;
  deliveryAdress: string;
  state: string;
}

export const usePPInitialValues: (
  productDetail?: ProductDetail
) => PaymentPayload = (productDetail) => {
  const user = getUser();

  return {
    deliveryDetail: user
      ? {
          surName: user.lastName,
          deliveryAdress: user.homeAddress,
          emailAddress: user.email,
          firstName: user.firstName,
          phoneNumber: user.phoneNumber,
          state: user.state,
        }
      : {
          firstName: "",
          surName: "",
          phoneNumber: "",
          emailAddress: "",
          deliveryAdress: "",
          state: "",
        },
    productDetail: productDetail
      ? productDetail
      : {
          deliveryTime: "",
          price: "",
          productId: "",
          quantity: "",
          discountPrice: 0,
          interval: 0,
          productName: "",
          total: "0",
          vendorId: "",
          intervalOf: 0,
        },
  };
};

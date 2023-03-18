export interface RegisterType {
  compayName: string;
}

export interface OrderStatusType {
  orderId: string;
  customerId: string;
  orderNumber: string;
  total: number;
  dateCreated: string;
  dateModified: string;
  orderStatus: number;
  description: string;
  systemIp: string | null;
  customerName: string;
  customerConfirmDelivery: boolean;
  vendorConfirmDelivery: boolean;
  orderDeclineReason: string;
  orderDeliveries: [];
  orderDeliveryAddresses: [];
  orderPurchasedHistories: [];
  orderPurchasedHistoryId: string;
  productId: string;
  vendorId: string;
  unitPrice: number;
  quantity: number;
  purchasedDate: string;
  product: string;
}

export interface ReportType {
  vendorId: string;
  referencNumber: string;
  title: string;
  category: string;
  description: string;
  sender: string;
  reportDate: string;
  status: string;
  reportId: string;
}

export interface location {
  key: string;
  label: string;
  value: string;
}
export class AccountDetails {
  phoneNumber: string;
  email: string;
}
export class AccountData {
  accountName: string;
  accountNumber: string;
  accountType: string;
  phoneNumber: string;
  currency: any;
  email: string;
  otpMetaData: {
    otp: string;
    otpRequestId: string;
    otpId: string;
    vendorId: string;
  };
}

export interface AddKycPayload {
  emailAddress: string;
  uploadImage: string;
  representativeName1: string;
  representativeName2: string;
  dateofRegistration: string;
  cacRegistrationNumber: string;
  operationLocation: location[];
  accountNumber: string;
  accountName: string;
  bvn: string;
  acctPhoneNumber: string;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ProductType {}

export interface Product {
  description: string;
  category: string;
  status: string;
  supplyTime: string;
  price: string;
  locations: [];
  discount: string;
}

export interface FullProduct {
  productId: string;
  barcode: string;
  brand: string;
  category: string;
  categoryId: string;
  companyName: string | null;
  dateCreated: string;
  dateModified: string;
  description: string;
  discountPrice: number;
  filePath: string | null;
  fileType: string | null;
  interval: number;
  intervalOf: number;
  lga: string;
  lgaId: string | null;
  productCode: string;
  productName: string;
  quantity: number;
  rating: number;
  shippingWeight: string;
  state: string;
  stateId: null;
  stateList: null;
  subTotal: number;
  supply: string;
  unitPrice: number;
  vendorId: string;
  vendorName: string;
}

//2023-02-16T13:35:12.53343

export interface Order {
  customerId: string;
  dateCreated: string;
  dateModified: string;
  deliveryDateTime: string;
  deliveryEmailAddress: string;
  deliveryFirstName: string;
  deliveryLastName: string;
  deliveryPhoneNumber: string;
  deliveryStateId: number;
  deliveryStreetAddress: string;
  description: "N/A";
  orderId: string;
  orderNumber: string;
  orderStatus: number;
  productId: string;
  productName: string;
  quantity: number;
  total: number;
  unitPrice: number;
  vendorId: string;
  vendorName: string;
}

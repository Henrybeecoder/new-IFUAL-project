export interface Product {
  description: string;
  category: string;
  status: string;
  supplyTime: string;
  price: string;
  locations: [];
  discount: string;
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

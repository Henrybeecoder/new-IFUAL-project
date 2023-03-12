export class endpoints {
  static vendorRegistration = "/Account/Register-Vendor";
  static addKyc = "/Account/Add-KYC";
  static verifyOtp = "/Account/VerifyOTP";
  static resendOtp = "/Account/ReSendOtp";
  static confirmVendorEmail = (id: any) =>
    `/Account/ConfirmEmailAddres?RequestCode=${id}`;
  static getVendorLGs = (id: any) => `/Account/GetLocalGovt/${id}`;
  static verifyBvn = (id: any) => `/Account/Verify-BVN?BvnNumber=${id}`;
  static verifyAccount = (id: any) => `/Account/VerifyAccount/${id}`;

}

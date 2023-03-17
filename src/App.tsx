import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./screens/StartPage";
import Login from "./screens/Login";
import SignUp from "./screens/SignUp";
import Support from "./screens/Support";
import Dashboard from "./screens/vendor/Dashboard";
import ForgotPassword from "./screens/ForgotPassword";
import ForgotPasswordMessage from "./screens/ForgotPassword/Message";
import ResetPassword from "./screens/ResetPassword";
import SignUpMessage from "./screens/messages/SignUpMessage";
import KycNotification from "./screens/messages/Kyc/Message";
// customer
import Notification from "./screens/vendor/Notification";
import Home from "./screens/Customer/Home";
import Checkout from "./screens/Checkout";
import Cart from "./screens/Customer/Cart";
import Profile from "./screens/Customer/Profile";
import Orders from "./screens/Customer/Orders";
//vendor
import LoginVendor from "./screens/vendor/Login";
import ProductInfo from "./screens/vendor/ProductList/ProductInfo";
import OrderStatus from "./screens/vendor/OrderStatus";
import ProductList from "./screens/vendor/ProductList";
import OrderDetailsVendor from "./screens/vendor/OrderStatus/OrderDetails";
import ProfileVendor from "./screens/vendor/Profile";
import Report from "./screens/vendor/Report";
import NewReport from "./screens/vendor/Report/New";
import KycVendor from "./screens/messages/Kyc";
import VendorForgotPassword from "./forms/PasswordForms/Vendor/ForgotPassword";
import VendorResetPassword from "./forms/PasswordForms/Vendor/ResetPassword";
import VendorSignUpMessage from "./screens/vendor/Messages/VendorSignUpMessage";
import KycSignUpMessage from "./screens/vendor/Messages/KycSignUpMessage";

// admin
import LoginAdmin from "./screens/Admin/Login";
import DashboardAdmin from "./screens/Admin/Dashboard";
import SettingsAdmin from "./screens/Admin/Settings";
import CannotLoginAdmin from "./screens/Admin/Login/CannotLogin";
import CustomMessageAdmin from "./screens/Admin/ComplaintsLog/CustomMessage";
import ManageOrdersAdmin from "./screens/Admin/ManageOrders";
import OrderDetailsAdmin from "./screens/Admin/ManageOrders/OrderDetails";
import CustomerProfileAdmin from "./screens/Admin/ManageOrders/CustomerProfile";
import TrackOrderAdmin from "./screens/Admin/ManageOrders/TrackOrder";
import VendorProfileAdmin from "./screens/Admin/ManageOrders/VendorProfile";
import ComplaintsLogAdmin from "./screens/Admin/ComplaintsLog";
import ActivityLogAdmin from "./screens/Admin/ActivityLog";
import ManageUsersAdmin from "./screens/Admin/ManageUsers";
import NotificationAdmin from "./screens/Admin/Notification";
// superadmin
import DashboardSuperAdmin from "./screens/SuperAdmin/Dashboard";
import SettingsSuperAdmin from "./screens/SuperAdmin/Settings";
import ManageUsersSuperAdmin from "./screens/SuperAdmin/ManageUsers";
import ManageProducts from "./screens/SuperAdmin/ManageProducts";
import ProductDetails from "./screens/SuperAdmin/ManageProducts/ProductDetails";
import ManageOrdersSuperAdmin from "./screens/SuperAdmin/ManageOrders";
import OrderDetailsSuperAdmin from "./screens/SuperAdmin/ManageOrders/OrderDetails";
import CustomerProfileSuperAdmin from "./screens/SuperAdmin/ManageOrders/CustomerProfile";
import TrackOrderSuperAdmin from "./screens/SuperAdmin/ManageOrders/TrackOrder";
import VendorProfileSuperAdmin from "./screens/SuperAdmin/ManageOrders/VendorProfile";
import ComplaintsLogSuperAdmin from "./screens/SuperAdmin/ComplaintsLog";
import CustomMessageSuperAdmin from "./screens/SuperAdmin/ComplaintsLog/CustomMessage";
import ActivityLogSuperAdmin from "./screens/SuperAdmin/ActivityLog";
import LoginSuperAdmin from "./screens/SuperAdmin/Login";
import CustomerInfo from "./screens/SuperAdmin/ManageUsers/CustomerInfo";
import CannotLoginSuperAdmin from "./screens/SuperAdmin/Login/CannotLogin";
import NotificationSuperAdmin from "./screens/SuperAdmin/Notification";
import Order from "./screens/Customer/Home/Order";

// shared admin
// import CustomMessage from "./screens/SharedAdmin/ComplaintsLog/CustomMessage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/start-page' element={<LoginPage />} />
        <Route path='/checkout/:id' element={<Checkout />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/orders' element={<Orders />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/support' element={<Support />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route
          path='/forgot-password-notification'
          element={<ForgotPasswordMessage />}
        />
        <Route path='/reset-password' element={<ResetPassword />} />
        <Route path='/sign-up-message' element={<SignUpMessage />} />
        <Route path='/kyc-notification' element={<KycNotification />} />
        {/* //customer */}
        <Route path='/' element={<Home />} />
        <Route path=':id' element={<Order />} />
        <Route path='customer'>
          <Route path='profile' element={<Profile />} />
        </Route>
        <Route path='/vendor'>
          <Route path='login' element={<LoginVendor />} />
          <Route path='forgot-password' element={<VendorForgotPassword />} />
          <Route path='reset-password' element={<VendorResetPassword />} />
          <Route index element={<Dashboard />} />
          <Route path='profile' element={<ProfileVendor />} />
          <Route path='dashboard' element={<Dashboard />} />
          <Route path='verify' element={<KycVendor />} />
          <Route path='sign-up-message' element={<VendorSignUpMessage />} />
          <Route path='kyc-sign-up-message' element={<KycSignUpMessage />} />
          <Route path='order-status'>
            <Route index element={<OrderStatus />} />
            <Route path=':id' element={<OrderDetailsVendor />} />
          </Route>
          <Route path='product-list'>
            <Route index element={<ProductList />} />
            <Route path=':id' element={<ProductInfo />} />
          </Route>
          <Route path='notification' element={<Notification />} />
          <Route path='report'>
            <Route index element={<Report />} />
            <Route path='new' element={<NewReport />} />
          </Route>
        </Route>
        <Route path='/admin'>
          <Route index element={<LoginAdmin />} />
          <Route path='login-issue' element={<CannotLoginAdmin />} />
          <Route path='notification' element={<NotificationAdmin />} />
          <Route path='dashboard' element={<DashboardAdmin />} />
          <Route path='settings' element={<SettingsAdmin />} />
          <Route path='manage-users/*' element={<ManageUsersAdmin />} />
          <Route path='manage-orders'>
            <Route index element={<ManageOrdersAdmin />} />
            <Route path=':id'>
              <Route index element={<OrderDetailsAdmin />} />
              <Route
                path='profile-customer'
                element={<CustomerProfileAdmin />}
              />
              <Route path='profile-vendor' element={<VendorProfileAdmin />} />
              <Route path='track-order' element={<TrackOrderAdmin />} />
            </Route>
          </Route>
          <Route path='complaints-log'>
            <Route index element={<ComplaintsLogAdmin />} />
            <Route path='custom-message' element={<CustomMessageAdmin />} />
          </Route>
          <Route path='activity-log' element={<ActivityLogAdmin />} />
        </Route>
        <Route path='/super-admin'>
          <Route index element={<LoginSuperAdmin />} />
          <Route path='login-issue' element={<CannotLoginSuperAdmin />} />
          <Route path='notification' element={<NotificationSuperAdmin />} />
          <Route path='dashboard' element={<DashboardSuperAdmin />} />
          <Route path='settings' element={<SettingsSuperAdmin />} />
          <Route path='manage-users/*' element={<ManageUsersSuperAdmin />} />
          <Route path='manage-products'>
            <Route index element={<ManageProducts />} />
            <Route path=':id' element={<ProductDetails />} />
          </Route>
          <Route path='manage-orders'>
            <Route index element={<ManageOrdersSuperAdmin />} />
            <Route path=':id'>
              <Route index element={<OrderDetailsSuperAdmin />} />
              <Route
                path='profile-vendor'
                element={<VendorProfileSuperAdmin />}
              />
              <Route
                path='profile-customer'
                element={<CustomerProfileSuperAdmin />}
              />
              <Route path='track-order' element={<TrackOrderSuperAdmin />} />
            </Route>
          </Route>
          <Route path='complaints-log'>
            <Route index element={<ComplaintsLogSuperAdmin />} />
            <Route
              path='custom-message'
              element={<CustomMessageSuperAdmin />}
            />
          </Route>
          <Route path='activity-log' element={<ActivityLogSuperAdmin />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

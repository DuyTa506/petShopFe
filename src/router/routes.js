import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  Home,
  Product,
  Products,
  AboutPage,
  ContactPage,
  Cart,
  Checkout,
  PageNotFound,
} from "../pages";
import SuccessCheckOut from "../pages/SuccessCheckout";
import FailCheckout from "../pages/FaliCheckout";
import Login from "../pages/Login/Login";
import NotEnoughProduct from "../pages/NotEnoughProduct";
import Dashboard from "../pages/Admin/Dashboard";
import UserList from "../pages/Admin/UserList";
import AddUpdateUser from "../pages/Admin/AddUpdateUser";
import BrandList from "../pages/Admin/BrandList";
import AddUpdateBrand from "../pages/Admin/AddUpdateBrand";
import RequireAuth from "../components/RequireAuth";
import Signup from "../pages/Login/Signup";
import ProductList from "../pages/Admin/ProductList";
import AddUpdateProduct from "../pages/Admin/AddUpdateProduct";
import ProfilePage from "../pages/UserProfile/ProfilePage";
import CategoryList from "../pages/Admin/CategoryList";
import ContactUs from "../pages/ContactUs";
export default function RootRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product" element={<Products />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/notEnough/:id" element={<NotEnoughProduct />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contactUs" element={<ContactUs />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Signup />} />

        <Route path="/checkout" element={<Checkout />} />
        <Route path="*" element={<PageNotFound />} />
        <Route path="/product/*" element={<PageNotFound />} />
        <Route path="/successCheckOut/*" element={<SuccessCheckOut />} />
        <Route path="/failCheckOut/*" element={<FailCheckout />} />

        <Route element={<RequireAuth allowedRoles={["Customer", "Admin"]} />}>
          <Route path="/profile" element={<ProfilePage></ProfilePage>}></Route>
          <Route path="/cart" element={<Cart />} />
        </Route>
        <Route element={<RequireAuth allowedRoles={["Admin"]} />}>
          <Route
            path="/dashboard/CategoryList"
            element={<CategoryList></CategoryList>}
          ></Route>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/userList" element={<UserList />} />
          <Route path="/dashboard/BrandList" element={<BrandList />} />
          <Route path="/dashboard/ModifyUser/:id" element={<AddUpdateUser />} />
          <Route path="/dashboard/ModifyUser" element={<AddUpdateUser />} />
          <Route
            path="/dashboard/ModifyProduct/:id"
            element={<AddUpdateProduct />}
          />
          <Route
            path="/dashboard/ModifyProduct"
            element={<AddUpdateProduct />}
          />
          <Route
            path="/dashboard/ProductList"
            element={<ProductList></ProductList>}
          ></Route>
          <Route
            path="/dashboard/ModifyBrand/:id"
            element={<AddUpdateBrand />}
          />
          <Route path="/dashboard/ModifyBrand" element={<AddUpdateBrand />} />
        </Route>
      </Routes>
    </Router>
  );
}

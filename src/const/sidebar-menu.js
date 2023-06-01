import { BASE_URL } from "./constant";
const sidebar_menu = [
  {
    id: 1,
    icon: BASE_URL + "assets/icons/dashboard.svg",

    path: "/dashboard",
    title: "Trang điều khiển",
  },
  {
    id: 2,
    icon: BASE_URL + "assets/icons/shipping.svg",
    path: "/dashboard/orders",
    title: "Đơn hàng",
  },
  {
    id: 3,
    icon: BASE_URL + "assets/icons/product.svg",
    path: "/dashboard/Productlist",
    title: "Sản phẩm",
  },
  {
    id: 4,
    icon: BASE_URL + "assets/icons/user.svg",
    path: "/dashboard/userList",
    title: "Tài khoản",
  },
  {
    id: 5,
    icon: BASE_URL + "assets/icons/user.svg",
    path: "dashboard/categorylist",
    title: "Loại sản phẩm",
  },
  {
    id: 6,
    icon: BASE_URL + "assets/icons/user.svg",
    path: "/dashboard/BrandList",
    title: "Nhãn hiệu",
  },
];

export default sidebar_menu;

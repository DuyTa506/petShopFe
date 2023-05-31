import { BASE_URL } from "./constant";
const sidebar_menu = [
  {
    id: 1,
    icon: BASE_URL + "assets/icons/dashboard.svg",

    path: "/",
    title: "Dashboard",
  },
  {
    id: 2,
    icon: BASE_URL + "assets/icons/shipping.svg",
    path: "/orders",
    title: "Orders",
  },
  {
    id: 3,
    icon: BASE_URL + "assets/icons/product.svg",
    path: "/products",
    title: "Products",
  },
  {
    id: 4,
    icon: BASE_URL + "assets/icons/user.svg",
    path: "/dashboard/userList",
    title: "Accounts",
  },
  {
    id: 5,
    icon: BASE_URL + "assets/icons/user.svg",
    path: "/profile",
    title: "Categories",
  },
  {
    id: 6,
    icon: BASE_URL + "assets/icons/user.svg",
    path: "/profile",
    title: "Brands",
  },
];

export default sidebar_menu;

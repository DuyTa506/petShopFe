import React from "react";
import ReactDOM from "react-dom/client";
import "../node_modules/font-awesome/css/font-awesome.min.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import "./index.css";

import {
  Home,
  Product,
  Products,
  AboutPage,
  ContactPage,
  Cart,
  Register,
  Checkout,
  PageNotFound,
} from "./pages";
import Login from "./pages/Login/Login";
import { AuthProvider } from "./context/AuthProvider";
import App from "./App/App";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthProvider>
    <Provider store={store}>
      {" "}
      <App></App>
    </Provider>
  </AuthProvider>
);

import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBBtn,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
  MDBInput,
  MDBCollapse,
  MDBCol,
  MDBIcon,
} from "mdb-react-ui-kit";
import axios from "../api/axios";
import { useState } from "react";
import { useEffect } from "react";
import PersonIcon from "@mui/icons-material/Person";
const isLogged = localStorage.getItem("token");

const handleLogout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("role");
  localStorage.removeItem("id");
  window.location.href = "/";
};

const Navbar = () => {
  const navigate = useNavigate();
  const getUserCart = () => {
    axios
      .get("/api/cart/get-cart?cId=" + localStorage.getItem("id"), {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        console.log(res.data);
        setUserCart(res.data.cartDetails);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getUserCart();
  }, []);
  const search = () => {
    let keyword = document.getElementById("keyword").value;
    if (keyword != null) {
      navigate("/product", {
        state: { keyword: keyword != "" ? keyword : null },
      });
    }
  };
  const [userCart, setUserCart] = useState([]);
  const state = useSelector((state) => state.handleCart);
  return (
    <nav
      style={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}
      className="navbar navbar-expand-lg navbar-light bg-light py-3 sticky-top"
    >
      <div className="container">
        <NavLink className="navbar-brand fw-bold fs-4 px-2" to="/">
          {" "}
          React Ecommerce
        </NavLink>
        <button
          className="navbar-toggler mx-2"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <MDBCol md="4">
          <div className="input-group md-form form-sm form-1 pl-0">
            <div className="input-group-prepend">
              <span
                className="input-group-text purple lighten-3"
                id="basic-text1"
              >
                <MDBIcon
                  onClick={search}
                  className="text-white"
                  icon="search"
                />
              </span>
            </div>
            <input
              id="keyword"
              className="form-control my-0 py-1"
              type="text"
              placeholder="Search"
              aria-label="Search"
            />
          </div>
        </MDBCol>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav m-auto my-2 text-center">
            <li className="nav-item">
              <NavLink className="nav-link" to="/">
                Home{" "}
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/product">
                Sản phẩm
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link" to="/contactUs">
                Contact us
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/about">
                About us
              </NavLink>
            </li>
          </ul>
          <div className="buttons text-center">
            <MDBNavbarNav right fullWidth={false}>
              {isLogged ? (
                <>
                  <MDBNavbarItem>
                    {" "}
                    <NavLink to="/cart" className="btn btn-outline-dark m-2">
                      <i className="fa fa-cart-shopping mr-1"></i> Cart
                      {/* ({userCart.length != 0 ? userCart.cartDetails.length : 0}) */}
                    </NavLink>
                  </MDBNavbarItem>
                  <MDBNavbarItem>
                    <MDBDropdown>
                      <MDBDropdownToggle tag="a" className="nav-link link-dark">
                        <PersonIcon />
                      </MDBDropdownToggle>
                      <MDBDropdownMenu style={{ padding: 0 }}>
                        {localStorage.getItem("role") &&
                        localStorage.getItem("role").toLowerCase() ==
                          "admin" ? (
                          <MDBDropdownItem link href="/dashboard">
                            Dashboard
                          </MDBDropdownItem>
                        ) : (
                          <></>
                        )}
                        <MDBDropdownItem link href="/profile">
                          Hồ sơ cá nhân
                        </MDBDropdownItem>
                        <MDBDropdownItem link href="/OrderHistory">
                          Lịch sử mua hàng
                        </MDBDropdownItem>
                        <MDBDropdownItem link href="/change-password">
                          Đổi mật khẩu
                        </MDBDropdownItem>
                        <MDBDropdownItem link href="/" onClick={handleLogout}>
                          Đăng xuất
                        </MDBDropdownItem>
                      </MDBDropdownMenu>
                    </MDBDropdown>
                  </MDBNavbarItem>
                </>
              ) : (
                <MDBNavbarItem>
                  <NavLink to="/login" className="btn btn-outline-dark m-2">
                    <i className="fa fa-sign-in-alt mr-1"></i> Login
                  </NavLink>
                  <NavLink to="/register" className="btn btn-outline-dark m-2">
                    <i className="fa fa-user-plus mr-1"></i> Register
                  </NavLink>
                </MDBNavbarItem>
              )}
            </MDBNavbarNav>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

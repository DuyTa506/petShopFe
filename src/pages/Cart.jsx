import React from "react";
import { Footer, Navbar } from "../components";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";
import { addCart, delCart } from "../redux/action";
import { Link } from "react-router-dom";
import axios from "../api/axios";
import { RELATIVE_URL_IMG_PRODUCT } from "../const/constant";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./css/Cart.module.css";
import { Button } from "antd";
import { useParams } from "react-router-dom";
const Cart = () => {
  const state = useSelector((state) => state.handleCart);
  const dispatch = useDispatch();
  const [userCart, setUserCart] = useState([]);
  const [cartId, setCartId] = useState(0);
  const [change, setChange] = useState(false);
  const [checkOutStatus, setCheckOutStatus] = useState(false);
  const successToast = () =>
    toast.success("Thêm sản phẩm thành công!", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  const redirectingToast = () => {
    toast.success("Bạn đang được chuyển hướng! Vui lòng chờ trong giây lát!", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };
  const successDecreaseToast = () =>
    toast.success("Xóa sản phẩm thành công!", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  const successCheckOutToast = () =>
    toast.success("Xóa sản phẩm thành công!", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  const getUserCart = () => {
    axios
      .get(
        "/api/cart/get-cart?cId=" + localStorage.getItem("id"),

        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        console.log(res.data);

        setUserCart(res.data.cartDetails);
        setCartId(res.data.id);
      })
      .catch((err) => {
        console.log("Bearer " + localStorage.getItem("token"));
        console.log(err);
      });
  };
  useEffect(() => {
    getUserCart();
  }, [change]);

  const EmptyCart = () => {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12 py-5 bg-light text-center">
            <h4 className="p-3 display-5">Your Cart is Empty</h4>
            <Link to="/" className="btn  btn-outline-dark mx-4">
              <i className="fa fa-arrow-left"></i> Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  };

  const addItem = (product) => {
    console.log(product);
    axios
      .post(
        "api/cart/add-to-cart?cId=" + cartId + "&pId=" + product.product.id,
        {},
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        console.log(res);
        setChange(!change);
        successToast();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const checkOut = async (price) => {
    await axios
      .post(
        "/pay?price=" + price + "&cId=" + cartId,
        {},
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        redirectingToast();
        console.log(res);
        window.location.replace(res.data);
      });
  };
  const removeItem = (product) => {
    if (product.quantity > 1) {
      axios
        .put(
          "api/cart/decrease-from-cart?cId=" +
            cartId +
            "&pId=" +
            product.product.id,
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        )
        .then((res) => {
          console.log(res);
          setChange(!change);
          successDecreaseToast();
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      deleteItemFromCart(product);
    }
  };

  const deleteItemFromCart = (product) => {
    axios
      .delete(
        "api/cart/remove-from-cart?cId=" +
          cartId +
          "&pId=" +
          product.product.id,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        console.log(res);
        setChange(!change);
        successDecreaseToast();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const ShowCart = () => {
    let subtotal = 0;
    let shipping = 30.0;
    let totalItems = 0;
    userCart.map((item) => {
      return (subtotal += item.product.price * item.quantity);
    });

    userCart.map((item) => {
      return (totalItems += item.quantity);
    });
    return (
      <>
        <section className="h-100 gradient-custom">
          <div className="container py-5">
            <div className="row d-flex justify-content-center my-4">
              <div className="col-md-8">
                <div className="card mb-4">
                  <div className="card-header py-3">
                    <h5 className="mb-0">Item List</h5>
                  </div>
                  <div className="card-body">
                    {userCart.map((item) => {
                      return (
                        <div key={item.product.id}>
                          <div></div>
                          <div className="row d-flex align-items-center">
                            <div className="col-lg-3 col-md-12">
                              <div
                                className="bg-image rounded"
                                data-mdb-ripple-color="light"
                              >
                                <img
                                  src={
                                    item.product.listImg.length > 0
                                      ? item.product.listImg[0].url
                                      : "https://adlog.narmadeayurvedam.com/dtup/default-product.png"
                                  }
                                  // className="w-100"
                                  alt={item.product.name}
                                  width={100}
                                  height={75}
                                />
                              </div>
                            </div>

                            <div className="col-lg-5 col-md-6">
                              <p>
                                <strong>{item.product.name}</strong>
                              </p>
                              {/* <p>Color: blue</p>
                              <p>Size: M</p> */}
                            </div>

                            <div className="col-lg-4 col-md-6">
                              <div
                                className="d-flex mb-4"
                                style={{ maxWidth: "300px" }}
                              >
                                {item.quantity > 1 ? (
                                  <button
                                    className={styles.cartBtn}
                                    onClick={() => {
                                      removeItem(item);
                                    }}
                                  >
                                    <i className="fas fa-minus"></i>
                                  </button>
                                ) : (
                                  <button
                                    className={styles.cartBtn}
                                    onClick={() => {
                                      removeItem(item);
                                    }}
                                  >
                                    <i class="fas fa-ban"></i>
                                  </button>
                                )}

                                <input
                                  className={styles.cartQty}
                                  readOnly
                                  value={item.quantity}
                                />

                                <button
                                  className={styles.cartBtn}
                                  onClick={() => {
                                    addItem(item);
                                  }}
                                >
                                  <i className="fas fa-plus"></i>
                                </button>
                              </div>

                              <span className="text-start text-md-center">
                                <strong>
                                  <span className="text-muted">
                                    {item.quantity}
                                  </span>{" "}
                                  x ${item.product.price}
                                </strong>
                              </span>
                              <button
                                className={
                                  styles.cartBtn + " " + styles.cartRemoveBtn
                                }
                                onClick={() => {
                                  deleteItemFromCart(item);
                                }}
                              >
                                <i className="fas fa-trash-alt"></i>
                              </button>
                            </div>
                          </div>

                          <hr className="my-4" />
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card mb-4">
                  <div className="card-header py-3 bg-light">
                    <h5 className="mb-0">Order Summary</h5>
                  </div>
                  <div className="card-body">
                    <ul className="list-group list-group-flush">
                      <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                        Products ({totalItems})
                        <span>${Math.round(subtotal)}</span>
                      </li>
                      <li className="list-group-item d-flex justify-content-between align-items-center px-0">
                        Shipping
                        <span>${shipping}</span>
                      </li>
                      <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                        <div>
                          <strong>Total amount</strong>
                        </div>
                        <span>
                          <strong>${Math.round(subtotal + shipping)}</strong>
                        </span>
                      </li>
                    </ul>

                    <button
                      onClick={() => {
                        checkOut(Math.round(subtotal));
                      }}
                      className="btn btn-dark btn-lg btn-block"
                    >
                      Go to checkout
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  };

  return (
    <>
      <Navbar />
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className="container my-3 py-3">
        <h1 className="text-center">Cart</h1>
        <hr />
        {userCart.length > 0 ? <ShowCart /> : <EmptyCart />}
      </div>
      <Footer />
    </>
  );
};

export default Cart;

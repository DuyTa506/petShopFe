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
import styles from "./css/OrderHistory.module.css";
import { Button } from "antd";
import { useParams } from "react-router-dom";

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    axios
      .get("/api/orders/get-by-user?id=" + localStorage.getItem("id"), {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        console.log(res.data);
        if (res.data.length > 0) {
          setOrders(res.data);
          console.log(orders);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const EmptyCart = () => {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12 py-5 bg-light text-center">
            <h4 className="p-3 display-5">Bạn chưa có đơn hàng nào</h4>
            <Link to="/" className="btn  btn-outline-dark mx-4">
              <i className="fa fa-arrow-left"></i> Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  };

  const ShowCart = (props) => {
    let subtotal = 0;
    let shipping = 30000;
    let totalItems = 0;
    props.userCart.orderDetails.map((item) => {
      return (subtotal += item.product.price * item.quantity);
    });

    props.userCart.orderDetails.map((item) => {
      return (totalItems += item.quantity);
    });
    return (
      <>
        <section className="h-100 gradient-custom">
          <div className="container">
            <div className="row d-flex justify-content-center my-4">
              <div className="col-md-8">
                <div className="card mb-4">
                  <div className="card-header py-3">
                    <h5 className="mb-0">
                      Đơn hàng ngày {props.userCart.createdDate}
                    </h5>
                  </div>
                  <div className="card-body">
                    {props.userCart.orderDetails.map((item) => {
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
                                <input
                                  className={styles.cartQty}
                                  readOnly
                                  value={item.quantity}
                                />
                              </div>

                              <span className="text-start text-md-center">
                                <strong>
                                  <span className="text-muted">
                                    {item.quantity}
                                  </span>{" "}
                                  x {item.product.price} vnd
                                </strong>
                              </span>
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
                        <span>{Math.round(subtotal)} vnd</span>
                      </li>
                      <li className="list-group-item d-flex justify-content-between align-items-center px-0">
                        Shipping
                        <span>{shipping} vnd</span>
                      </li>
                      <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                        <div>
                          <strong>Total amount</strong>
                        </div>
                        <span>
                          <strong>{Math.round(subtotal + shipping)} vnd</strong>
                        </span>
                      </li>
                    </ul>
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
      <Navbar></Navbar>
      <div className="container my-3 py-3">
        <h1 className="text-center">Lịch sử mua hàng</h1>
        <hr />
        {orders.length > 0 ? (
          orders.map((item) => {
            return <ShowCart userCart={item}></ShowCart>;
          })
        ) : (
          <EmptyCart />
        )}
      </div>
      <Footer></Footer>
    </>
  );
};
export default OrderHistory;

import React from "react";
import { Link } from "react-router-dom";
import { Navbar } from "../components";

const FailCheckout = () => {
  return (
    <>
      <Navbar />
      <div className="container my-3 py-3">
        <div className="container">
          <div className="row">
            <div className="col-md-12 py-5 bg-light text-center">
              <h4 className="p-3 display-5">
                Đã có lỗi xảy ra vui lòng thử lại
              </h4>
              <Link to="/" className="btn  btn-outline-dark mx-4">
                <i className="fa fa-arrow-left"></i> Trở về trang chủ
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FailCheckout;

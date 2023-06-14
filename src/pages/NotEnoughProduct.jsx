import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Footer, Navbar } from "../components";
import { useParams } from "react-router-dom";
import axios from "../api/axios";
const NotEnoughProduct = () => {
  const id = useParams();
  const [product, setProduct] = useState(false);
  useEffect(() => {
    console.log(id.id);
    const getProduct = async () => {
      const response = await fetch(
        `http://localhost:8080/api/products/get/${id.id}`
      );
      const data = await response.json();
      setProduct(data);
    };
    getProduct();
  }, [id]);
  return (
    <>
      <Navbar />
      <div className="container my-3 py-3">
        <div className="container">
          <div className="row">
            <div className="col-md-12 py-5 bg-light text-center">
              <h4 className="p-3 display-5">
                Đã có lỗi xảy ra vui lòng thử lại!
                {product && (
                  <h4>
                    Số lượng sản phẩm {product.name} trong kho chỉ còn{" "}
                    {product.stock} không đủ đáp ứng order của bạn
                  </h4>
                )}
              </h4>
              <Link to="/" className="btn  btn-outline-dark mx-4">
                <i className="fa fa-arrow-left"></i> Trở về trang chủ
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </>
  );
};

export default NotEnoughProduct;

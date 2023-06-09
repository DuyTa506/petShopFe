import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addCart } from "../redux/action";
import axios from "../api/axios";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import { RELATIVE_URL_IMG_PRODUCT } from "../const/constant";
import { MDBListGroup, MDBRipple, MDBListGroupItem } from "mdb-react-ui-kit";
import styles from "../pages/css/Products.module.css";
import ReactPaginate from "react-paginate";
import { useLocation } from "react-router-dom";
const Products = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  let componentMounted = true;
  const [cartId, setCartId] = useState(0);
  const [categories, setCategories] = useState([]);
  const [cat, setCat] = useState(null);
  const [brand, setBrand] = useState(null);
  const [brands, setBrands] = useState([]);
  const [keywords, setKeywords] = useState(null);
  const [sort, setSort] = useState(null);
  const [pageInfo, setPageInfo] = useState(1);
  const [pageNo, setPageNo] = useState(null);
  const location = useLocation();
  if (location.state != null) {
    console.log(location.state.keyword);
  }
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
  const dispatch = useDispatch();

  const addProduct = (product) => {
    console.log(product);
    axios
      .post(
        "api/cart/add-to-cart?cId=" + cartId + "&pId=" + product.id,
        {},
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        console.log(res);
        successToast();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getUserCart = () => {
    axios
      .get("/api/cart/get-cart?cId=" + localStorage.getItem("id"), {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        console.log(res.data);

        setCartId(res.data.id);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getCategory = () => {
    axios
      .get("/api/categories")
      .then((res) => {
        console.log(res.data);
        setCategories(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getBrand = () => {
    axios
      .get("/api/brand")
      .then((res) => {
        console.log(res.data);
        setBrands(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handlePageClick = (e) => {
    console.log(e);
    setPageNo(e.selected);
  };
  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);
      await axios
        .post("/api/products/search", {
          keywords: location.state != null ? location.state.keyword : null,
          brand: brand,
          sort: sort,
          category: cat,
          pageNo: pageNo,
        })
        .then((res) => {
          console.log(res.data);
          // setData(res.data.products);
          setPageInfo(res.data.totalPage);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    getProducts();
    getUserCart();
    getCategory();
    getBrand();
  }, []);

  const changePage = async () => {
    setLoading(true);
    await axios
      .post("/api/products/search", {
        keywords: location.state != null ? location.state.keyword : null,
        brand: brand,
        sort: sort,
        category: cat,
        pageNo: pageNo,
      })
      .then((res) => {
        console.log(res.data);
        setData(res.data.products);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const searchProduct = async () => {
    setLoading(true);
    await axios
      .post("/api/products/search", {
        keywords: location.state != null ? location.state.keyword : null,
        brand: brand,
        sort: sort,
        category: cat,
      })
      .then((res) => {
        setPageNo(0);
        console.log(res.data);
        setData(res.data.products);
        setLoading(false);
        setPageInfo(res.data.totalPage);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const changeCat = (item) => {
    if (cat === item.categoryId) {
      console.log(item);
      setCat(null);
      console.log(cat);
    } else {
      setCat(item.categoryId);
      console.log(item);
      console.log(cat);
    }
  };

  const changeBrand = (item) => {
    if (brand === item.brandId) {
      setBrand(null);
    } else {
      setBrand(item.brandId);
    }
  };

  useEffect(() => {
    searchProduct();
  }, [keywords, brand, cat, sort, location]);

  useEffect(() => {
    changePage();
  }, [pageNo]);

  const Loading = () => {
    return (
      <>
        <div className="col-12 py-5 text-center">
          <Skeleton height={40} width={560} />
        </div>
        <div className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
          <Skeleton height={592} />
        </div>
        <div className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
          <Skeleton height={592} />
        </div>
        <div className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
          <Skeleton height={592} />
        </div>
        <div className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
          <Skeleton height={592} />
        </div>
        <div className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
          <Skeleton height={592} />
        </div>
        <div className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
          <Skeleton height={592} />
        </div>
      </>
    );
  };

  const ShowProducts = () => {
    return (
      <div className="container">
        <div className="row">
          {data.map((product) => {
            return (
              <div
                id={product.id}
                key={product.id}
                className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4"
              >
                <div className="card text-center h-100" key={product.id}>
                  <img
                    className="card-img-top p-3"
                    src={
                      product.listImg.length > 0
                        ? product.listImg[0].url
                        : "https://adlog.narmadeayurvedam.com/dtup/default-product.png"
                    }
                    alt="Card"
                    height={300}
                  />
                  <div className="card-body">
                    <h5 className="card-title">
                      {product.name.substring(0, 12)}...
                    </h5>
                    <p className="card-text">
                      {product.description.substring(0, 90)}...
                    </p>
                  </div>
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item lead">$ {product.price}</li>
                    {/* <li className="list-group-item">Dapibus ac facilisis in</li>
                    <li className="list-group-item">Vestibulum at eros</li> */}
                  </ul>
                  <div className="card-body">
                    <Link
                      to={"/product/" + product.id}
                      className="btn btn-dark m-1"
                    >
                      Buy Now
                    </Link>
                    <button
                      className="btn btn-dark m-1"
                      onClick={() => addProduct(product)}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };
  return (
    <>
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
        <div className="row">
          <div className="col-12">
            {location.state != null ? (
              location.state.keyword != null ? (
                <h2 className="display-5 text-center">
                  Kết quả tìm kiếm cho '{location.state.keyword}'
                </h2>
              ) : (
                <h2 className="display-5 text-center">Tất cả sản phẩm</h2>
              )
            ) : (
              <h2 className="display-5 text-center">Tất cả sản phẩm</h2>
            )}

            <hr />
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-3">
            {" "}
            <h3
              className="select-none cursor-pointer flex justify-between"
              onClick={() => {
                // setFilterProducts(products);
                // setCatPath("all categories");
              }}
            >
              <span className="font-semibold">All Categories</span>
              {/* <span>{`(${products.length})`}</span> */}
            </h3>
            <MDBListGroup>
              {categories.map((item, i) => (
                <MDBListGroupItem
                  onClick={() => changeCat(item)}
                  className={
                    " border rounded rounded " +
                    styles.catList +
                    " " +
                    (cat === item.categoryId && styles.activeCat)
                  }
                >
                  <span>{item.categoryName}</span>
                </MDBListGroupItem>
              ))}
            </MDBListGroup>
            <h3
              className="select-none cursor-pointer flex justify-between"
              onClick={() => {
                // setFilterProducts(products);
                // setCatPath("all categories");
              }}
            >
              <br></br>
              <hr></hr>
              <br></br>
              <span className="font-semibold">All Brands</span>
              {/* <span>{`(${products.length})`}</span> */}
            </h3>
            <MDBListGroup>
              {brands.map((b, i) => (
                <MDBListGroupItem
                  key={i}
                  onClick={() => changeBrand(b)}
                  className={
                    " border rounded rounded " +
                    styles.catList +
                    " " +
                    (brand === b.brandId && styles.activeCat)
                  }
                >
                  <span>{b.brandName}</span>
                </MDBListGroupItem>
              ))}
            </MDBListGroup>
          </div>
          <div className="col-9">
            {loading ? <Loading /> : <ShowProducts />}
            <ReactPaginate
              nextLabel=" >"
              onPageChange={handlePageClick}
              pageRangeDisplayed={3}
              marginPagesDisplayed={2}
              pageCount={pageInfo}
              previousLabel="<"
              pageClassName={`page-item ${styles.pageItem}`}
              pageLinkClassName={`page-link ${styles.pageLink}`}
              previousClassName={`page-item ${styles.pageItem}`}
              previousLinkClassName={`page-link ${styles.pageLink}`}
              nextClassName={`page-item ${styles.pageItem}`}
              nextLinkClassName={`page-link ${styles.pageLink}`}
              breakLabel="..."
              breakClassName={`page-item ${styles.pageItem}`}
              breakLinkClassName={`page-link ${styles.pageLink}`}
              containerClassName={`pagination ${styles.customPagination}`}
              activeClassName={`active ${styles.active}`}
              renderOnZeroPageCount={null}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Products;

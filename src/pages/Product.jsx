import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import styles from "./css/Product.module.css";
import {
  MDBBtn,
  MDBCol,
  MDBContainer,
  MDBDropdown,
  MDBDropdownItem,
  MDBDropdownMenu,
  MDBDropdownToggle,
  MDBIcon,
  MDBRow,
  MDBTextArea,
} from "mdb-react-ui-kit";
import { Input } from "antd";
import StarRatings from "react-star-ratings";
import { Link, useParams } from "react-router-dom";
import Marquee from "react-fast-marquee";
import { useDispatch } from "react-redux";
import { addCart } from "../redux/action";
import axios from "../api/axios";
import { Footer, Navbar } from "../components";
import { MDBCarousel, MDBCarouselItem } from "mdb-react-ui-kit";
import { RELATIVE_URL_IMG_PRODUCT } from "../const/constant";
const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(false);
  const [similarProducts, setSimilarProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [ratings, setRatings] = useState([]);
  const [comment, setComment] = useState("");
  const [rate, setRate] = useState(0);
  const dispatch = useDispatch();
  const { TextArea } = Input;
  const addProduct = (product) => {
    dispatch(addCart(product));
  };

  const handleChange = (e) => {
    setComment(e.target.value);
  };

  const handleEdit = () => {
    // if (rate > 0) {
    //   axios
    //     .put(
    //       "/location/api/pois/editRating",
    //       {
    //         rate: rate,
    //         comment: comment,
    //         userId: localStorage.getItem("id"),
    //         poiId: poiId,
    //       },
    //       {
    //         headers: {
    //           Authorization: `Bearer ${localStorage.getItem("token")}`,
    //         },
    //       }
    //     )
    //     .then((res) => {
    //       setRatings(res.data);
    //       setRate(0);
    //       setComment("");
    //     });
    // } else {
    //   error({
    //     title: "Lỗi đánh giá",
    //     content: "Xin hãy đánh giá ít nhất 1 sao cho địa điểm.",
    //   });
    // }
  };

  const handleCreate = () => {
    console.log("clickd");
    // if (rate > 0) {
    //   axios
    //     .post(
    //       "/location/api/pois/createRating",
    //       {
    //         rate: rate,
    //         comment: comment,
    //         userId: localStorage.getItem("id"),
    //         poiId: poiId,
    //       },
    //       {
    //         headers: {
    //           Authorization: `Bearer ${localStorage.getItem("token")}`,
    //         },
    //       }
    //     )
    //     .then((res) => {
    //       setRatings(res.data);
    //       setRate(0);
    //     });
    // } else {
    //   error({
    //     title: "Lỗi đánh giá",
    //     content: "Xin hãy đánh giá ít nhất 1 sao cho địa điểm.",
    //   });
    // }
  };

  useEffect(() => {
    const getProduct = async () => {
      setLoading(true);
      setLoading2(true);

      const response = await fetch(
        `http://localhost:8080/api/products/get/${id}`
      );
      const data = await response.json();
      setProduct(data);
      console.log(data);
      setLoading(false);
      await axios
        .get(
          `http://localhost:8080/api/products/filter/category?category=${data.category.categoryId}&size=5`
        )
        .then((res) => {
          setSimilarProducts(res.data.content);
          console.log(similarProducts);
        });

      // const data2 = await response2.;
      // console.log(data2)
      // setSimilarProducts(data2);
      setLoading2(false);
    };
    const getRatings = async () => {
      await axios
        .get(`/api/products/get-reviews?id=${id}`)
        .then((res) => setRatings(res.data));
    };
    getProduct();
    getRatings();
  }, [id]);

  var avgRate = 0;
  var poiRatings = [];
  var userRating = [];
  if (ratings.length > 0) {
    avgRate =
      ratings.reduce((sum, cur) => sum + Number(cur.rate), 0) / ratings.length;
    ratings.forEach((rating) => {
      var formattedDate = new Date(rating.modified).toLocaleDateString("vi-VN");
      if (rating.userId != localStorage.getItem("id")) {
        poiRatings.push(
          <>
            <MDBRow className="border-top">
              <MDBCol size="auto" className="pe-0">
                <StarRatings
                  rating={rating.rate}
                  starDimension="1em"
                  starSpacing="0.1em"
                  starRatedColor="orange"
                />
              </MDBCol>
              <MDBCol size="auto" className="pt-1">
                <p>
                  {" "}
                  <strong>{rating.userName}</strong>
                </p>
              </MDBCol>
            </MDBRow>
            <MDBRow>
              <div>
                <p>{rating.comment}</p>
              </div>
            </MDBRow>
            <MDBRow className="border-bottom">
              <p>Thời gian bình luận: {formattedDate}</p>
            </MDBRow>
          </>
        );
      } else if (rating.userId == localStorage.getItem("id")) {
        userRating.push(
          <>
            <MDBRow className="border-top">
              <MDBCol size="auto" className="pe-0">
                <StarRatings
                  rating={rating.rate}
                  starDimension="1em"
                  starSpacing="0.1em"
                  starRatedColor="orange"
                />
              </MDBCol>
              <MDBCol size="auto" className="pt-1">
                <p>
                  {" "}
                  <strong>{rating.userName}</strong>
                </p>
              </MDBCol>
            </MDBRow>
            <MDBRow>
              <div>
                <p>{rating.comment}</p>
              </div>
            </MDBRow>
            <MDBRow className="border-bottom">
              <p>Thời gian bình luận: {formattedDate}</p>
            </MDBRow>
          </>
        );
      }
    });
  }

  var ratingInput;
  var commented;
  if (ratings.length > 0) {
    commented = ratings.some((rate) => {
      if (rate.userId == localStorage.getItem("id")) {
        return true;
      } else {
        return false;
      }
    });
  }

  if (commented) {
    ratingInput = (
      <MDBCol>
        <p className="fs-3 mb-1">Thay đổi đánh giá của bạn:</p>
        <StarRatings
          numberOfStars={5}
          changeRating={setRate}
          rating={rate}
          starDimension="1em"
          starSpacing="0.1em"
          starRatedColor="orange"
          starHoverColor="orange"
        />
        <TextArea
          showCount
          maxLength={500}
          className="mt-2"
          style={{ height: 120, resize: "none" }}
          placeholder="Chia sẻ trải nghiệm của bạn về nơi này"
          onChange={handleChange}
          value={comment}
          spellCheck="false"
        />

        <MDBBtn color="info" className="mt-2" onClick={handleEdit}>
          Sửa
        </MDBBtn>
      </MDBCol>
    );
  } else {
    ratingInput = (
      <MDBCol>
        <p className="fs-3 mb-1">Chia sẻ đánh giá của bạn:</p>
        <StarRatings
          numberOfStars={5}
          changeRating={setRate}
          rating={rate}
          starDimension="1em"
          starSpacing="0.1em"
          starRatedColor="orange"
          starHoverColor="orange"
        />
        <TextArea
          showCount
          maxLength={500}
          className="mt-2"
          style={{ height: 120, resize: "none" }}
          placeholder="Chia sẻ trải nghiệm của bạn về nơi này"
          onChange={handleChange}
          value={comment}
          spellCheck="false"
        />
        <button
          className="btn btn-outline-dark mt-2"
          onClick={() => handleCreate}
        >
          {" "}
          Gửi
        </button>
      </MDBCol>
    );
  }

  const Loading = () => {
    return (
      <>
        <MDBContainer className={styles.containterContent}>
          <div className="row">
            <div className="col-md-6 py-3">
              <Skeleton height={400} width={400} />
            </div>
            <div className="col-md-6 py-5">
              <Skeleton height={30} width={250} />
              <Skeleton height={90} />
              <Skeleton height={40} width={70} />
              <Skeleton height={50} width={110} />
              <Skeleton height={120} />
              <Skeleton height={40} width={110} inline={true} />
              <Skeleton className="mx-3" height={40} width={110} />
            </div>
          </div>
        </MDBContainer>
      </>
    );
  };

  const ShowProduct = () => {
    return (
      product && (
        <>
          <MDBContainer className={styles.containterContent}>
            <MDBRow>
              <MDBCol>
                <MDBCarousel showControls>
                  {product &&
                    product.listImg.map((item) => {
                      return (
                        <MDBCarouselItem
                          className="w-100 d-block"
                          itemId={item.id}
                          src={RELATIVE_URL_IMG_PRODUCT + item.url}
                          alt="..."
                          height={500}
                          width={200}
                        />
                      );
                    })}
                </MDBCarousel>
              </MDBCol>

              <MDBCol MDBCol>
                <h4 className="text-uppercase text-muted">
                  {product.category.categoryName}
                </h4>
                <h1 className="display-5">{product.name}</h1>
                {/* <p className="lead">
                {product.rating && product.rating.rate}{" "}
                <i className="fa fa-star"></i>
              </p> */}
                <MDBRow>
                  <MDBCol size="auto">
                    <p className={styles.text}>
                      {avgRate.toString().padEnd(3, ".0")}
                    </p>
                    <StarRatings
                      rating={avgRate}
                      starDimension="1em"
                      starSpacing="0.1em"
                      starRatedColor="orange"
                    />
                  </MDBCol>
                  <MDBCol size="auto" className="pt-md-1"></MDBCol>
                </MDBRow>
                <h3 className="display-6  my-4">{product.price}</h3>
                <p className="lead">{product.description}</p>
                <button
                  className="btn btn-outline-dark"
                  onClick={() => addProduct(product)}
                >
                  Add to Cart
                </button>
                <Link to="/cart" className="btn btn-dark mx-3">
                  Go to Cart
                </Link>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </>
      )
    );
  };

  const Loading2 = () => {
    return (
      <>
        <div className="">
          <div className="d-flex">
            <div className="mx-4">
              <Skeleton height={400} width={250} />
            </div>
            <div className="mx-4">
              <Skeleton height={400} width={250} />
            </div>
            <div className="mx-4">
              <Skeleton height={400} width={250} />
            </div>
            <div className="mx-4">
              <Skeleton height={400} width={250} />
            </div>
          </div>
        </div>
      </>
    );
  };

  const ShowSimilarProduct = () => {
    return (
      similarProducts && (
        <>
          <div className="">
            <div className="d-flex">
              {similarProducts.map((item) => {
                return (
                  <div key={item.id} className="card mx-4 text-center">
                    <img
                      className="card-img-top p-3"
                      src={RELATIVE_URL_IMG_PRODUCT + item.thumbnailUrl}
                      alt="Card"
                      height={300}
                      width={300}
                    />
                    <div className="card-body">
                      <h5 className="card-title">
                        {item.name.substring(0, 15)}...
                      </h5>
                    </div>
                    {/* <ul className="list-group list-group-flush">
                    <li className="list-group-item lead">${product.price}</li>
                  </ul> */}
                    <div className="card-body">
                      <Link
                        to={"/product/" + item.id}
                        className="btn btn-dark m-1"
                      >
                        Buy Now
                      </Link>
                      <button
                        className="btn btn-dark m-1"
                        onClick={() => addProduct(item)}
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )
    );
  };
  return (
    <>
      <Navbar />
      <MDBContainer className={styles.containterContent}>
        <MDBRow>{loading ? <Loading /> : <ShowProduct />}</MDBRow>
        <MDBRow>
          <MDBCol>
            <h2 className="">You may also Like</h2>
            <Marquee pauseOnHover={true} pauseOnClick={true} speed={50}>
              {loading2 ? <Loading2 /> : <ShowSimilarProduct />}
            </Marquee>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
      <MDBContainer className={styles.containterContent}>
        <MDBRow>
          <MDBCol>
            {ratingInput}
            <MDBRow className="mt-4">
              <p className="fs-4 fw-bold">Đánh giá của bạn:</p>
            </MDBRow>
            {userRating.length > 0 ? (
              userRating
            ) : (
              <p>Bạn vẫn chưa có đánh giá về địa điểm này.</p>
            )}
            <MDBRow className="mt-5">
              <p className="fs-4 fw-bold">Đánh giá của người dùng:</p>
            </MDBRow>
            {poiRatings.length > 0 ? (
              poiRatings
            ) : (
              <p>Địa điểm này vẫn chưa được mọi người đánh giá.</p>
            )}
          </MDBCol>
        </MDBRow>
      </MDBContainer>
      <Footer />
    </>
  );
};

export default Product;

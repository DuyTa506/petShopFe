import React from "react";
import ReactDOM from "react-dom";
import { useState, useRef, useMemo } from "react";
import SideBar from "../../components/Sidebar/index";
import sidebar_menu from "../../const/sidebar-menu";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Component } from "react";
import validator from "validator";
import axios from "../../api/axios";
import Dropdown from "react-bootstrap/Dropdown";

import Select from "react-select";
import { Modal } from "antd";
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBRow,
  MDBCol,
  MDBInput,
  MDBIcon,
  MDBTextArea,
} from "mdb-react-ui-kit";
import {
  faAngleRight,
  faCirclePlus,
  faClock,
  faClose,
  faCross,
  faDoorClosed,
  faDoorOpen,
  faMoneyBill,
  faPhone,
  faRulerHorizontal,
  faRulerVertical,
  faSquarePlus,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import style from "../css/AddUpdateProduct.module.css";
const { confirm } = Modal;
class POIAddUpdate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      poi: {},
      images: [],
      dataLoaded: false,
      brandDataLoaded: false,
      brands: [],
      selectedBrands: [],
      BrandChanged: false,
      categories: [],
      selectedCategories: [],
      CategoryChanged: false,
      newImages: [],
      deletedImages: [],
    };
  }
  componentDidMount() {
    const queryParams = new URLSearchParams(window.location.search);
    const id = queryParams.get("id");
    console.log(id);
    if (id > 0) document.title = "Chỉnh sửa";
    else document.title = "Thêm ";
    axios
      .get(`/api/brand`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        const data = res.data;
        this.setState({
          brands: data,
        });
      })
      .catch(function (error) {
        console.log(error);
        return Promise.reject(error);
      });
    axios
      .get(`/api/categories`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        const data = res.data;
        this.setState({
          categories: data,
        });
      })
      .catch(function (error) {
        console.log(error);
        return Promise.reject(error);
      });
    if (id > 0) {
      axios
        .get(`http://localhost:8080/api/products/get/` + id, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((res) => {
          const data = res.data;
          this.setState({
            poi: data,
          });
        })
        .catch(function (error) {
          console.log(error);
          return Promise.reject(error);
        });
      axios
        .get(`http://localhost:8080/api/products/get-images/` + id, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((res) => {
          const data = res.data;
          this.setState({
            images: data,
            dataLoaded: true,
          });
        })
        .catch(function (error) {
          console.log(error);
          return Promise.reject(error);
        });
    } else
      this.setState({
        dataLoaded: true,
      });
  }

  filterCategoryChanged = async (event) => {
    const filterDropdown = document.getElementById("filterCategoryDropdown");
    filterDropdown.innerHTML = event.currentTarget.name;
    filterDropdown.name = event.currentTarget.id;
  };

  filterBrandChanged = async (event) => {
    const filterDropdown = document.getElementById("filterBrandDropdown");
    filterDropdown.innerHTML = event.currentTarget.name;
    filterDropdown.name = event.currentTarget.id;
  };

  delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  updateClick = async (event) => {
    const queryParams = new URLSearchParams(window.location.search);
    var id = queryParams.get("id");
    var curDes = this.state.currentDestinations;
    var validated = true;
    if (
      document.getElementById("nameInput").value == null ||
      document.getElementById("nameInput").value == ""
    ) {
      validated = false;
      document.getElementById("errorMessage").innerHTML =
        "Hãy nhập tên của sản phẩm.";
    }
    if (
      document.getElementById("descInput").value == null ||
      document.getElementById("descInput").value == ""
    ) {
      validated = false;
      document.getElementById("errorMessage").innerHTML =
        "Hãy nhập mô tả của sản phẩm.";
    }
    if (
      document.getElementById("quantityInput").value == null ||
      document.getElementById("quantityInput").value == ""
    ) {
      validated = false;
      document.getElementById("errorMessage").innerHTML =
        "Hãy nhập số lượng sản phẩm.";
    }
    if (
      document.getElementById("priceInput").value == null ||
      document.getElementById("priceInput").value == ""
    ) {
      validated = false;
      document.getElementById("errorMessage").innerHTML =
        "Hãy nhập giá của sản phẩm.";
    }

    if (document.getElementById("filterCategoryDropdown").name == null) {
      validated = false;
      document.getElementById("errorMessage").innerHTML =
        "Hãy chọn loại sản phẩm";
    }
    if (document.getElementById("filterBrandDropdown").name == null) {
      validated = false;
      document.getElementById("errorMessage").innerHTML = "Hãy chọn nhãn hàng.";
    }
    // console.log(document.getElementById("nameInput").value);
    // console.log(document.getElementById("addressInput").value);
    // console.log(document.getElementById("descInput").value);
    // console.log(document.getElementById("durationInput").value);
    // console.log(document.getElementById("priceInput").value);
    // console.log(document.getElementById("closeInput").value);
    // console.log(document.getElementById("openInput").value);
    // console.log(document.getElementById("rateInput").value);
    // console.log(document.getElementById("latInput").value);
    // console.log(document.getElementById("lonInput").value);
    console.log(document.getElementById("filterCategoryDropdown").name);
    if (id > 0) {
      if (validated) {
        const loadingIcon = document.getElementById("loadingIcon");
        loadingIcon.style.display = "inline";
        await axios({
          method: "post",
          url: "http://localhost:8080/api/products/update",
          data: {
            id: id,
            name: document.getElementById("nameInput").value,
            description: document.getElementById("descInput").value,
            price: document.getElementById("priceInput").value,
            stock: document.getElementById("quantityInput").value,
            categoryId: document.getElementById("filterCategoryDropdown").name,
            brandId: document.getElementById("filterBrandDropdown").name,
          },
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        await this.state.deletedImages.forEach((entry, index) => {
          axios.post(
            `http://localhost:8080/api/products/deleteImg/` + entry,
            {},
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "multipart/form-data",
              },
            }
          );
        });
        await this.state.newImages.forEach((entry, index) => {
          const formData = new FormData();
          formData.append("File", entry);
          var desc = "*";
          axios
            .post(
              `http://localhost:8080/api/products/addImg/` + id + "/" + desc,
              formData,
              {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
                  "Content-Type": "multipart/form-data",
                },
              }
            )
            .then(function (response) {});
        });

        await this.delay(3000);
        window.location.href = "/dashboard/ProductList";
      }
    } else {
      if (validated) {
        console.log("af");
        const loadingIcon = document.getElementById("loadingIcon");
        loadingIcon.style.display = "inline";
        var images = this.state.newImages;
        console.log(images);
        await axios({
          method: "post",
          url: "http://localhost:8080/api/products/insert",
          data: {
            name: document.getElementById("nameInput").value,
            description: document.getElementById("descInput").value,
            price: document.getElementById("priceInput").value,
            categoryId: document.getElementById("filterCategoryDropdown").name,
            brandId: document.getElementById("filterBrandDropdown").name,
          },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        })
          .then(function (response) {
            id = response.data.id;
            images.forEach((entry, index) => {
              const formData = new FormData();
              formData.append("File", entry);
              var desc = "*";
              axios
                .post(
                  `http://localhost:8080/api/products/addImg/` +
                    id +
                    "/" +
                    desc,
                  formData,
                  {
                    headers: {
                      Authorization: `Bearer ${localStorage.getItem("token")}`,
                      "Content-Type": "multipart/form-data",
                    },
                  }
                )
                .then(function (response) {});
            });
          })
          .catch((err) => {
            console.log(err);
          });
        await this.delay(3000);
        window.location.href = "/dashboard/ProductList";
      }
    }
  };

  deleteImage = async (event) => {
    const imgId = event.currentTarget.id;
    confirm({
      title: "Bạn có chắc mình muốn xóa ảnh này không?",
      content: "Ảnh sẽ bị xóa",
      okText: "Có",
      okType: "danger",
      cancelText: "Không",
      onOk: async () => {
        var currentImg = this.state.images;
        var deleted = this.state.deletedImages;
        currentImg.forEach((entry, index) => {
          if (entry.imageId == imgId) {
            currentImg.splice(index, 1);
            deleted.push(imgId);
          }
          this.setState({
            images: currentImg,
            deletedImages: deleted,
          });
        });
      },
      onCancel() {},
    });
  };

  deleteNewImage = async (event) => {
    const imgId = event.currentTarget.id;
    confirm({
      title: "Bạn có chắc mình muốn xóa ảnh này không?",
      content: "Ảnh sẽ bị xóa",
      okText: "Có",
      okType: "danger",
      cancelText: "Không",
      onOk: async () => {
        var newImgs = this.state.newImages;
        newImgs.splice(imgId, 1);
        this.setState({
          newImages: newImgs,
        });
      },
      onCancel() {},
    });
  };

  setNewImages = async (event) => {
    if (document.getElementById("fileInput").files[0] != null) {
      const currentNewImgs = this.state.newImages;
      const files = document.getElementById("fileInput").files;
      const imgs = Array.from(files);
      var sizeValidator = false;
      imgs.forEach((entry, index) => {
        if (entry.size / 1024 > 10240) sizeValidator = true;
        else currentNewImgs.push(entry);
      });
      if (sizeValidator)
        alert(
          "Một hoặc nhiều ảnh nặng quá mức cho phép và đã không được thêm vào."
        );
      this.setState({
        newImages: currentNewImgs,
      });
      // console.log(files);
      // console.log(imgs);
      // console.log(this.state.newImages);
    }
  };

  render() {
    const handleClick = (e) => {
      document.getElementById("fileInput").click();
    };
    const queryParams = new URLSearchParams(window.location.search);
    const id = queryParams.get("id");
    const imageBox = [];
    const onTextAreaInput = (e) => {
      e.currentTarget.style.height = "5px";
      e.currentTarget.style.height = e.currentTarget.scrollHeight + "px";
    };
    //Add or Update elements
    const submitBtn = [];
    if (id > 0)
      submitBtn.push(
        <div className={style.btnBoxUpdate}>
          <img
            id="loadingIcon"
            style={{ display: "none" }}
            src="https://upload.wikimedia.org/wikipedia/commons/c/c7/Loading_2.gif?20170503175831"
            width="50"
          />
          <button className={style.updateBtn} onClick={this.updateClick}>
            Cập nhật thông tin
          </button>
        </div>
      );
    else
      submitBtn.push(
        <div className={style.btnBoxUpdate}>
          <img
            id="loadingIcon"
            style={{ display: "none" }}
            src="https://upload.wikimedia.org/wikipedia/commons/c/c7/Loading_2.gif?20170503175831"
            width="50"
          />
          <button className={style.updateBtn} onClick={this.updateClick}>
            Thêm sản phẩm
          </button>
        </div>
      );
    const navItem = [];
    if (id > 0) navItem.push(<b>Chỉnh sửa sản phẩm</b>);
    else navItem.push(<b>Thêm sản phẩm</b>);
    const headerText = [];
    if (id > 0)
      headerText.push(
        <h2 style={{ textAlign: "center" }}>Cập nhật sản phẩm</h2>
      );
    else
      headerText.push(<h2 style={{ textAlign: "center" }}>Thêm sản phẩm</h2>);
    const imageAddBtn = [];
    imageAddBtn.push(
      <MDBContainer>
        <MDBCard className={style.imageAddBox} onClick={handleClick}>
          <FontAwesomeIcon className={style.addIcon} icon={faCirclePlus} />
        </MDBCard>
        <MDBInput
          type="file"
          id="fileInput"
          accept=".jpg,.jpeg,.png"
          onChange={this.setNewImages}
          multiple
          hidden
        />
      </MDBContainer>
    );
    //Set initial content
    const selectDestination = [];
    if (this.state.dataLoaded) {
      selectDestination.push(
        <Select
          defaultValue={this.state.selectedDestinations}
          isMulti
          id="desSelect"
          onChange={async (value) => {
            const v = value;
            await this.setState({
              currentDestinations: v,
              destinationChanged: true,
            });
          }}
          options={this.state.destinations}
          className="basic-multi-select"
          classNamePrefix="select"
          placeholder="Chọn điểm đến"
        />
      );
      if (id > 0) {
        document.getElementById("nameInput").value = this.state.poi.name;
        document.getElementById("descInput").value = this.state.poi.description;
        document.getElementById("priceInput").value = this.state.poi.price;
        document.getElementById("quantityInput").value = this.state.poi.stock;

        const filterCategoryDropdown = document.getElementById(
          "filterCategoryDropdown"
        );
        filterCategoryDropdown.innerHTML = this.state.poi.category.categoryName;
        filterCategoryDropdown.name = this.state.poi.category.categoryId;

        const filterBrandDropdown = document.getElementById(
          "filterBrandDropdown"
        );
        filterBrandDropdown.innerHTML = this.state.poi.brand.brandName;
        filterBrandDropdown.name = this.state.poi.brand.brandId;
        //Change height of textboxes
        document.getElementById("nameInput").style.height =
          document.getElementById("nameInput").scrollHeight + "px";
        document.getElementById("descInput").style.height =
          document.getElementById("descInput").scrollHeight + "px";
        if (this.state.images.length > 0) {
          this.state.images.forEach((entry, index) => {
            let imgLink = entry.url;
            const imgArr = imgLink.split("/");
            if (imgArr[0] == "img") imgLink = "../" + imgLink;
            imageBox.push(
              <MDBCard className={style.imageBox}>
                <a href={imgLink} target="_blank">
                  <img
                    className={style.poiImage}
                    title={entry.description}
                    src={imgLink}
                  />
                </a>
                <div className={style.imageContent}>
                  {entry.description}
                  <br />
                  <a
                    className={style.deleteIcon}
                    id={entry.imageId}
                    onClick={this.deleteImage}
                  >
                    <FontAwesomeIcon icon={faClose} />
                  </a>
                </div>
              </MDBCard>
            );
          });
        }
      }
    }

    if (this.state.newImages.length > 0) {
      this.state.newImages.forEach((entry, index) => {
        let imgLink = URL.createObjectURL(entry);
        imageBox.push(
          <MDBCard className={style.imageBox}>
            <img
              className={style.poiImage}
              title={entry.description}
              src={imgLink}
            />
            <div className={style.imageContent}>
              {entry.description}
              <br />
              <a
                className={style.deleteIcon}
                id={index}
                onClick={this.deleteNewImage}
              >
                <FontAwesomeIcon icon={faClose} />
              </a>
            </div>
          </MDBCard>
        );
      });
    }
    const requiredStar = [];
    requiredStar.push(<b className={style.requiredStar}>*</b>);

    return (
      <div className="dashboard-container">
        <SideBar choose={3} menu={sidebar_menu} />
        <MDBContainer className={style.mainContainer}>
          <div className={style.nav}>
            <a className={style.navItem} href="./adminlist">
              <b>Quản lí Sản phẩm</b>
            </a>
            <FontAwesomeIcon className={style.arrowIcon} icon={faAngleRight} />
            {navItem}
          </div>
          {headerText}
          {submitBtn}
          <div id="errorMessage" className={style.errorMessage}></div>
          <label>
            <b>Tên</b>
            {requiredStar}
          </label>
          <MDBTextArea
            id="nameInput"
            type="text"
            maxLength="100"
            placeholder="Thêm tên cho sản phẩm"
            className={style.textInputs}
            onChange={onTextAreaInput}
            rows={1}
          />

          <label>
            <b>Mô tả sản phẩm</b>
            {requiredStar}
          </label>
          <MDBTextArea
            id="descInput"
            type="text"
            maxLength="4000"
            placeholder="Thêm mô tả"
            className={style.textInputs}
            onChange={onTextAreaInput}
            rows={7}
          />

          <MDBRow>
            <MDBCol>
              <label>
                <b>Nhãn hàng</b>
                {requiredStar}
              </label>
              <Dropdown>
                <Dropdown.Toggle variant="secondary">
                  <span id="filterBrandDropdown" name="brand">
                    {" "}
                    Chọn Nhãn hàng
                  </span>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {this.state.brands.map((item, index) => (
                    <Dropdown.Item
                      onClick={this.filterBrandChanged}
                      id={item.brandId}
                      name={item.brandName}
                    >
                      {item.brandName}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </MDBCol>
            <MDBCol>
              <label>
                <b>loại sản phẩm</b>
                {requiredStar}
              </label>
              <Dropdown>
                <Dropdown.Toggle variant="secondary">
                  <span id="filterCategoryDropdown" name="category">
                    {" "}
                    Chọn Loại sản phẩm
                  </span>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {this.state.categories.map((item, index) => (
                    <Dropdown.Item
                      onClick={this.filterCategoryChanged}
                      id={item.categoryId}
                      name={item.categoryName}
                    >
                      {item.categoryName}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </MDBCol>
          </MDBRow>
          <br></br>
          <MDBRow>
            <MDBCol>
              <label>
                <b>Số lượng</b>
                {requiredStar}
              </label>
              <div className="input-group mb-3">
                <span className="input-group-text">
                  <FontAwesomeIcon icon={faMoneyBill} />
                </span>
                <MDBInput
                  id="quantityInput"
                  type="text"
                  pattern="\d*"
                  maxLength="20"
                  placeholder="Thêm giá tiền"
                  className="form-control"
                />
              </div>
            </MDBCol>
            <MDBCol>
              <label>
                <b>Giá</b>
                {requiredStar}
              </label>
              <div className="input-group mb-3">
                <span className="input-group-text">
                  <FontAwesomeIcon icon={faMoneyBill} />
                </span>
                <MDBInput
                  id="priceInput"
                  type="text"
                  pattern="\d*"
                  maxLength="20"
                  placeholder="Thêm giá tiền"
                  className="form-control"
                />
                <span className="input-group-text">đồng</span>
              </div>
            </MDBCol>
          </MDBRow>

          <br />
          <br />
          <h3 style={{ textAlign: "center" }}>
            Ảnh sản phẩm
            <br />
          </h3>
          <div className={style.imageGroup}>
            {imageBox}
            <br />
            {imageAddBtn}
          </div>
        </MDBContainer>
        <div className="dashboard-body"></div>
      </div>
    );
  }
}
export default POIAddUpdate;

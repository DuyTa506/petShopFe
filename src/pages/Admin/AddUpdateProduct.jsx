import React from "react";
import ReactDOM from "react-dom";
import { useState, useRef, useMemo } from "react";
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
      newImages: [],
      deletedImages: [],
    };
  }
  componentDidMount() {
    const queryParams = new URLSearchParams(window.location.search);
    const id = queryParams.get("id");
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
    if (id > 0) {
      axios
        .get(
          `http://localhost:8080/location/api/pois/list/admin/update/` + id,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
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
        .get(
          `http://localhost:8080/location/api/pois/list/admin/update/images/` +
            id,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
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
  reloadImgs() {
    const queryParams = new URLSearchParams(window.location.search);
    const id = queryParams.get("id");

    if (id > 0) {
      axios
        .get(
          `http://localhost:8080/location/api/pois/list/admin/update/images/` +
            id,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
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
    }
  }

  filterChanged = async (event) => {
    const filterDropdown = document.getElementById("filterDropdown");
    filterDropdown.innerHTML = event.currentTarget.name;
    filterDropdown.name = event.currentTarget.id;
  };

  desChanged = async (event) => {
    var items = event.options;
    console.log(items);
    // this.setState({
    //   selectedDestinations: event.currentTarget
    // })
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
        "Hãy nhập tên của địa điểm.";
    }
    if (
      document.getElementById("addressInput").value == null ||
      document.getElementById("addressInput").value == ""
    ) {
      validated = false;
      document.getElementById("errorMessage").innerHTML =
        "Hãy nhập địa chỉ của địa điểm.";
    }
    if (
      document.getElementById("descInput").value == null ||
      document.getElementById("descInput").value == ""
    ) {
      validated = false;
      document.getElementById("errorMessage").innerHTML =
        "Hãy nhập mô tả của địa điểm.";
    }
    if (
      document.getElementById("durationInput").value == null ||
      document.getElementById("durationInput").value == ""
    ) {
      validated = false;
      document.getElementById("errorMessage").innerHTML =
        "Hãy nhập khoảng thời gian của địa điểm.";
    }
    if (
      document.getElementById("priceInput").value == null ||
      document.getElementById("priceInput").value == ""
    ) {
      validated = false;
      document.getElementById("errorMessage").innerHTML =
        "Hãy nhập giá trung bình của địa điểm.";
    }
    if (
      document.getElementById("closeInput").value == null ||
      document.getElementById("closeInput").value == ""
    ) {
      validated = false;
      document.getElementById("errorMessage").innerHTML =
        "Hãy nhập thời gian đóng cửa của địa điểm.";
    }
    if (
      document.getElementById("openInput").value == null ||
      document.getElementById("openInput").value == ""
    ) {
      validated = false;
      document.getElementById("errorMessage").innerHTML =
        "Hãy nhập thời gian mở cửa của địa điểm.";
    }
    if (
      document.getElementById("rateInput").value == null ||
      document.getElementById("rateInput").value == "" ||
      parseFloat(document.getElementById("rateInput").value) > 5
    ) {
      validated = false;
      document.getElementById("errorMessage").innerHTML =
        "Hãy nhập đánh giá của địa điểm(Trong khoảng từ 0 đến 5).";
    }
    if (
      document.getElementById("latInput").value == null ||
      document.getElementById("latInput").value == ""
    ) {
      validated = false;
      document.getElementById("errorMessage").innerHTML =
        "Hãy nhập vĩ độ của địa điểm.";
    }
    if (
      document.getElementById("lonInput").value == null ||
      document.getElementById("lonInput").value == ""
    ) {
      validated = false;
      document.getElementById("errorMessage").innerHTML =
        "Hãy nhập kinh độ của địa điểm.";
    }
    if (document.getElementById("filterDropdown").name == null) {
      validated = false;
      document.getElementById("errorMessage").innerHTML =
        "Hãy chọn danh mục của địa điểm.";
    }
    if (
      document.getElementById("emailInput").value != null &&
      !validator.isEmail(document.getElementById("emailInput").value)
    ) {
      validated = false;
      document.getElementById("errorMessage").innerHTML =
        "Hãy nhập đúng email.";
    }
    if (id != 0 && curDes == null && this.state.destinationChanged == true) {
      validated = false;
      document.getElementById("errorMessage").innerHTML =
        "Hãy chọn các điểm đến.";
    }
    if (id == 0 && curDes == null) {
      validated = false;
      document.getElementById("errorMessage").innerHTML =
        "Hãy chọn các điểm đến.";
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
    console.log(document.getElementById("filterDropdown").name);
    if (id > 0) {
      if (validated) {
        const loadingIcon = document.getElementById("loadingIcon");
        loadingIcon.style.display = "inline";
        var hms = document.getElementById("closeInput").value; // your input string
        var a = hms.split(":"); // split it at the colons
        var close = +a[0] * 60 * 60 + +a[1] * 60;
        var hms = document.getElementById("openInput").value; // your input string
        var a = hms.split(":"); // split it at the colons
        var open = +a[0] * 60 * 60 + +a[1] * 60;
        var dura = document.getElementById("durationInput").value * 60 * 60;
        await axios({
          method: "post",
          url: "http://localhost:8080/location/api/pois/update",
          data: {
            activityId: id,
            address: document.getElementById("addressInput").value,
            name: document.getElementById("nameInput").value,
            description: document.getElementById("descInput").value,
            additionalInfo: document.getElementById("infoInput").value,
            email: document.getElementById("emailInput").value,
            closingTime: close,
            openingTime: open,
            duration: dura,
            phoneNumber: document.getElementById("phoneInput").value,
            price: document.getElementById("priceInput").value,
            website: document.getElementById("webInput").value,
            categoryId: document.getElementById("filterDropdown").name,
            rating: document.getElementById("rateInput").value,
            lat: document.getElementById("latInput").value,
            lon: document.getElementById("lonInput").value,
          },
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        await this.state.deletedImages.forEach((entry, index) => {
          axios.post(
            `http://localhost:8080/location/api/pois/deleteImg/` + entry
          );
        });
        await this.state.newImages.forEach((entry, index) => {
          const formData = new FormData();
          formData.append("File", entry);
          var desc = "*";
          axios
            .post(
              `http://localhost:8080/location/api/pois/addImg/` +
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
        if (this.state.destinationChanged) {
          const desData = this.state.currentDestinations;
          await axios({
            method: "post",
            url:
              "http://localhost:8080/location/api/destination/poi/update/" + id,
            data: desData,
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              "Content-Type": "application/json",
            },
          });
        }

        await this.delay(3000);
        window.location.href = "../poi/adminlist";
      }
    } else {
      if (validated) {
        const loadingIcon = document.getElementById("loadingIcon");
        loadingIcon.style.display = "inline";
        var hms = document.getElementById("closeInput").value; // your input string
        var a = hms.split(":"); // split it at the colons
        var close = +a[0] * 60 * 60 + +a[1] * 60;
        var hms = document.getElementById("openInput").value; // your input string
        var a = hms.split(":"); // split it at the colons
        var open = +a[0] * 60 * 60 + +a[1] * 60;
        var dura = document.getElementById("durationInput").value * 60 * 60;
        var images = this.state.newImages;
        //console.log(images);
        await axios({
          method: "post",
          url: "http://localhost:8080/location/api/pois/add",
          data: {
            address: document.getElementById("addressInput").value,
            name: document.getElementById("nameInput").value,
            description: document.getElementById("descInput").value,
            additionalInfo: document.getElementById("infoInput").value,
            email: document.getElementById("emailInput").value,
            closingTime: close,
            openingTime: open,
            duration: dura,
            phoneNumber: document.getElementById("phoneInput").value,
            price: document.getElementById("priceInput").value,
            website: document.getElementById("webInput").value,
            categoryId: document.getElementById("filterDropdown").name,
            rating: document.getElementById("rateInput").value,
            lat: document.getElementById("latInput").value,
            lon: document.getElementById("lonInput").value,
          },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }).then(function (response) {
          id = response.data;
          images.forEach((entry, index) => {
            const formData = new FormData();
            formData.append("File", entry);
            var desc = "*";
            axios
              .post(
                `http://localhost:8080/location/api/pois/addImg/` +
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
          if (curDes != null) {
            const desData = curDes;
            axios({
              method: "post",
              url:
                "http://localhost:8080/location/api/destination/poi/update/" +
                id,
              data: desData,
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json",
              },
            });
          }
        });
        await this.delay(3000);
        window.location.href = "../poi/adminlist";
      }
    }
  };

  deleteImage = async (event) => {
    const imgId = event.currentTarget.id;
    confirm({
      title: "Bạn có chắc mình muốn xóa ảnh địa điểm này không?",
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
      title: "Bạn có chắc mình muốn xóa ảnh địa điểm này không?",
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
          <MDBBtn className={style.updateBtn} onClick={this.updateClick}>
            Cập nhật thông tin
          </MDBBtn>
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
          <MDBBtn className={style.updateBtn} onClick={this.updateClick}>
            Thêm địa điểm
          </MDBBtn>
        </div>
      );
    const navItem = [];
    if (id > 0) navItem.push(<b>Chỉnh sửa địa điểm</b>);
    else navItem.push(<b>Thêm địa điểm</b>);
    const headerText = [];
    if (id > 0)
      headerText.push(
        <h2 style={{ textAlign: "center" }}>Cập nhật Địa điểm</h2>
      );
    else
      headerText.push(<h2 style={{ textAlign: "center" }}>Thêm Địa điểm</h2>);
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
    if (this.state.dataLoaded && this.state.desDataLoaded) {
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
        document.getElementById("addressInput").value = this.state.poi.address;
        document.getElementById("descInput").value = this.state.poi.description;
        document.getElementById("infoInput").value =
          this.state.poi.additionalInfo;
        document.getElementById("webInput").value = this.state.poi.website;
        document.getElementById("phoneInput").value =
          this.state.poi.phoneNumber;
        document.getElementById("emailInput").value = this.state.poi.email;
        document.getElementById("priceInput").value = this.state.poi.price;
        document.getElementById("rateInput").value = this.state.poi.rating;
        document.getElementById("latInput").value = this.state.poi.lat;
        document.getElementById("lonInput").value = this.state.poi.lon;
        const duration = this.state.poi.duration / 60 / 60;
        document.getElementById("durationInput").value = duration;
        //Opening Time
        var sec_num = parseInt(this.state.poi.openingTime, 10);
        var hours = Math.floor(sec_num / 3600);
        var minutes = Math.floor((sec_num - hours * 3600) / 60);
        var seconds = sec_num - hours * 3600 - minutes * 60;

        if (hours < 10) {
          hours = "0" + hours;
        }
        if (minutes < 10) {
          minutes = "0" + minutes;
        }
        if (seconds < 10) {
          seconds = "0" + seconds;
        }
        var openTime = hours + ":" + minutes + ":" + seconds;
        document.getElementById("openInput").value = openTime;
        //Closing Time
        var sec_num = parseInt(this.state.poi.closingTime, 10);
        var hours = Math.floor(sec_num / 3600);
        var minutes = Math.floor((sec_num - hours * 3600) / 60);
        var seconds = sec_num - hours * 3600 - minutes * 60;

        if (hours < 10) {
          hours = "0" + hours;
        }
        if (minutes < 10) {
          minutes = "0" + minutes;
        }
        if (seconds < 10) {
          seconds = "0" + seconds;
        }
        var closeTime = hours + ":" + minutes + ":" + seconds;
        document.getElementById("closeInput").value = closeTime;

        const filterDropdown = document.getElementById("filterDropdown");
        filterDropdown.innerHTML = this.state.poi.categoryName;
        filterDropdown.name = this.state.poi.categoryId;
        //Change height of textboxes
        document.getElementById("nameInput").style.height =
          document.getElementById("nameInput").scrollHeight + "px";
        document.getElementById("descInput").style.height =
          document.getElementById("descInput").scrollHeight + "px";
        document.getElementById("addressInput").style.height =
          document.getElementById("addressInput").scrollHeight + "px";
        document.getElementById("infoInput").style.height =
          document.getElementById("infoInput").scrollHeight + "px";
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
      <MDBContainer className={style.mainContainer}>
        <div className={style.nav}>
          <a className={style.navItem} href="./adminlist">
            <b>Quản lí địa điểm</b>
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
          placeholder="Thêm tên cho địa điểm"
          className={style.textInputs}
          onChange={onTextAreaInput}
          rows={1}
        />
        <label>
          <b>Địa chỉ</b>
          {requiredStar}
        </label>
        <MDBTextArea
          id="addressInput"
          type="text"
          maxLength="300"
          placeholder="Thêm địa chỉ"
          className={style.textInputs}
          onChange={onTextAreaInput}
          rows={1}
        />
        <label>
          <b>Mô tả</b>
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
        <label>
          <b>Thông tin thêm</b>
        </label>
        <MDBTextArea
          id="infoInput"
          type="text"
          maxLength="1000"
          placeholder="Thêm thông tin"
          className={style.textInputs}
          onChange={onTextAreaInput}
          rows={1}
        />
        <label>
          <b>Trang web</b>
        </label>
        <MDBInput
          id="webInput"
          type="text"
          maxLength="500"
          placeholder="Thêm trang web"
          className={style.textInputs}
        />
        <MDBRow>
          <MDBCol md={4}>
            <label>
              <b>Điện thoại</b>
            </label>
            <div className="input-group mb-3">
              <span className="input-group-text">
                <FontAwesomeIcon icon={faPhone} />
              </span>
              <MDBInput
                id="phoneInput"
                type="tel"
                maxLength="20"
                placeholder="Thêm số điện thoại"
                className="form-control"
              />
            </div>
          </MDBCol>
          <MDBCol md={8}>
            <label>
              <b>Email</b>
            </label>
            <MDBInput
              id="emailInput"
              type="text"
              maxLength="100"
              placeholder="Thêm email liên lạc"
              className={style.textInputs}
            />
          </MDBCol>
        </MDBRow>
        <MDBRow>
          <MDBCol>
            <label>
              <b>Khoảng thời gian</b>
              {requiredStar}
            </label>
            <div className="input-group mb-3">
              <span className="input-group-text">
                <FontAwesomeIcon icon={faClock} />
              </span>
              <MDBInput
                id="durationInput"
                type="text"
                pattern="\d*"
                maxLength="2"
                placeholder="Thêm khoảng thời gian"
                className="form-control"
              />
              <span className="input-group-text">tiếng</span>
            </div>
          </MDBCol>
          <MDBCol>
            <label>
              <b>Giờ mở cửa</b>
              {requiredStar}
            </label>
            <div className="input-group mb-3">
              <span className="input-group-text">
                <FontAwesomeIcon icon={faDoorOpen} />
              </span>
              <MDBInput id="openInput" type="time" className="form-control" />
            </div>
          </MDBCol>
          <MDBCol>
            <label>
              <b>Giờ đóng cửa</b>
              {requiredStar}
            </label>
            <div className="input-group mb-3">
              <span className="input-group-text">
                <FontAwesomeIcon icon={faDoorClosed} />
              </span>
              <MDBInput id="closeInput" type="time" className="form-control" />
            </div>
          </MDBCol>
        </MDBRow>
        <MDBRow>
          <MDBCol>
            <label>
              <b>Giá trung bình</b>
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
          <MDBCol>
            <label>
              <b>Danh mục</b>
              {requiredStar}
            </label>
            <Dropdown>
              <Dropdown.Toggle variant="info">
                <span id="filterDropdown" name="category">
                  {" "}
                  Chọn Nhãn hàng
                </span>
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {this.state.brands.map((item, index) => (
                  <Dropdown.Item
                    onClick={this.filterChanged}
                    id={item.brandId}
                    name={item.brandName}
                  >
                    {item.brandName}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </MDBCol>
        </MDBRow>
        <MDBRow>
          <MDBCol md={4}>
            <label>
              <b>Vĩ độ</b>
              {requiredStar}
            </label>
            <div className="input-group mb-3">
              <span className="input-group-text">
                <FontAwesomeIcon icon={faRulerVertical} />
              </span>
              <MDBInput
                id="latInput"
                type="text"
                pattern="\d*"
                maxLength="30"
                placeholder="Thêm vĩ độ"
                className="form-control"
              />
            </div>
          </MDBCol>
          <MDBCol md={4}>
            <label>
              <b>Kinh độ</b>
              {requiredStar}
            </label>
            <div className="input-group mb-3">
              <span className="input-group-text">
                <FontAwesomeIcon icon={faRulerHorizontal} />
              </span>
              <MDBInput
                id="lonInput"
                type="text"
                pattern="\d*"
                maxLength="30"
                placeholder="Thêm kinh độ"
                className="form-control"
              />
            </div>
          </MDBCol>
        </MDBRow>
        <MDBRow>
          <label>
            <b>Thuộc điểm đến</b>
            {requiredStar}
          </label>
          {selectDestination}
        </MDBRow>
        <br />
        <br />
        <h3 style={{ textAlign: "center" }}>
          Ảnh Địa điểm
          <br />
        </h3>
        <div className={style.imageGroup}>
          {imageBox}
          <br />
          {imageAddBtn}
        </div>
      </MDBContainer>
    );
  }
}
export default POIAddUpdate;

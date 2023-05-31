import React, { useEffect, useState } from "react";
import SideBar from "../../components/Sidebar/index";
import sidebar_menu from "../../const/sidebar-menu";
import { MDBSelect } from "mdb-react-ui-kit";
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
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useParams, useNavigate } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
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
  faMailBulk,
} from "@fortawesome/free-solid-svg-icons";

import style from "../css/AddUpdateuUser.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "antd";
import axios from "../../api/axios";
const AddUpdateUser = () => {
  const [roles, setRoles] = useState();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const successToast = () =>
    toast.success("Thêm người dùng thành công!", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  const successEdit = () =>
    toast.success("Cập nhật thông tin thành công!", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  const navigate = useNavigate();

  const failToast = () =>
    toast.error("Tên đăng nhập đã tồn tại-", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      progress: undefined,
      theme: "light",
    });
  const getRoles = async () => {
    setLoading(true);
    await axios
      .get("/api/roles", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setRoles(res.data);
        console.log(roles);
      })
      .catch((err) => {
        console.log(err);
      });
    setLoading(false);
  };

  const getUser = async () => {
    if (id >= 1) {
      await axios
        .get("/api/customers/get-by-id?id=" + id, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((res) => {
          setUser(res.data);
          console.log(res.data);
        })
        .catch((err) => {
          if (err.data.status == 401 || err.data.status == 403) {
            localStorage.removeItem("token");
            localStorage.removeItem("role");
            localStorage.removeItem("id");
            navigate("/login");
          }

          console.log(err);
        });
    }
  };
  useEffect(() => {
    getRoles();
    getUser();
  }, []);
  const handleClick = (e) => {
    document.getElementById("fileInput").click();
  };
  const queryParams = new URLSearchParams(window.location.search);
  const { id } = useParams();
  console.log(id);
  const insertUser = (e) => {
    console.log(handleValidation());
    console.log(document.getElementById("name").value);

    let name = document.getElementById("name").value;
    let phone = document.getElementById("phone").value;
    let email = document.getElementById("email").value;
    let address = document.getElementById("address").value;
    let username = document.getElementById("username").value;
    let dateOfBirth = document.getElementById("dob").value;
    let gender = document.getElementById("gender").value;
    let role = document.getElementById("role").value;
    if (handleValidation()) {
      axios
        .post(
          "/api/customers/register",
          {
            name: name,
            phone: phone,
            email: email,
            address: address,
            userName: username,
            dateOfBirth: dateOfBirth,
            gender: gender,
            role: role,
            password: "12345678",
          },
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        )
        .then((res) => {
          console.log(res.data);
          successToast();
        })
        .catch((err) => {
          if (err.response.status == 404) {
            failToast();
          }
          console.log(err);
        });
    }
  };
  const updateUser = (e) => {
    console.log(handleValidation());
    console.log(document.getElementById("name").value);

    let name = document.getElementById("name").value;
    let phone = document.getElementById("phone").value;
    let email = document.getElementById("email").value;
    let address = document.getElementById("address").value;
    let username = document.getElementById("username").value;
    let dateOfBirth = document.getElementById("dob").value;
    let gender = document.getElementById("gender").value;
    let role = document.getElementById("role").value;
    if (handleValidation()) {
      axios
        .put(
          "/api/customers/edit",
          {
            name: name,
            phone: phone,
            email: email,
            address: address,
            userName: username,
            dateOfBirth: dateOfBirth,
            gender: gender,
            role: role,
            password: "12345678",
          },
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        )
        .then((res) => {
          console.log(res.data);
          successEdit();
        })
        .catch((err) => {
          if (err.response.status == 404) {
            failToast();
          }
          console.log(err);
        });
    }
  };

  const submitBtn = [];
  if (id > 0)
    submitBtn.push(
      <div className={style.btnBoxUpdate}>
        <button
          onClick={() => {
            updateUser();
          }}
          className={style.updateBtn}
        >
          Cập nhật thông tin
        </button>
      </div>
    );
  else
    submitBtn.push(
      <div className={style.btnBoxUpdate}>
        <button
          onClick={() => {
            insertUser();
          }}
          className={style.updateBtn}
        >
          Thêm
        </button>
      </div>
    );
  const handleSubmit = (event) => {
    if (id > 0) {
      console.log("update");
    } else {
      insertUser();
    }
    console.log("handleSubmit ran");
    event.preventDefault();
  };
  const navItem = [];
  if (id > 0) navItem.push(<b>Chỉnh sửa Người dùng</b>);
  else navItem.push(<b>Thêm người dùng</b>);
  const headerText = [];
  if (id > 0)
    headerText.push(<h2 style={{ textAlign: "center" }}>Cập nhật</h2>);
  else headerText.push(<h2 style={{ textAlign: "center" }}>Thêm</h2>);
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
        multiple
        hidden
      />
    </MDBContainer>
  );
  const onTextAreaInput = (e) => {
    e.currentTarget.style.height = "5px";
    e.currentTarget.style.height = e.currentTarget.scrollHeight + "px";
  };
  const pattern = /^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/;
  const handleValidation = () => {
    let formIsValid = true;
    console.log(document.getElementById("name").value);

    if (
      document.getElementById("name").value === "" ||
      document.getElementById("name").length < 3
    ) {
      formIsValid = false;
      document.getElementById("errName").style.display = "block";
    } else {
      document.getElementById("errName").style.display = "none";
    }
    if (
      document.getElementById("email").value === "" ||
      !document.getElementById("email").value.match(pattern)
    ) {
      formIsValid = false;
      document.getElementById("errEmail").style.display = "block";
    } else {
      document.getElementById("errEmail").style.display = "none";
    }
    // if (document.getElementById.password === "" || user.password.length < 8) {
    //   formIsValid = false;
    //   document.getElementById("errPwd").style.display = "block";
    // } else {
    //   document.getElementById("errPwd").style.display = "none";
    // }
    // if (!(user.confirmPassword === user.password)) {
    //   formIsValid = false;
    //   document.getElementById("errCfPwd").style.display = "block";
    // } else {
    //   document.getElementById("errCfPwd").style.display = "none";
    // }
    if (
      document.getElementById("username").value === "" ||
      document.getElementById("username").value.length < 3 ||
      document.getElementById("username").value.length > 16
    ) {
      formIsValid = false;
      document.getElementById("errUsername").style.display = "block";
    } else {
      document.getElementById("errUsername").style.display = "none";
    }
    return formIsValid;
  };

  const requiredStar = [];
  requiredStar.push(<b className={style.requiredStar}>*</b>);
  return (
    <>
      {loading && <div>Loading</div>}

      {!loading && (
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
          <div className="dashboard-container">
            <SideBar choose={4} menu={sidebar_menu} />

            <div className="dashboard-body">
              <MDBContainer className={style.mainContainer}>
                <div className={style.nav}>
                  <a className={style.navItem} href="/dashboard/userList">
                    <b>Quản lí người dùng</b>
                  </a>
                  <FontAwesomeIcon
                    className={style.arrowIcon}
                    icon={faAngleRight}
                  />
                  {navItem}
                </div>

                {submitBtn}

                <label>
                  <b>Tên người dùng</b>
                  {requiredStar}
                </label>
                <MDBTextArea
                  id="name"
                  type="text"
                  maxLength="200"
                  minLength="3"
                  defaultValue={user != null && user.name}
                  placeholder="Thêm địa chỉ"
                  className={style.textInputs}
                  onChange={onTextAreaInput}
                  rows={1}
                />
                <span style={{}} className={style.validation} id="errName">
                  Tên hiển thị phải dài 3-200 kí tự
                </span>
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
                        id="phone"
                        type="tel"
                        defaultValue={
                          user != null && user.phone != null ? user.phone : ""
                        }
                        maxLength="20"
                        placeholder="Thêm số điện thoại"
                        className="form-control"
                      />
                    </div>
                    <span
                      style={{ color: "red", display: "none" }}
                      className=""
                      id="errPhone"
                    >
                      Số điện thoại đủ 10 ký tự
                    </span>
                  </MDBCol>
                  <MDBCol md={8}>
                    <label>
                      <b>Email</b>
                    </label>

                    <MDBInput
                      id="email"
                      type="text"
                      maxLength="100"
                      defaultValue={
                        user != null && user.email != null ? user.email : ""
                      }
                      placeholder="Thêm email "
                      className={style.textInputs}
                    />
                    <span
                      style={{ color: "red", display: "none" }}
                      className={style.validation}
                      id="errEmail"
                    >
                      Hãy kiểm tra lại email của bạn
                    </span>
                  </MDBCol>
                </MDBRow>
                <MDBRow>
                  <MDBCol md={4}>
                    <label>
                      <b>Ngày sinh</b>
                    </label>

                    <MDBInput
                      id="dob"
                      type="date"
                      defaultValue={
                        user != null &&
                        user.dateOfBirth != null &&
                        user.dateOfBirth
                      }
                      placeholder=""
                      className="form-control"
                    />
                  </MDBCol>
                  <MDBCol md={4}>
                    <label>
                      <b>Giới tính</b>
                    </label>
                    <div className="form-outline">
                      {" "}
                      <select
                        id="gender"
                        className={
                          "select form-control " +
                          style.select +
                          " " +
                          style.textInputs
                        }
                      >
                        <option
                          selected={
                            user != null && user.gender == "MALE" ? true : false
                          }
                          value="MALE"
                        >
                          Nam
                        </option>
                        <option
                          selected={
                            user != null && user.gender == "FEMALE"
                              ? true
                              : false
                          }
                          value="FEMALE"
                        >
                          Nữ
                        </option>
                      </select>
                    </div>
                  </MDBCol>
                  <MDBCol md={4}>
                    <label>
                      <b>Role</b>
                    </label>
                    <div className="form-outline">
                      {" "}
                      <select
                        id="role"
                        className={"select form-control " + style.select}
                      >
                        {roles.map((r, i) => (
                          <option
                            selected={
                              user != null && user.role == r.name ? true : false
                            }
                            value={r.id}
                          >
                            {r.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </MDBCol>
                </MDBRow>
                <MDBRow>
                  <MDBCol md={4}>
                    <label>
                      <b>Tên đăng nhập</b>
                    </label>
                    <div className="input-group ">
                      <MDBInput
                        id="username"
                        type="text"
                        readOnly={id > 0 ? true : false}
                        minLength="6"
                        maxLength="20"
                        value={user != null && user.userName}
                        required
                        placeholder="Tên đăng nhập"
                        className={style.textInputs}
                      />
                    </div>
                    <span
                      style={{ color: "red", display: "none" }}
                      className={style.validation}
                      id="errUsername"
                    >
                      Tên đăng nhập phải dài 6-20 kí tự
                    </span>
                  </MDBCol>
                  <MDBCol md={8}>
                    <label>
                      <b>Địa chỉ</b>
                    </label>

                    <MDBInput
                      id="address"
                      defaultValue={
                        user != null ? user.address != null && user.address : ""
                      }
                      type="text"
                      maxLength="100"
                      placeholder="Thêm địa chỉ "
                      className={style.textInputs}
                    />
                  </MDBCol>
                </MDBRow>
              </MDBContainer>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default AddUpdateUser;

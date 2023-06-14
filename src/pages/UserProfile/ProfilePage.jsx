import React, { useEffect, useState, useLayoutEffect } from "react";
import {
  MDBCol,
  MDBContainer,
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBTabsPane,
  MDBRow,
  MDBBtn,
  MDBIcon,
} from "mdb-react-ui-kit";
import { MDBRadio } from "mdb-react-ui-kit";
import { Navbar, Footer } from "../../components";
import axios from "../../api/axios";
import ProfileCard from "./ProfileCard";
import style from "./Profile.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { message } from "antd";
function ProfilePage() {
  const [curUser, setCurUser] = useState();
  const [messageApi, contextHolder] = message.useMessage();
  const id = localStorage.getItem("id");
  const [email, setEmail] = useState();
  const [name, setName] = useState();
  const [phone, setPhone] = useState();
  const [gender, setGender] = useState();

  const [isEmailEditing, setIsEmailEditing] = useState(false);
  const [isNameEditing, setIsNameEditing] = useState(false);
  const [isPhoneEditing, setIsPhoneEditing] = useState(false);
  const successToast = () =>
    toast.success("Thay đổi thông tin thành công!", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  const failToast = () =>
    toast.error("Thay đổi thông tin thất bại!", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  useEffect(() => {
    async function getUserProfile() {
      const response = await axios.get("/api/customers/get-by-id?id=" + id, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log(response.data);
      setCurUser(response.data);
      setEmail(response.data.email);
      setPhone(response.data.phone);
      setName(response.data.name);
      setGender(response.data.gender);
    }

    document.title = "Profile ";
    getUserProfile();
  }, []);
  const save = () => {
    console.log(gender);
    axios
      .post(
        "/api/customers/edit-profile",
        {
          id: localStorage.getItem("id"),
          name: name,
          phone: phone,
          email: email,
          gender: gender,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        successToast();
        setIsEmailEditing(false);
        setIsNameEditing(false);
        setIsPhoneEditing(false);
      })
      .catch((err) => {
        failToast();
      });
  };
  return curUser ? (
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
      <MDBContainer className={style.containterContent}>
        <MDBRow>
          <h4> Hồ Sơ Của Tôi</h4>
          <span>Quản lý thông tin hồ sơ để bảo mật tài khoản</span>
        </MDBRow>
        <hr></hr>
        <MDBRow>
          <MDBCol md="4">
            <label>Tên đăng nhập:</label>
          </MDBCol>
          <MDBCol md="8">
            <span className={`${style.name} mt-3 mx-auto`}>
              {curUser.userName}
            </span>
          </MDBCol>
        </MDBRow>
        <MDBRow>
          <MDBCol md="4">
            <label>Email:</label>
          </MDBCol>
          <MDBCol md="8">
            {isEmailEditing ? (
              <>
                <input
                  autoFocus
                  onInput={(e) => setEmail(e.target.value)}
                  defaultValue={email}
                  className={`${style.editInput} mt-3`}
                  type="text"
                />
                <MDBBtn
                  tag="a"
                  color="none"
                  style={{
                    position: "absolute",
                    marginLeft: "5px",
                  }}
                  onClick={() => setIsEmailEditing(false)}
                >
                  <MDBIcon fas icon="save" size="lg" />
                </MDBBtn>
              </>
            ) : (
              <span className={`${style.name} mt-3 mx-auto`}>
                {email}
                <MDBBtn
                  tag="a"
                  color="none"
                  style={{
                    position: "absolute",
                    marginLeft: "5px",
                  }}
                  onClick={() => setIsEmailEditing(true)}
                >
                  <MDBIcon fas icon="pen" size="xs" style={{ color: "gray" }} />
                </MDBBtn>
              </span>
            )}
          </MDBCol>
        </MDBRow>
        <MDBRow>
          <MDBCol md="4">
            <label>Tên hiển thị:</label>
          </MDBCol>

          <MDBCol md="8">
            {isNameEditing ? (
              <>
                <input
                  autoFocus
                  onInput={(e) => setName(e.target.value)}
                  defaultValue={name}
                  className={`${style.editInput} mt-3`}
                  type="text"
                />
                <MDBBtn
                  tag="a"
                  color="none"
                  style={{
                    position: "absolute",
                    marginLeft: "5px",
                  }}
                  onClick={() => setIsNameEditing(false)}
                >
                  <MDBIcon fas icon="save" size="lg" />
                </MDBBtn>
              </>
            ) : (
              <span className={`${style.name} mt-3 mx-auto`}>
                {name}
                <MDBBtn
                  tag="a"
                  color="none"
                  style={{
                    position: "absolute",
                    marginLeft: "5px",
                  }}
                  onClick={() => setIsNameEditing(true)}
                >
                  <MDBIcon fas icon="pen" size="xs" style={{ color: "gray" }} />
                </MDBBtn>
              </span>
            )}
          </MDBCol>
        </MDBRow>
        <MDBRow>
          <MDBCol md="4">
            <label>Số điện thoại:</label>
          </MDBCol>
          <MDBCol md="8">
            {isPhoneEditing ? (
              <>
                <input
                  autoFocus
                  onInput={(e) => setPhone(e.target.value)}
                  defaultValue={phone}
                  className={`${style.editInput} mt-3`}
                  type="text"
                />
                <MDBBtn
                  tag="a"
                  color="none"
                  style={{
                    position: "absolute",
                    marginLeft: "5px",
                  }}
                  onClick={() => setIsPhoneEditing(false)}
                >
                  <MDBIcon fas icon="save" size="lg" />
                </MDBBtn>
              </>
            ) : (
              <span className={`${style.name} mt-3 mx-auto`}>
                {phone}
                <MDBBtn
                  tag="a"
                  color="none"
                  style={{
                    position: "absolute",
                    marginLeft: "5px",
                  }}
                  onClick={() => setIsPhoneEditing(true)}
                >
                  <MDBIcon fas icon="pen" size="xs" style={{ color: "gray" }} />
                </MDBBtn>
              </span>
            )}
          </MDBCol>
        </MDBRow>
        <MDBRow>
          <MDBCol md="4">
            <label>Tên đăng nhập:</label>
          </MDBCol>
          <MDBCol md="8">
            <MDBRow>
              <MDBCol md={2}>
                <MDBRadio
                  defaultChecked={curUser.gender == "MALE" ? true : false}
                  name="gender"
                  id="male"
                  value="option1"
                  label="Nam"
                  onChange={() => setGender("MALE")}
                  inline
                />
              </MDBCol>
              <MDBCol md={4}>
                <MDBRadio
                  defaultChecked={curUser.gender == "FEMALE" ? true : false}
                  name="gender"
                  id="female"
                  value="FEMALE"
                  label="Nữ"
                  inline
                  onChange={() => setGender("FEMALE")}
                />
              </MDBCol>
            </MDBRow>
          </MDBCol>
        </MDBRow>
        <MDBRow>
          <MDBCol md={4}>
            <label>Mật khẩu:</label>
          </MDBCol>
          <MDBCol md={8}>
            <a href="/ChangePassword">Đổi mật khẩu</a>
          </MDBCol>
        </MDBRow>
        <MDBRow>
          <MDBCol md={10}></MDBCol>
          <MDBCol md={2}>
            <button onClick={save} className={style.btnEdit}>
              Lưu
            </button>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
      <Footer></Footer>
    </>
  ) : null;
}

export default ProfilePage;

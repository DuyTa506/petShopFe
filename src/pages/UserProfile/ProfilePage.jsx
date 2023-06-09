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
import { Navbar } from "../../components";
import axios from "../../api/axios";
import ProfileCard from "./ProfileCard";
import style from "./Profile.module.css";
function ProfilePage() {
  const [curUser, setCurUser] = useState();

  const id = localStorage.getItem("id");
  const [email, setEmail] = [];
  const [isEmailEditing, setIsEmailEditing] = useState(false);
  const [isNameEditing, setIsNameEditing] = useState(false);
  const [isPhoneEditing, setIsFalseEditing] = useState(false);

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
    }

    document.title = "Profile ";
    getUserProfile();
  }, []);

  return curUser ? (
    <>
      <Navbar />
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
              <MDBBtn
                tag="a"
                color="none"
                style={{
                  position: "absolute",
                  marginLeft: "5px",
                }}
                // onClick={() => setIsEditing(true)}
              >
                <MDBIcon fas icon="pen" size="xs" style={{ color: "gray" }} />
              </MDBBtn>
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
                  defaultValue={curUser.email}
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
                  onClick={() => setIsEmailEditing(true)}
                >
                  <MDBIcon fas icon="save"  size="lg"/>
                </MDBBtn>
              </>
            ) : (
              <span className={`${style.name} mt-3 mx-auto`}>
                {curUser.email}
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
            <span className={`${style.name} mt-3 mx-auto`}>
              {curUser.name}
              <MDBBtn
                tag="a"
                color="none"
                style={{
                  position: "absolute",
                  marginLeft: "5px",
                }}
                // onClick={() => setIsEditing(true)}
              >
                <MDBIcon fas icon="pen" size="xs" style={{ color: "gray" }} />
              </MDBBtn>
            </span>
          </MDBCol>
        </MDBRow>
        <MDBRow>
          <MDBCol md="4">
            <label>Số điện thoại:</label>
          </MDBCol>
          <MDBCol md="8">
            <span className={`${style.name} mt-3 mx-auto`}>
              {curUser.phone}
              <MDBBtn
                tag="a"
                color="none"
                style={{
                  position: "absolute",
                  marginLeft: "5px",
                }}
                // onClick={() => setIsEditing(true)}
              >
                <MDBIcon fas icon="pen" size="xs" style={{ color: "gray" }} />
              </MDBBtn>
            </span>
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
                />
              </MDBCol>
            </MDBRow>
          </MDBCol>
        </MDBRow>
        <MDBRow>
          <MDBCol md={10}></MDBCol>
          <MDBCol md={2}>
            <button className={style.btnEdit}>Lưu</button>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </>
  ) : null;
}

export default ProfilePage;

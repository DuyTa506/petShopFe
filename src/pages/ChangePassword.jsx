import React from "react";
import { Footer, Navbar } from "../components";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";
import { addCart, delCart } from "../redux/action";
import { Link } from "react-router-dom";
import axios from "../api/axios";
import { message } from "antd";
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBContainer,
  MDBInput,
  MDBRow,
  MDBCol,
  MDBIcon,
} from "mdb-react-ui-kit";
import style from "./css/ChangePassword.module.css";
const ChangePassword = () => {
  const [errMsg, setErrMsg] = useState("");
  const [curUser, setCurUser] = useState();
  const [user, setUser] = useState({
    id: localStorage.getItem("id"),
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChangePwd = () => {
    console.log(user);
    if (
      user.oldPassword == null ||
      user.newPassword == null ||
      user.confirmPassword == null ||
      user.oldPassword === "" ||
      user.newPassword === "" ||
      user.confirmPassword === ""
    ) {
      setErrMsg("Hãy điền đủ các trường");
    } else if (user.newPassword != user.confirmPassword) {
      setErrMsg("Mật khẩu xác nhận không khớp");
    } else {
      axios
        .post("/api/customers/edit-password", user, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .catch((err) => {
          if (err.response.status == 400) {
            setErrMsg("Sai mật khẩu!");
          }
        })
        .then((response) => {
          if (response.status == 200) {
            message.success("Thay đổi mật khẩu thành công!");
            window.location.href = "http://localhost:3000/";
          }
        });
    }
  };

  useEffect(() => {
    async function getUserProfile() {
      const response = await axios.get(
        "/api/customers/get-by-id?id=" + user.id,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setCurUser(response.data);
    }

    document.title = "Change password | Tripplanner";
    getUserProfile();
  }, []);
  return (
    <>
      <Navbar />
      {curUser ? (
        <MDBContainer className={style.container}>
          <MDBCard alignment="center" style={{ marginTop: "50px" }}>
            <MDBCardBody>
              <MDBCardTitle className="my-4">Đổi mật khẩu</MDBCardTitle>
              <div
                className={` d-flex flex-column justify-content-center align-items-center`}
              >
                <div className={style.btn}>
                  <img
                    className={`${style.avatar}`}
                    src={
                      curUser.avatar
                        ? curUser.avatar
                        : "http://www.gravatar.com/avatar/?d=mp"
                    }
                  />
                </div>
                <h6>{curUser.name}</h6>
              </div>
              <p className="mt-4">
                Vui lòng nhập mật khẩu cũ và mật khẩu mới của bạn
              </p>
              <p id="invalidWarning" className="text-danger my-1 mx-5">
                {errMsg}
              </p>
              <form>
                <MDBInput
                  wrapperClass="my-4 mx-5"
                  type="password"
                  id="oldpwd"
                  required
                  label="Mật khẩu cũ"
                  onChange={(e) =>
                    setUser({ ...user, oldPassword: e.target.value })
                  }
                />

                <MDBInput
                  wrapperClass="mb-4 mx-5"
                  type="password"
                  id="newpwd"
                  required
                  label="Mật khẩu mới"
                  onChange={(e) =>
                    setUser({ ...user, newPassword: e.target.value })
                  }
                />
                <MDBInput
                  wrapperClass="mb-4 mx-5"
                  type="password"
                  required
                  id="confirmpwd"
                  label="Xác nhận mật khẩu mới"
                  onChange={(e) =>
                    setUser({ ...user, confirmPassword: e.target.value })
                  }
                />
                <button
                  className={"mb-4 " + style.editBtn}
                  style={{ fontSize: "14px" }}
                  type="button"
                  onClick={handleChangePwd}
                >
                  Đổi mật khẩu
                </button>
              </form>
            </MDBCardBody>
          </MDBCard>
        </MDBContainer>
      ) : null}
      ;<Footer></Footer>
    </>
  );
};
export default ChangePassword;

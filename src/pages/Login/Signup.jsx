import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
} from "mdb-react-ui-kit";
import axios from "../../api/axios";
import validator from "validator";
import { useState } from "react";
import style from "./Login.module.css";

const REGISTER_URL = "/api/customers/register";
const LOGIN_URL = "/api/customers/login";

function Signup() {
  const pattern = /^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/;
  const navigate = useNavigate();

  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleValidation = () => {
    let formIsValid = true;
    if (user.username === "" || user.username.length < 3) {
      formIsValid = false;
      document.getElementById("errUsername").style.display = "block";
    } else {
      document.getElementById("errUsername").style.display = "none";
    }
    if (user.email === "" || !user.email.match(pattern)) {
      formIsValid = false;
      document.getElementById("errEmail").style.display = "block";
    } else {
      document.getElementById("errEmail").style.display = "none";
    }
    if (user.password === "" || user.password.length < 8) {
      formIsValid = false;
      document.getElementById("errPwd").style.display = "block";
    } else {
      document.getElementById("errPwd").style.display = "none";
    }
    if (!(user.confirmPassword === user.password)) {
      formIsValid = false;
      document.getElementById("errCfPwd").style.display = "block";
    } else {
      document.getElementById("errCfPwd").style.display = "none";
    }

    return formIsValid;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (handleValidation()) {
      try {
        await axios
          .post(
            REGISTER_URL,
            {
              userName: user.username,
              email: user.email,
              password: user.password,
              role: 3,
              gender: "FEMALE",
            },
            {
              headers: { "Content-Type": "application/json" },
            }
          )
          .then((res) => {
            if (res.status == 200) {
              const response = axios
                .post(
                  LOGIN_URL,
                  {
                    username: user.userName,
                    password: user.password,
                  },
                  {
                    headers: { "Content-Type": "application/json" },
                  }
                )
                .then((resLogin) => {
                  const accessToken = resLogin?.data?.accessToken;
                  const role = resLogin?.data?.role;
                  const id = resLogin?.data?.id;
                  if (accessToken) {
                    localStorage.setItem("token", accessToken);
                    localStorage.setItem("role", role);
                    localStorage.setItem("id", id);
                  }
                  window.location.href = "http://localhost:3000/";
                });
            }
          });
      } catch (error) {
        if (error.response.status === 400) {
          document.getElementById("invalidWarning").style.display = "block";
        }
      }
    }
  };

  useEffect(() => {
    document.title = "Đăng ký ";
  }, []);

  return (
    <MDBContainer className="my-5 ">
      <MDBCard>
        <MDBRow className="g-0">
          <MDBCol md="6">
            <div className={`d-flex flex-column justify-content-center h-100`}>
              <img
                src="https://th.bing.com/th/id/R.9dda7f580c3d7b6eff8b6fb3fdf6d36c?rik=JaJT0KuTiVwqlw&pid=ImgRaw&r=0"
                className={`${style.customGradient}`}
              ></img>
            </div>
          </MDBCol>

          <MDBCol md="6">
            <MDBCardBody className="d-flex flex-column">
              <div className={style.pageTitle}>Đăng ký</div>
              <div className={style.registerInputDiv}>
                <MDBInput
                  wrapperClass="mt-4 mx-5"
                  label="Tên đăng nhập"
                  id="formUsername"
                  type="text"
                  size="lg"
                  maxLength={200}
                  onChange={(e) =>
                    setUser({ ...user, username: e.target.value })
                  }
                />
                <span
                  style={{ color: "red", display: "none" }}
                  className="mx-5"
                  id="errUsername"
                >
                  Tên hiển thị phải dài 3-200 kí tự
                </span>
              </div>
              <div className={style.registerInputDiv}>
                <MDBInput
                  wrapperClass="mt-4 mx-5"
                  label="Địa chỉ email"
                  id="formEmail"
                  type="email"
                  maxLength={500}
                  size="lg"
                  onChange={(e) => setUser({ ...user, email: e.target.value })}
                />
                <span
                  style={{ color: "red", display: "none" }}
                  className="mx-5"
                  id="errEmail"
                >
                  Hãy kiểm tra lại email của bạn
                </span>
              </div>
              <div className={style.registerInputDiv}>
                <MDBInput
                  wrapperClass="mt-4 mx-5"
                  label="Mật khẩu"
                  id="formPwd"
                  type="password"
                  size="lg"
                  maxLength={64}
                  onChange={(e) =>
                    setUser({ ...user, password: e.target.value })
                  }
                />
                <span
                  style={{ color: "red", display: "none" }}
                  className="mx-5"
                  id="errPwd"
                >
                  Mật khẩu phải dài 8-64 kí tự
                </span>
              </div>
              <div className={style.registerInputDiv}>
                <MDBInput
                  wrapperClass="mt-4 mx-5"
                  label="Xác nhận mật khẩu"
                  id="formPwdCf"
                  type="password"
                  maxLength={64}
                  size="lg"
                  onChange={(e) =>
                    setUser({ ...user, confirmPassword: e.target.value })
                  }
                />
                <span
                  style={{ color: "red", display: "none" }}
                  className="mx-5"
                  id="errCfPwd"
                >
                  Mật khẩu xác nhận không trùng với mật khẩu
                </span>
                <span
                  style={{ color: "red", display: "none" }}
                  className="mx-5"
                  id="invalidWarning"
                >
                  Email này đã được sử dụng
                </span>
              </div>
              <MDBBtn
                className={style.registerButton}
                color="dark"
                size="lg"
                type="button"
                onClick={handleRegister}
              >
                Đăng ký
              </MDBBtn>
              <p
                className="mt-5 mb-0 pb-lg-2 text-center"
                style={{ color: "#393f81" }}
              >
                Bạn đã có tài khoản? <Link to="/login">Đăng nhập tại đây</Link>
              </p>
            </MDBCardBody>
          </MDBCol>
        </MDBRow>
      </MDBCard>
    </MDBContainer>
  );
}

export default Signup;

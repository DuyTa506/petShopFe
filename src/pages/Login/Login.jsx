import React, { useEffect, useState, useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBRow,
  MDBCol,
  MDBInput,
} from "mdb-react-ui-kit";
import AuthContext from "../../context/AuthProvider";
import style from "./Login.module.css";
import useAuth from "../../hooks/useAuth";
import validator from "validator";
import axios from "../../api/axios";
import { Button } from "react-bootstrap";
const LOGIN_URL = "/api/customers/login";

function Login() {
  const setAuth = useAuth();
  const { authData, setAuthData } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";
  const [user, setUser] = useState({ username: "", password: "" });

  const handleLogin = (e) => {
    e.preventDefault();
    // if (!validator.isEmail(user.username) || user.password.length < 8)
    //   document.getElementById("invalidWarning").style.display = "block";
    // else
    axios
      .post(LOGIN_URL, user, {
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
      })
      .catch((error) => {
        console.log(user);
        console.log(error);
        // if (error.response.status == 404) {
        //   document.getElementById("invalidWarning").style.display = "block";
        // }
      })
      .then((response) => {
        const accessToken = response?.data?.accessToken;
        const role = response?.data?.role;
        const id = response?.data?.id;
        console.log(setAuth);
        console.log(accessToken);
        if (accessToken) {
          setAuth.setAuth({ user, role, accessToken });
          localStorage.setItem("token", accessToken);
          localStorage.setItem("role", role);
          localStorage.setItem("id", id);
          console.log("about to set trip");
          if (role != "Admin") {
            window.location.href = "http://localhost:3000/";
          } else {
            window.location.href = "http://localhost:3000/admin/dashboard";
          }
        }
        setUser({ ...user, username: "", password: "" });
      });
  };

  useEffect(() => {
    if (localStorage.getItem("token") != null) {
      navigate("/");
    }
    document.title = "Login | Tripplanner";
  }, []);

  return (
    <MDBContainer className="my-5 ">
      <MDBCard>
        <MDBRow className="g-0">
          <MDBCol md="6">
            <div className={`d-flex flex-column justify-content-center h-100`}>
              <img
                src="https://www.aspca.org/sites/default/files/general-pet-care_facebook.jpg"
                className={`${style.customGradient}`}
              ></img>
            </div>
          </MDBCol>

          <MDBCol md="6">
            <MDBCardBody className="d-flex flex-column">
              <h3 className="fw-normal my-4 pb-3 text-center">Đăng Nhập</h3>
              <div className={style.inputDiv}>
                <MDBInput
                  autoComplete="new-password"
                  wrapperClass="mb-4 mx-5"
                  label="Tên đăng nhập"
                  id="loginEmail"
                  type="email"
                  size="lg"
                  onChange={(e) =>
                    setUser({ ...user, username: e.target.value })
                  }
                />
              </div>
              <div className={style.inputDiv}>
                <MDBInput
                  wrapperClass="mb-2 mx-5"
                  label="Mật khẩu"
                  id="loginPwd"
                  type="password"
                  size="lg"
                  maxLength={64}
                  onChange={(e) =>
                    setUser({ ...user, password: e.target.value })
                  }
                />
              </div>
              <div className="d-flex justify-content-end">
                <a className="small text-muted mx-5" href="/forgot-password">
                  Quên mật khẩu?
                </a>
              </div>

              <p
                id="invalidWarning"
                className="text-danger my-1 mx-5"
                style={{ display: "none" }}
              >
                Sai email hoặc mật khẩu!
              </p>

              <Button
                className="mt-4 px-5 col-6 mx-auto mb-2"
                color="dark"
                size="lg"
                onClick={handleLogin}
              >
                Đăng nhập
              </Button>

              <p
                className="mb-0 pb-lg-2 text-center"
                style={{ color: "#393f81" }}
              >
                Bạn chưa có tài khoản? <Link to="/register">Đăng ký</Link>
              </p>
            </MDBCardBody>
          </MDBCol>
        </MDBRow>
      </MDBCard>
    </MDBContainer>
  );
}

export default Login;

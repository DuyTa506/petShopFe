import { MDBBtn, MDBContainer, MDBInput, MDBIcon } from "mdb-react-ui-kit";
import { React, useEffect, useState } from "react";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import style from "./Login.module.css";
import axios from "../../api/axios";

function ResetPasswordConfirm() {
  const [current, setCurrent] = useState(2);
  const [errMsg, setErrMsg] = useState();
  const [password, setPassword] = useState();
  const [cfPassword, setCfPassword] = useState();

  const queryParams = new URLSearchParams(window.location.search);
  const email = queryParams.get("email");
  const token = queryParams.get("token");

  const handlePasswordSubmit = () => {
    if (!password || !cfPassword) {
      setErrMsg("Please enter all field");
    } else if (password !== cfPassword) {
      setErrMsg("Password and confirm password doesn't match");
    } else {
      axios
        .post(
          "/user/api/user/password-reset",
          {
            email: email,
            resetToken: token,
            newPassword: password,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .catch((err) => {
          if (err.response.status === 404) {
            setErrMsg("Something went wrong");
          }
        })
        .then(() => {
          setCurrent(4);
        });
    }
  };

  useEffect(() => {
    document.title = "Reset password | Tripplanner";
  }, [current]);

  return (
    <MDBContainer
      className={`${style.customContainer} mt-4 item-align-center text-center`}
    >
      <Stepper activeStep={current} alternativeLabel>
        <Step key="Step 1">
          <StepLabel>Bước 1</StepLabel>
        </Step>
        <Step key="Step 2">
          <StepLabel>Bước 2</StepLabel>
        </Step>
        <Step key="Step 3">
          <StepLabel>Bước 3</StepLabel>
        </Step>
        <Step key="Step 4">
          <StepLabel>Bước 4</StepLabel>
        </Step>
      </Stepper>

      {current == 2 ? (
        <div>
          <MDBIcon
            style={{ margin: "100px auto 0px auto" }}
            fas
            icon="key"
            size="3x"
          />{" "}
          <h4>Đặt lại mật khẩu</h4>
          <p style={{ margin: "0px 10% " }}> Hãy nhập mật khẩu mới của bạn </p>
          <div style={{ margin: "0px 20% " }}>
            <p
              style={{ textAlign: "left", fontWeight: "bold" }}
              className="text-left mt-2 mx-5"
            >
              Mật khẩu mới
            </p>
            <MDBInput
              wrapperClass="mb-4 mx-5"
              id="pwd"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            ></MDBInput>
            <p
              style={{ textAlign: "left", fontWeight: "bold" }}
              className="text-left mt-2 mx-5"
            >
              Xác nhận mật khẩu
            </p>
            <MDBInput
              wrapperClass="mb-4 mx-5"
              id="cfPwd"
              type="password"
              onChange={(e) => setCfPassword(e.target.value)}
            ></MDBInput>
          </div>
          <p id="invalidWarning" className="text-danger my-1 mx-5">
            {errMsg}
          </p>
          <MDBBtn
            className="mt-4 px-5 mx-auto"
            color="dark"
            onClick={handlePasswordSubmit}
          >
            Đặt lại mật khẩu
          </MDBBtn>
        </div>
      ) : (
        <div>
          <MDBIcon
            style={{ margin: "100px auto 0px auto" }}
            fas
            icon="key"
            size="3x"
          />
          <h4>Hoàn thành!</h4>

          <p style={{ margin: "0px 10% " }}>
            {" "}
            Mật khẩu của bạn đã được đặt lại thành công!
          </p>
        </div>
      )}
    </MDBContainer>
  );
}

export default ResetPasswordConfirm;

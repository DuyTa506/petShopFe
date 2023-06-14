import axios from "../../api/axios";
import { MDBCard, MDBIcon, MDBBtn } from "mdb-react-ui-kit";
import { React, useRef, useState } from "react";
import style from "./Profile.module.css";
import { message } from "antd";
function ProfileCard(props) {
  console.log(props.user);
  const [curUsername, setUsername] = useState(props.user.userName);
  const [isEditing, setIsEditing] = useState(false);

  const toLongDate = (date) => {
    var today = new Date(date);
    return today.toLocaleDateString("en-IE");
  };

  const handleInput = (e) => {
    if (e.key === "Enter") {
      setIsEditing(false);
      console.log(curUsername);

      const newUser = {
        id: localStorage.getItem("id"),
        username: curUsername,
      };
      axios.post("/user/api/user/edit-username", newUser, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
    }
  };

  return (
    <MDBCard className={`${style.card} p-3`}>
      <div
        className={` d-flex flex-column justify-content-center align-items-center`}
      >
        <div className={style.btn}></div>
        {isEditing ? (
          <input
            autoFocus
            onInput={(e) => setUsername(e.target.value)}
            onKeyDown={handleInput}
            defaultValue={curUsername}
            className={`${style.editInput} mt-3`}
            type="text"
          />
        ) : (
          <span className={`${style.name} mt-3 mx-auto`}>
            {curUsername}
            <MDBBtn
              tag="a"
              color="none"
              style={{
                position: "absolute",
                marginLeft: "5px",
              }}
              onClick={() => setIsEditing(true)}
            >
              <MDBIcon fas icon="pen" size="xs" style={{ color: "gray" }} />
            </MDBBtn>
          </span>
        )}

        <span className={style.email}>{props.user.email}</span>
        <div className={`px-2 rounded mt-4 ${style.date}`}>
          <span className={style.join}>
            Đã tham gia {toLongDate(props.user.createdDate.split("T")[0])}
          </span>
        </div>
      </div>
    </MDBCard>
  );
}

export default ProfileCard;

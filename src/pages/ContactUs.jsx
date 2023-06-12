import { Navbar, Footer } from "../components";
import { MessageList, MessageBox, Button, Avatar } from "react-chat-elements";
import "react-chat-elements/dist/main.css";
import { Input } from "react-chat-elements";
import { useState, useRef } from "react";
import { useEffect } from "react";
import axios from "../api/axios";
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
import style from "./css/ContactUs.module.css";
const ContactUs = () => {
  const NAME = "PetShop";
  const inputElement = useRef();
  const [chat, setChat] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  useEffect(() => {
    setChat((chat) => [
      ...chat,
      {
        position: "left",
        type: "text",
        title: NAME,
        text: "Xin chào! Chúng tôi có thể giúp gì cho bạn",
      },
    ]);

    console.log(inputElement.current.value);
  }, []);
  useEffect(() => {
    console.log(inputMessage);
    sendMess();
  }, [inputMessage]);
  const sendMess = async () => {
    await axios
      .post(
        "/api/chat/send",
        JSON.stringify({
          sender: localStorage.getItem("id"),
          message: inputMessage,
        }),
        {
          timeout: 5000,
          headers: {
            "Content-Type": "application/json",
            accept: "application/json", // If you receieve JSON response.
          },
        }
      )
      .then((res) => {
        console.log(res);
        if (res.data.length != 0) {
          setChat([
            ...chat,
            {
              position: "left",
              type: "text",
              title: NAME,
              text: res.data[0].text,
            },
          ]);
        } else {
          setChat([
            ...chat,
            {
              position: "left",
              type: "text",
              title: NAME,
              text: "Xin lỗi tôi không hiểu câu hỏi của bạn",
            },
          ]);
        }
      })
      .catch((error) => console.error(error));
  };

  const send = async () => {
    if (inputElement.current.value === "") {
      alert("Hãy nhập tin nhắn");
    } else {
      setInputMessage(inputElement.current.value);
      await setChat([
        ...chat,
        {
          position: "right",
          type: "text",
          title: "Thượng đế",
          text: inputElement.current.value,
        },
      ]);
      inputElement.current.value = "";
    }
  };
  return (
    <>
      <Navbar />
      <MDBContainer>
        <div className={style.mainContainer}>
          <div className={style.nav}>
            <Avatar
              src="https://avatars.githubusercontent.com/u/80540635?v=4"
              alt="avatar"
              size="xlarge"
              type="rounded"
            />
          </div>
          <div className={style.message}>
            <MessageList
              className="message-list"
              lockable={true}
              toBottomHeight={"100%"}
              dataSource={chat}
            />
          </div>
          <div className={style.input}>
            <input
              id="input"
              ref={inputElement}
              className={style.inputText}
              placeholder="Type here..."
            />
            <Button
              className={style.inputBtn}
              text={"Send"}
              onClick={() => send()}
              title="Send"
            />
          </div>
          ;
        </div>
      </MDBContainer>

      <Footer />
    </>
  );
};
export default ContactUs;

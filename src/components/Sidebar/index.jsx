import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import SideBarItem from "./sidebar-item";
import { BASE_URL } from "../../const/constant";
import "./styles.css";

function SideBar(props) {
  const location = useLocation();

  const [active, setActive] = useState(1);

  useEffect(() => {
    props.menu.forEach((element) => {
      if (location.pathname === element.path) {
        setActive(element.id);
      }
    });
  }, [location.pathname]);

  const __navigate = (id) => {
    setActive(id);
  };

  return (
    <nav className="sidebar">
      <div className="sidebar-container">
        <div className="sidebar-logo-container">
          <img src={BASE_URL + "img/logo.png"} alt="logo" />
        </div>

        <div className="sidebar-container">
          <div className="sidebar-items">
            {props.menu.map((item, index) => (
              <div key={index} onClick={() => __navigate(item.id)}>
                {console.log(props.choose)}
                <SideBarItem active={props.choose == item.id} item={item} />
              </div>
            ))}
          </div>

          <div className="sidebar-footer">
            <span className="sidebar-item-label">Logout</span>
            <img
              src={BASE_URL + "assets/icons/logout.svg"}
              alt="icon-logout"
              className="sidebar-item-icon"
            />
          </div>
        </div>
      </div>
    </nav>
  );
}

export default SideBar;

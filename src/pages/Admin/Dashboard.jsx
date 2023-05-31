import SideBar from "../../components/Sidebar/index";
import sidebar_menu from "../../const/sidebar-menu";
import React, { useEffect, useState } from "react";
const Dashboard = () => {
  return (
    <>
      <div className="dashboard-container">
        <SideBar choose={1} menu={sidebar_menu} />

        <div className="dashboard-body"></div>
      </div>
    </>
  );
};
export default Dashboard;

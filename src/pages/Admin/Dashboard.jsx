import SideBar from "../../components/Sidebar/index";
import sidebar_menu from "../../const/sidebar-menu";
import React, { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import * as htmlToImage from "html-to-image";
import { toPng, toJpeg, toBlob, toPixelData, toSvg, to } from "html-to-image";
import { jsPDF } from "jspdf";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
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
import {
  faTrash,
  faEye,
  faEyeSlash,
  faLocationDot,
  faSort,
  faSortUp,
  faSortDown,
  faUsers,
  faPlaceOfWorship,
  faBook,
  faPenToSquare,
  faPlaneDeparture,
  faStar,
  faShirt,
  faCartShopping,
  faMoneyCheckDollar,
} from "@fortawesome/free-solid-svg-icons";
import axios from "../../api/axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import style from "../css/Dashboard.module.css";
import $ from "jquery";
const Dashboard = () => {
  ChartJS.register(ArcElement, Tooltip, Legend);
  const [stat, setStat] = useState(null);
  const [pieBrand, setPieBrand] = useState(null);
  const [pieCat, setPieCat] = useState(null);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  const options = {
    plugins: {
      title: {
        display: true,
        text: "Doanh thu theo nhãn hàng",
      },
      legend: {
        position: "right",
        labels: {
          usePointStyle: true,
          pointStyle: "circle",
        },
      },
    },
  };
  const componentRef = useRef();
  useEffect(() => {
    axios
      .get("/api/orders/dashboard", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        //Storing users detail in state array object
        console.log(res.data.brand);
        setPieBrand(res.data.brand);
        setPieCat(res.data.category);
        setStat(res.data);
      });
  }, []);
  const data = {
    labels: ["Food", "Clothes", "Tools"],
    datasets: [
      {
        label: "# of Votes",
        data: [12, 19, 3],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
        ],

        borderWidth: 1,
      },
    ],
  };

  const data2 = {
    labels: ["Food", "Clothes", "Tools"],
    datasets: [
      {
        label: "# of Votes",
        data: [12, 19, 3],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    stat != null && (
      <>
        <div className="dashboard-container">
          <SideBar choose={1} menu={sidebar_menu} />

          <div className="dashboard-body">
            <button onClick={handlePrint} className={style.btn}>
              Xuất file PDF
            </button>
            <MDBContainer id="export" ref={componentRef}>
              <MDBRow className={style.statContainer}>
                <MDBCol md={3} className={style.containterCard}>
                  <div className={style.statCard + " " + style.countItem}>
                    <MDBRow>
                      <MDBCol md={3}>
                        <span className={style.countItemIconBox1}>
                          <FontAwesomeIcon
                            icon={faUsers}
                            className={style.countItemIcon}
                          />
                        </span>
                      </MDBCol>
                      <MDBCol>
                        <br></br>
                        <span> Người dùng</span>
                        <br />
                        <h5 className={style.countItemText1}>
                          {stat.numberOfCustomers}
                        </h5>
                      </MDBCol>
                    </MDBRow>
                  </div>
                </MDBCol>
                <MDBCol md={3} className={style.containterCard}>
                  <div className={style.statCard + " " + style.countItem}>
                    <MDBRow>
                      <MDBCol md={3}>
                        <span className={style.countItemIconBox2}>
                          <FontAwesomeIcon
                            icon={faCartShopping}
                            className={style.countItemIcon}
                          />
                        </span>
                      </MDBCol>
                      <MDBCol>
                        <br></br>
                        <span> Đơn hàng</span>
                        <br />
                        <h5 className={style.countItemText2}>
                          {stat.numberOfOrders}
                        </h5>
                      </MDBCol>
                    </MDBRow>
                  </div>
                </MDBCol>
                <MDBCol md={3} className={style.containterCard}>
                  <div className={style.statCard + " " + style.countItem}>
                    <MDBRow>
                      <MDBCol md={3}>
                        <span className={style.countItemIconBox3}>
                          <FontAwesomeIcon
                            icon={faShirt}
                            className={style.countItemIcon}
                          />
                        </span>
                      </MDBCol>
                      <MDBCol>
                        <br></br>
                        <span> Sản phẩm đã bán</span>
                        <br />
                        <h5 className={style.countItemText3}>
                          {stat.numberOfSoldProducts}
                        </h5>
                      </MDBCol>
                    </MDBRow>
                  </div>
                </MDBCol>
                <MDBCol md={3} className={style.containterCard}>
                  <div className={style.statCard + " " + style.countItem}>
                    <MDBRow>
                      <MDBCol md={3}>
                        <span className={style.countItemIconBox4}>
                          <FontAwesomeIcon
                            icon={faMoneyCheckDollar}
                            className={style.countItemIcon}
                          />
                        </span>
                      </MDBCol>
                      <MDBCol>
                        <br></br>
                        <span>Doanh thu</span>
                        <br />
                        <h5 className={style.countItemText4}>
                          {stat.revenue} VND
                        </h5>
                      </MDBCol>
                    </MDBRow>
                  </div>
                </MDBCol>
              </MDBRow>
              <MDBRow className={style.statContainer}>
                <MDBCol md={6} className={style.containterPie}>
                  <div className={style.pieCard}>
                    <h5 className={style.titlePie}>
                      Doanh thu theo nhãn hàng{" "}
                    </h5>
                    <Pie
                      options={options}
                      className={style.pie}
                      data={pieBrand}
                    />
                  </div>
                </MDBCol>
                <MDBCol md={6} className={style.containterPie}>
                  <div className={style.pieCard}>
                    <h5 className={style.titlePie}>
                      Doanh thu theo loại sản phẩm
                    </h5>
                    <Pie
                      options={options}
                      className={style.pie}
                      data={pieCat}
                    />
                    ;
                  </div>
                </MDBCol>
              </MDBRow>
            </MDBContainer>
          </div>
        </div>
      </>
    )
  );
};
export default Dashboard;

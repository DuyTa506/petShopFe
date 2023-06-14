import SideBar from "../../components/Sidebar/index";
import sidebar_menu from "../../const/sidebar-menu";
import "jquery/dist/jquery.min.js";
import React, { useEffect, useState } from "react";
import axios from "../../api/axios";
//Datatable Modules
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleRight,
  faCirclePlus,
  faPhone,
  faEdit,
  faRemove,
  faPenToSquare,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBRow,
  MDBCol,
  MDBInput,
  MDBIcon,
  MDBTextArea,
} from "mdb-react-ui-kit";
import style from "../css/BrandList.module.css";
import $ from "jquery";
const CategoryList = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get("/api/categories/all", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        //Storing users detail in state array object
        console.log(res.data[0].role);
        setData(res.data);
      });
    //initialize datatable
    $(document).ready(function () {
      setTimeout(function () {
        $("#example").DataTable();
      }, 1000);
    });
  }, []);
  const deleteBrand = (id) => {
    console.log(id);
  };
  return (
    <>
      <div className={"dashboard-container "}>
        <SideBar choose={5} menu={sidebar_menu} />

        <div className={"dashboard-body " + style.dbBody}>
          <MDBContainer className={style.mainContainer}>
            <div className={style.nav}>
              <a className={style.navItem} href="/dashboard/userList">
                <b>Quản lí loại sản phẩm</b>
              </a>
            </div>
            <br></br>
          </MDBContainer>
          <div className="MainDiv">
            <div className="container">
              <table id="example" class="table table-hover table-bordered">
                <thead>
                  <tr className={style.tableDataGrey}>
                    <th>ID</th>
                    <th>Tên</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((result) => {
                    return (
                      <tr className={style.tableData}>
                        <td className={style.tableDate}>{result.categoryId}</td>
                        <td className={style.tableDate}>
                          {result.categoryName}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default CategoryList;

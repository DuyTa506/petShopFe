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
import {
  faAngleRight,
  faCirclePlus,
  faPhone,
  faEdit,
  faRemove,
  faPenToSquare,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import style from "../css/UserList.module.css";
import $ from "jquery";
const ProductList = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get("/api/products/getAll", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        //Storing users detail in state array object

        setData(res.data);
      });
    //initialize datatable
    $(document).ready(function () {
      setTimeout(function () {
        $("#example").DataTable();
      }, 1000);
    });
  }, []);

  const deleteUser = (id) => {};

  return (
    <>
      <div className="dashboard-container">
        <SideBar choose={3} menu={sidebar_menu} />

        <div className={"dashboard-body " + style.dbBody}>
          <MDBContainer className={style.mainContainer}>
            <div className={style.nav}>
              <a className={style.navItem} href="/dashboard/userList">
                <b>Quản lí sản phẩm</b>
              </a>
            </div>
            <br></br>
          </MDBContainer>
          <div className="MainDiv">
            <div className="container">
              <table id="example" class="table table-hover table-bordered">
                <thead>
                  <tr className={style.tableData}>
                    <th>ID</th>
                    <th>Tên</th>
                    <th>Mô tả</th>
                    <th>Giá</th>
                    <th>Tồn kho</th>
                    <th>Link Ảnh</th>
                    <th>Loại sản phẩm</th>
                    <th>Nhãn hàng</th>
                    <th>Is Deleted</th>
                    <th>Thao tác</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((result) => {
                    return (
                      <tr className={style.tableData}>
                        <td>{result.id}</td>
                        <td className={style.tableDate}>{result.name}</td>
                        <td className={style.tableDate}>
                          {result.description}
                        </td>
                        <td>{result.price}</td>
                        <td>{result.stock}</td>
                        <td>{result.thumbnailUrl}</td>
                        <td className={style.tableDate}>
                          {" "}
                          {result.category.categoryName}
                        </td>
                        <td className={style.tableDate}>
                          {result.brand.brandName}
                        </td>

                        <td>{result.deleted.toString()}</td>
                        <td>
                          <a
                            className={style.tableIcons}
                            href={"/dashboard/ModifyProduct?id=" + result.id}
                          >
                            <FontAwesomeIcon icon={faPenToSquare} />
                          </a>
                          {/* {hideBtn} */}
                          <a
                            className={style.tableIcons}
                            id={result.brandId}
                            onClick={() => deleteUser(result.brandId)}
                          >
                            <FontAwesomeIcon icon={faTrash} />
                          </a>
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
export default ProductList;

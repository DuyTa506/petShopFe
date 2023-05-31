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
const UserList = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get("/api/customers/getAll", {
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

  const deleteUser = (id) => {};

  return (
    <>
      <div className="dashboard-container">
        <SideBar choose={4} menu={sidebar_menu} />

        <div className={"dashboard-body " + style.dbBody}>
          <MDBContainer className={style.mainContainer}>
            <div className={style.nav}>
              <a className={style.navItem} href="/dashboard/userList">
                <b>Quản lí người dùng</b>
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
                    <th>Email</th>
                    <th>Username</th>
                    <th>Name</th>
                    <th>Date of birth</th>
                    <th>Address</th>
                    <th>Gender</th>
                    <th>Phone</th>
                    <th>Role</th>
                    <th>Is Deleted</th>
                    <th>Edit</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((result) => {
                    return (
                      <tr className={style.tableData}>
                        <td>{result.id}</td>
                        <td className={style.tableDate}>{result.email}</td>
                        <td className={style.tableDate}>{result.userName}</td>
                        <td className={style.tableDate}>{result.name}</td>
                        <td className={style.tableDate}>
                          {result.dateOfBirth}
                        </td>
                        <td>{result.address}</td>
                        <td>{result.gender}</td>
                        <td className={style.tableDate}>{result.phone}</td>
                        <td>{result.role}</td>
                        <td>{result.deleted.toString()}</td>
                        <td>
                          <a
                            className={style.tableIcons}
                            href={"/dashboard/ModifyUser/" + result.id}
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
export default UserList;

import React, { Component } from "react";
import Breadcrumb from "../../components/BreadCrumb/Breadcrumb";
import { Link, withRouter } from "react-router-dom/cjs/react-router-dom.min";
import Modal from "react-bootstrap/Modal";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import { ToastContainer, toast } from "react-toastify";
import config from "../../config/config";
import "../../assets/Css/Style.css";
import Pagination from "react-js-pagination";
import Dropdown from "react-bootstrap/Dropdown";
import Tabimg from "../../assets/images/tabimg.png";
import Tabimg1 from "../../assets/images/tabimg1.png";
import Tabimg2 from "../../assets/images/tabimg2.png";
import Tabimg3 from "../../assets/images/tabimg3.png";
import Tabimg4 from "../../assets/images/tabimg4.png";
import userPic from "../../assets/images/user.jpeg";

class AllUsersContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deleteModel: false,
      updateModel: false,
      blockStatus: "",
      totalUser: "",
      user_Id: "",
      flag: "",
      flag_reason: "",
      status: "",
      page: 1,
      limit: 10,
      activePage: 10,
      userLists: [],
      email: "",
    };
  }

  getUserList = () => {
    const apiUrl = `${config.Url}user/getAllUserList`;
    const token = localStorage.getItem("token");

    fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 200) {
          console.log("Data received:", data);
          this.setState({ userLists: data.data });
          this.setState({ totalUser: data.total });
        } else {
          console.error("Error fetching user data");
        }
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  };

  componentDidMount() {
    this.getUserList();
  }
  userDetal(user_id) {
    console.log("user_id----->", user_id);
    localStorage.setItem("userId", user_id);
    // const { history } = this.props;
    // history.push('/Users/AllUsersView');
  }

  openDeleteModal(id) {
    this.setState({ deleteModel: true });
    this.setState({ user_Id: id });
  }
  handleClose = () => {
    this.setState({ deleteModel: false });
  };

  openUpdateModal(id, email, status) {
    this.setState({ updateModel: true });
    this.setState({ user_Id: id });
    this.setState({ email: email });
    this.setState({ status: status }); 
  }

  handleCloseUpdate = () => {
    this.setState({ updateModel: false });
  };

  handleDelete = () => {
    const apiUrl = `${config.Url}user/${this.state.user_Id}`;
    const token = localStorage.getItem("token");

    fetch(apiUrl, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 200) {
          toast.success(data.message, {
            position: toast.POSITION.TOP_RIGHT,
          });
          this.getUserList();
          console.log("Data received:", data.message);
          this.setState({ deleteModel: false });
        } else {
          console.error("Error fetching user data");
          toast.error(data.message, {
            position: toast.POSITION.TOP_RIGHT,
          });
        }
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  };

  updateUser = () => {
    const apiUrl = `${config.Url}user/${this.state.user_Id}`;
    const token = localStorage.getItem("token");
    const postData = { status: this.state.status, email: this.state.email };
    fetch(apiUrl, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
      body: JSON.stringify(postData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 200) {
          toast.success(data.message, {
            position: toast.POSITION.TOP_RIGHT,
          });
          this.setState({ updateModel: false });
          this.getUserList();
          console.log("Data received:", data.message);
          this.setState({ deleteModel: false });
        } else {
          console.error("Error fetching user data");
          toast.error(data.message, {
            position: toast.POSITION.TOP_RIGHT,
          });
        }
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  };

  handlePageChange(page) {
    let status = this.state.status != "" ? `&status=${this.state.status}` : "";
    const apiUrl = `${config.Url}user/getAllUserList?page=${
      page ? page : 1
    }&limit=${this.state.limit}${status}`;
    const token = localStorage.getItem("token");

    fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 200) {
          console.log("Data received:", data);
          this.setState({ userLists: data.data });
          this.setState({ totalUser: data.total });
        } else {
          console.error("Error fetching user data");
        }
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
    this.setState({ activePage: page });
    this.setState({ page: page });
  }
  handleFilter = (e) => {
    const { name, value } = e.target;
    console.log("name", name);
    console.log("valuu", value);
    let status = value != "" ? `&status=${value}` : "";
    const apiUrl = `${config.Url}user/getAllUserList?page=${
      this.state.page ? this.state.page : 1
    }&limit=${this.state.limit}${status}`;
    const token = localStorage.getItem("token");

    fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 200) {
          console.log("Data received:", data);
          this.setState({ userLists: data.data });
          this.setState({ totalUser: data.total });
        } else {
          console.error("Error fetching user data");
        }
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
    this.setState({ status: value });
  };

  render() {
    const path = [
      {
        title: "Users",
        url: "javascript:void(0);",
      },
      {
        title: "AllUsers",
        url: "/admin/Users/AllUsers",
      },
    ];
    return (
      <div className="main-content-container p-4 container-fluid">
        <div className="AllUsersView_sect">
          <ToastContainer />
          <div className="head_top">
            <Breadcrumb title={"Form"} path={path} />
            <div className="form-group select_icon">
              <label>Category</label>

              <select
                name="status"
                id=""
                className="form-control"
                value={this.state.status}
                onChange={this.handleFilter}
              >
                <option value="">Please select</option>
                <option value="Designer">Designer</option>
                <option value="Supplier">Supplier</option>
                <option value="Home Owner">Home Owner</option>
                <option value="Builder">Builder</option>
              </select>
            </div>
          </div>

          <div className="table_sect">
            <div className="table_inner">
              <table className="table">
                <thead>
                  <tr>
                    <th>
                      <div class="iagt">
                        <label for="agryid" className="agrtrms">
                          <input type="checkbox" id="agryid" className="chki" />
                          <span className="agrchckmrk"></span>
                        </label>
                      </div>
                    </th>
                    <th>User</th>
                    <th>Email Id</th>
                    <th>
                      Category <span className="short"></span>
                    </th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.userLists &&
                    this.state.userLists.map((user, index) => (
                      <tr key={index}>
                        <td>
                          <div class="iagt">
                            <label for="agryid1" className="agrtrms">
                              <input
                                type="checkbox"
                                id="agryid1"
                                className="chki"
                              />
                              <span className="agrchckmrk"></span>
                            </label>
                          </div>
                        </td>
                        <td>
                          <div className="user_avtar">
                            <div className="userimg">
                              <img
                                src={
                                  user.profile_pic
                                    ? `https://halahomes.ca/uploads/${user.profile_pic}`
                                    : userPic
                                }
                              />
                            </div>
                            <div className="user_dt">
                              <h3>{user.full_name}</h3>
                              <p>
                                {user.city} {user.provience}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td>{user.email}</td>
                        <td>{user.user_type}</td>
                        <td>
                          <div className={user.status ? "active" : "Inactive"}>
                            {user.status ? "Active" : "Inactive"}
                          </div>
                        </td>
                        <td>
                          <div className="action_btn">
                            <Link to="/admin/Users/AllUsersView">
                              <button
                                className="btn"
                                onClick={() => this.userDetal(user.user_id)}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="15"
                                  height="15"
                                  viewBox="0 0 15 15"
                                  fill="none"
                                >
                                  <path
                                    d="M14.5029 7.34062C13.9516 5.91452 12.9945 4.68123 11.7499 3.79317C10.5052 2.9051 9.02768 2.40121 7.4998 2.34375C5.97192 2.40121 4.49436 2.9051 3.24974 3.79317C2.00512 4.68123 1.048 5.91452 0.496676 7.34062C0.459441 7.44361 0.459441 7.55639 0.496676 7.65938C1.048 9.08548 2.00512 10.3188 3.24974 11.2068C4.49436 12.0949 5.97192 12.5988 7.4998 12.6562C9.02768 12.5988 10.5052 12.0949 11.7499 11.2068C12.9945 10.3188 13.9516 9.08548 14.5029 7.65938C14.5402 7.55639 14.5402 7.44361 14.5029 7.34062ZM7.4998 11.7188C5.01543 11.7188 2.39043 9.87656 1.43886 7.5C2.39043 5.12344 5.01543 3.28125 7.4998 3.28125C9.98418 3.28125 12.6092 5.12344 13.5607 7.5C12.6092 9.87656 9.98418 11.7188 7.4998 11.7188Z"
                                    fill="#A5A5A7"
                                  />
                                  <path
                                    d="M7.5 4.6875C6.94374 4.6875 6.39997 4.85245 5.93746 5.16149C5.47495 5.47053 5.11446 5.90979 4.90159 6.4237C4.68872 6.93762 4.63302 7.50312 4.74154 8.04869C4.85006 8.59426 5.11793 9.0954 5.51126 9.48874C5.9046 9.88207 6.40574 10.1499 6.95131 10.2585C7.49688 10.367 8.06238 10.3113 8.5763 10.0984C9.09022 9.88554 9.52947 9.52505 9.83851 9.06254C10.1476 8.60003 10.3125 8.05626 10.3125 7.5C10.3125 6.75408 10.0162 6.03871 9.48874 5.51126C8.96129 4.98382 8.24592 4.6875 7.5 4.6875ZM7.5 9.375C7.12916 9.375 6.76665 9.26503 6.45831 9.05901C6.14996 8.85298 5.90964 8.56014 5.76773 8.21753C5.62581 7.87492 5.58868 7.49792 5.66103 7.13421C5.73338 6.77049 5.91195 6.4364 6.17418 6.17417C6.4364 5.91195 6.77049 5.73337 7.13421 5.66103C7.49792 5.58868 7.87492 5.62581 8.21753 5.76773C8.56014 5.90964 8.85298 6.14996 9.05901 6.45831C9.26503 6.76665 9.375 7.12916 9.375 7.5C9.375 7.99728 9.17746 8.47419 8.82583 8.82582C8.4742 9.17746 7.99728 9.375 7.5 9.375Z"
                                    fill="#A5A5A7"
                                  />
                                </svg>{" "}
                              </button>
                            </Link>
                            <button
                              className="btn"
                              onClick={() => this.openDeleteModal(user.user_id)}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="18"
                                height="18"
                                viewBox="0 0 18 18"
                                fill="none"
                              >
                                <path
                                  d="M5.25 15.75C4.8375 15.75 4.48425 15.603 4.19025 15.309C3.89625 15.015 3.7495 14.662 3.75 14.25V4.5H3V3H6.75V2.25H11.25V3H15V4.5H14.25V14.25C14.25 14.6625 14.103 15.0157 13.809 15.3097C13.515 15.6038 13.162 15.7505 12.75 15.75H5.25ZM12.75 4.5H5.25V14.25H12.75V4.5ZM6.75 12.75H8.25V6H6.75V12.75ZM9.75 12.75H11.25V6H9.75V12.75Z"
                                  fill="#A5A5A7"
                                />
                              </svg>
                            </button>
                            <div>
                              <Dropdown>
                                <Dropdown.Toggle
                                  variant="success"
                                  id="dropdown-basic"
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                  >
                                    <path
                                      d="M12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11Z"
                                      stroke="#262626"
                                      stroke-width="2"
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                    />
                                    <path
                                      d="M12 18C11.4477 18 11 18.4477 11 19C11 19.5523 11.4477 20 12 20C12.5523 20 13 19.5523 13 19C13 18.4477 12.5523 18 12 18Z"
                                      stroke="#262626"
                                      stroke-width="2"
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                    />
                                    <path
                                      d="M12 4C11.4477 4 11 4.44772 11 5C11 5.55228 11.4477 6 12 6C12.5523 6 13 5.55228 13 5C13 4.44772 12.5523 4 12 4Z"
                                      stroke="#262626"
                                      stroke-width="2"
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                    />
                                  </svg>
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                  {/* <Dropdown.Item
                                    onClick={() =>
                                      this.openUpdateModal(user.user_id, "1")
                                    }
                                  >
                                    Spam {user.flag == '1'
                              ? <span> &#10003;</span> : ""}

                                  </Dropdown.Item> */}
                                  <Dropdown.Item
                                    onClick={() =>
                                      this.openUpdateModal(
                                        user.user_id,
                                        user.email,
                                        "0"
                                      )
                                    }
                                  >
                                    Inactive{" "}
                                    {user.status == "0" ? (
                                      <span> &#10003;</span>
                                    ) : (
                                      ""
                                    )}
                                  </Dropdown.Item>
                                  <Dropdown.Item
                                    onClick={() =>
                                      this.openUpdateModal(
                                        user.user_id,
                                        user.email,
                                        "1"
                                      )
                                    }
                                  >
                                    active{" "}
                                    {user.status == "1" ? (
                                      <span> &#10003;</span>
                                    ) : (
                                      ""
                                    )}
                                  </Dropdown.Item>
                                </Dropdown.Menu>
                              </Dropdown>
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="pagenation_item">
            <h3>
              Showing {this.state.userLists && this.state.userLists.length} from{" "}
              {this.state.totalUser} data
            </h3>
            <div className="pagenation_no">
              <Pagination
                activePage={this.state.activePage}
                itemsCountPerPage={10}
                totalItemsCount={this.state.totalUser}
                pageRangeDisplayed={5}
                onChange={this.handlePageChange.bind(this)}
              />
            </div>
          </div>
        </div>

        <Modal show={this.state.deleteModel} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title style={{ color: "black" }}>
              Are you sure want to delete it?
            </Modal.Title>
          </Modal.Header>

          <Modal.Footer>
            <button variant="primary" onClick={this.handleDelete}>
              Yes
            </button>
            <button variant="primary" onClick={this.handleClose}>
              No
            </button>
          </Modal.Footer>
        </Modal>

        <Modal show={this.state.updateModel} onHide={this.handleCloseUpdate}>
          <Modal.Header closeButton>
            <Modal.Title style={{ color: "black" }}>
              Are you sure want to change status?
            </Modal.Title>
          </Modal.Header>

          <Modal.Footer>
            <button variant="primary" onClick={this.updateUser}>
              Yes
            </button>
            <button variant="primary" onClick={this.handleCloseUpdate}>
              No
            </button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default AllUsersContainer;

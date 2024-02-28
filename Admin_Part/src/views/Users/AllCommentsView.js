import React, { Component } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import config from "../../config/config";
import Breadcrumb from "../../components/BreadCrumb/Breadcrumb";
import Tabimg from "../../assets/images/tabimg1.png";
import viewpost from "../../assets/images/viewpost.png";
import userPic from "../../assets/images/user.jpeg";
import moment from "moment";
import Modal from "react-bootstrap/Modal";
import { ToastContainer, toast } from "react-toastify";
import "../../assets/Css/Style.css";
import Dropdown from "react-bootstrap/Dropdown";
class AllCommentsView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      commentData: {},
      updateModel: false,
      blockStatus: "",
      deleteModel: false,
      comment_id: "",
      spam: "",
    };
  }

  grtCommentDetails = () => {
    var post_id = localStorage.getItem("post_id");
    const apiUrl = `${config.Url}post/${post_id}`;
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
          console.log("Data received:", data.data);
          this.setState({ commentData: data.data });
        } else {
          console.error("Error fetching user data");
        }
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  };
  componentDidMount() {
    this.grtCommentDetails();
  }

  openUpdateModal(id, status) {
    this.setState({ updateModel: true });
    this.setState({ comment_id: id });
    this.setState({ spam: status });
  }

  handleCloseUpdate = () => {
    this.setState({ updateModel: false });
  };

  openDeleteModal(id) {
    this.setState({ deleteModel: true });
    this.setState({ comment_id: id });
  }
  handleClose = () => {
    this.setState({ deleteModel: false });
  };

  handleDelete = () => {
    const apiUrl = `${config.Url}comment/${this.state.comment_id}`;
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
          this.grtCommentDetails();
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

  updateStatus = async () => {
    try {
      const { comment_id, spam } = this.state;
      const apiUrl = `${config.Url}spamblock/${comment_id}`;
      const token = localStorage.getItem("token");

      const response = await fetch(apiUrl, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
        body: JSON.stringify({ spam }),
      });

      const data = await response.json();

      if (response.ok) {
        this.setState({ updateModel: false });
        this.grtCommentDetails();
        console.log("Data received:", data);
      } else {
        console.error("Error updating status:", data);
      }
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  // updateStatus = () => {
  //   const apiUrl = `${config.Url}spamBlockupdateUserById/${this.state.comment_id}`;
  //   const token = localStorage.getItem("token");

  //   fetch(apiUrl, {
  //     method: "PATCH",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: `${token}`,
  //     },
  //     body: JSON.stringify(this.state.spam),
  //   })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       if (data.status === 200) {
  //         this.setState({ updateModel: false });
  //         this.grtCommentDetails();
  //         console.log("Data received:", data);
  //       } else {
  //         console.error("Error fetching user data");
  //       }
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching user data:", error);
  //     });
  // };

  render() {
    const path = [
      {
        title: "Users",
        url: "javascript:void(0);",
      },
      {
        title: "All Comments",
        url: "/admin/Users/AllComments",
      },

      {
        title: "view",
        url: "/admin/Users/AllCommentsView",
      },
    ];
    return (
      <div className="main-content-container p-4 container-fluid">
        <div className="AllUsersView_sect">
          <div className="head_top">
            <Breadcrumb title={"Form"} path={path} />
            <Link to="/admin/Users/AllComments" class="btn_back">
              Back
            </Link>
          </div>
          <div className="card_body">
            <div className="allpost_sect">
              <div className="user_avtar">
                <div className="userimg">
                  <img
                    src={
                      this.state.commentData &&
                      this.state.commentData.user &&
                      this.state.commentData.user.profile_pic
                        ? `https://halahomes.ca/uploads/${this.state.commentData.user.profile_pic}`
                        : userPic
                    }
                  />
                </div>
                <div className="user_dt">
                  <h3>
                    {this.state.commentData &&
                      this.state.commentData.user &&
                      this.state.commentData.user.full_name}
                  </h3>
                  <p>
                    Post Id-{" "}
                    <span>
                      {this.state.commentData && this.state.commentData.post_id}
                    </span>
                  </p>
                  <p>
                    {" "}
                    {moment(
                      this.state.commentData &&
                        this.state.commentData.created_at
                    ).format("ddd, DD MMM YYYY")}
                  </p>
                  <div className="allpost_inner">
                    <div className="lft_bx">
                      <h3>
                        {this.state.commentData &&
                          this.state.commentData.question}
                      </h3>
                      <h4>Hi everyone!</h4>
                      <p>
                        {this.state.commentData &&
                          this.state.commentData.description}
                      </p>
                    </div>
                    <div className="rgt_bx">
                      <img
                        src={
                          this.state.commentData &&
                          `https://halahomes.ca/uploads/${this.state.commentData.media_url}`
                        }
                      />
                    </div>
                  </div>
                  <div className="blogpost_list">
                    {this.state.commentData &&
                      this.state.commentData.allComments &&
                      this.state.commentData.allComments.map((item, index) => (
                        <div
                          className={`card_bx ${
                            item.spam && item.spam == "1" ? "spam" : ""
                          }`}
                        >
                          <div className="user_avtar">
                            <div className="userimg">
                              <img
                                src={
                                  this.state.commentData &&
                                  this.state.commentData.user &&
                                  this.state.commentData.user.profile_pic
                                    ? `https://halahomes.ca/uploads/${this.state.commentData.user.profile_pic}`
                                    : userPic
                                }
                              />
                            </div>
                            <div className="user_dt">
                              <div className="head">
                                <div>
                                  <h3>{item.full_name}</h3>
                                  <p>
                                    {moment(item.created_at).format(
                                      "ddd, DD MMM YYYY"
                                    )}
                                  </p>
                                </div>
                                <div className="action_btn">
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
                                      <Dropdown.Item
                                        onClick={() =>
                                          this.openUpdateModal(item.id, "1")
                                        }
                                      >
                                        Spam
                                      </Dropdown.Item>
                                      <Dropdown.Item
                                        onClick={() =>
                                          this.openDeleteModal(item.id)
                                        }
                                      >
                                        Delete
                                      </Dropdown.Item>
                                    </Dropdown.Menu>
                                  </Dropdown>
                                </div>
                              </div>
                              <p>{item.content}</p>
                              <ul>
                                <li>
                                  <span>
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="20"
                                      height="20"
                                      viewBox="0 0 20 20"
                                      fill="none"
                                    >
                                      <path
                                        d="M14.3337 3C12.6087 3 11.117 4.01667 10.417 5.475C9.71699 4.01667 8.23366 3 6.50033 3C4.10866 3 2.16699 4.94167 2.16699 7.33333C2.16699 10.7583 7.15033 15.15 9.36699 16.9333C9.98366 17.425 10.8503 17.425 11.4587 16.9333C13.6837 15.1417 18.6587 10.75 18.6587 7.33333C18.667 4.94167 16.7253 3 14.3337 3Z"
                                        fill="#F75858"
                                      />
                                    </svg>
                                  </span>
                                  <span> {item.like_count}</span>
                                </li>
                                <li>
                                  <span>
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="20"
                                      height="20"
                                      viewBox="0 0 20 20"
                                      fill="none"
                                    >
                                      <path
                                        fill-rule="evenodd"
                                        clip-rule="evenodd"
                                        d="M5.625 5L6.25 4.375H13.75L14.375 5V16.0968L10 13.5042L5.625 16.0968V5ZM6.875 5.625V13.9032L10 12.0512L13.125 13.9032V5.625H6.875Z"
                                        fill="#080341"
                                      />
                                    </svg>
                                  </span>
                                  <span>0</span>
                                </li>
                                <li>
                                  <span className="btn">Show Portfolio</span>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      ))}

                    {/* <div className="card_bx">
                      <div className="user_avtar">
                        <div className="userimg">
                          <img src={Tabimg} />
                        </div>
                        <div className="user_dt">
                          <div className="head">
                            <div>
                              <h3>Build_Breeze</h3>
                              <h3>John Thomas</h3>
                              <p>13 days ago</p>
                            </div>
                            <div className="action_btn">
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
                                  <Dropdown.Item href="/Spam">
                                    Spam
                                  </Dropdown.Item>
                                  <Dropdown.Item href="/Blocked">
                                    Delete
                                  </Dropdown.Item>
                                </Dropdown.Menu>
                              </Dropdown>
                            </div>
                          </div>
                          <p>
                            Please provide the plan in JPEG format so that we
                            can enlarge it for better readability. Just a
                            heads-up, kitchens typically require more lighting
                            than a dining room. When planning your new house,
                            begin by considering what you liked and didn't like
                            about your previous home, and make improvements
                            accordingly. It's worth noting that placing a
                            kitchen in the center of the house might not be the
                            best choice.
                          </p>
                          <ul>
                            <li>
                              <span>
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="20"
                                  height="20"
                                  viewBox="0 0 20 20"
                                  fill="none"
                                >
                                  <path
                                    d="M14.3337 3C12.6087 3 11.117 4.01667 10.417 5.475C9.71699 4.01667 8.23366 3 6.50033 3C4.10866 3 2.16699 4.94167 2.16699 7.33333C2.16699 10.7583 7.15033 15.15 9.36699 16.9333C9.98366 17.425 10.8503 17.425 11.4587 16.9333C13.6837 15.1417 18.6587 10.75 18.6587 7.33333C18.667 4.94167 16.7253 3 14.3337 3Z"
                                    fill="#F75858"
                                  />
                                </svg>
                              </span>
                              <span>40</span>
                            </li>
                            <li>
                              <span>
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="20"
                                  height="20"
                                  viewBox="0 0 20 20"
                                  fill="none"
                                >
                                  <path
                                    fill-rule="evenodd"
                                    clip-rule="evenodd"
                                    d="M5.625 5L6.25 4.375H13.75L14.375 5V16.0968L10 13.5042L5.625 16.0968V5ZM6.875 5.625V13.9032L10 12.0512L13.125 13.9032V5.625H6.875Z"
                                    fill="#080341"
                                  />
                                </svg>
                              </span>
                              <span>2</span>
                            </li>
                            <li>
                              <span className="btn">Show Portfolio</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="card_bx">
                      <div className="user_avtar">
                        <div className="userimg">
                          <img src={Tabimg} />
                        </div>
                        <div className="user_dt">
                          <div className="head">
                            <div>
                              <h3>Craft_Homes</h3>
                              <h3>Jennifer Hogan</h3>
                              <p>13 days ago</p>
                            </div>
                            <div className="action_btn">
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
                                  <Dropdown.Item href="/Spam">
                                    Spam
                                  </Dropdown.Item>
                                  <Dropdown.Item href="/Blocked">
                                    Delete
                                  </Dropdown.Item>
                                </Dropdown.Menu>
                              </Dropdown>
                            </div>
                          </div>
                          <p>
                            In the house's redesign, prioritize the spatial
                            layout's connection to the surroundings as the main
                            influence. Instead of attempting to rectify this
                            existing design, consider placing the spaces in a
                            way that harmonizes with the site. Keep in mind that
                            having exterior doors in a living room often
                            constrains furniture arrangement options due to the
                            need to account for the circulation path.
                          </p>
                          <ul>
                            <li>
                              <span>
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="20"
                                  height="20"
                                  viewBox="0 0 20 20"
                                  fill="none"
                                >
                                  <path
                                    d="M14.3337 3C12.6087 3 11.117 4.01667 10.417 5.475C9.71699 4.01667 8.23366 3 6.50033 3C4.10866 3 2.16699 4.94167 2.16699 7.33333C2.16699 10.7583 7.15033 15.15 9.36699 16.9333C9.98366 17.425 10.8503 17.425 11.4587 16.9333C13.6837 15.1417 18.6587 10.75 18.6587 7.33333C18.667 4.94167 16.7253 3 14.3337 3Z"
                                    fill="#F75858"
                                  />
                                </svg>
                              </span>
                              <span>22</span>
                            </li>
                            <li>
                              <span>
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="20"
                                  height="20"
                                  viewBox="0 0 20 20"
                                  fill="none"
                                >
                                  <path
                                    fill-rule="evenodd"
                                    clip-rule="evenodd"
                                    d="M5.625 5L6.25 4.375H13.75L14.375 5V16.0968L10 13.5042L5.625 16.0968V5ZM6.875 5.625V13.9032L10 12.0512L13.125 13.9032V5.625H6.875Z"
                                    fill="#080341"
                                  />
                                </svg>
                              </span>
                              <span>1</span>
                            </li>
                            <li>
                              <span className="btn">Show Portfolio</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="card_bx">
                      <div className="user_avtar">
                        <div className="userimg">
                          <img src={Tabimg} />
                        </div>
                        <div className="user_dt">
                          <div className="head">
                            <div>
                              <h3>Patricia Colwell </h3>
                              <p>13 days ago</p>
                            </div>
                            <div className="action_btn">
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
                                  <Dropdown.Item href="/Spam">
                                    Spam
                                  </Dropdown.Item>
                                  <Dropdown.Item href="/Blocked">
                                    Delete
                                  </Dropdown.Item>
                                </Dropdown.Menu>
                              </Dropdown>
                            </div>
                          </div>
                          <p>
                            I'd like to extend the plan to increase its length.
                            Currently, it's quite deep, which could result in
                            certain areas being quite dim. Is there a way to
                            elongate it and incorporate more natural light?
                            Additionally, I'd prefer to have much improved
                            access to the backyard.
                          </p>
                          <ul>
                            <li>
                              <span>
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="20"
                                  height="20"
                                  viewBox="0 0 20 20"
                                  fill="none"
                                >
                                  <path
                                    d="M14.3337 3C12.6087 3 11.117 4.01667 10.417 5.475C9.71699 4.01667 8.23366 3 6.50033 3C4.10866 3 2.16699 4.94167 2.16699 7.33333C2.16699 10.7583 7.15033 15.15 9.36699 16.9333C9.98366 17.425 10.8503 17.425 11.4587 16.9333C13.6837 15.1417 18.6587 10.75 18.6587 7.33333C18.667 4.94167 16.7253 3 14.3337 3Z"
                                    fill="#F75858"
                                  />
                                </svg>
                              </span>
                              <span>31</span>
                            </li>
                            <li>
                              <span>
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="20"
                                  height="20"
                                  viewBox="0 0 20 20"
                                  fill="none"
                                >
                                  <path
                                    fill-rule="evenodd"
                                    clip-rule="evenodd"
                                    d="M5.625 5L6.25 4.375H13.75L14.375 5V16.0968L10 13.5042L5.625 16.0968V5ZM6.875 5.625V13.9032L10 12.0512L13.125 13.9032V5.625H6.875Z"
                                    fill="#080341"
                                  />
                                </svg>
                              </span>
                              <span>1</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="card_bx">
                      <div className="user_avtar">
                        <div className="userimg">
                          <img src={Tabimg} />
                        </div>
                        <div className="user_dt">
                          <div className="head">
                            <div>
                              <h3>Jennifer Hogan</h3>
                            </div>
                            <div className="action_btn">
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
                                  <Dropdown.Item href="/Spam">
                                    Spam
                                  </Dropdown.Item>
                                  <Dropdown.Item href="/Blocked">
                                    Delete
                                  </Dropdown.Item>
                                </Dropdown.Menu>
                              </Dropdown>
                            </div>
                          </div>
                          <p>
                            In the house's redesign, prioritize the spatial
                            layout's connection to the surroundings as the main
                            influence. Instead of attempting to rectify this
                            existing design, consider placing the spaces in a
                            way that harmonizes with the site. Keep in mind that
                            having exterior doors in a living room often
                            constrains furniture arrangement options due to the
                            need to account for the circulation path.
                          </p>
                          <ul>
                            <li>
                              <span>
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="20"
                                  height="20"
                                  viewBox="0 0 20 20"
                                  fill="none"
                                >
                                  <path
                                    d="M14.3337 3C12.6087 3 11.117 4.01667 10.417 5.475C9.71699 4.01667 8.23366 3 6.50033 3C4.10866 3 2.16699 4.94167 2.16699 7.33333C2.16699 10.7583 7.15033 15.15 9.36699 16.9333C9.98366 17.425 10.8503 17.425 11.4587 16.9333C13.6837 15.1417 18.6587 10.75 18.6587 7.33333C18.667 4.94167 16.7253 3 14.3337 3Z"
                                    fill="#F75858"
                                  />
                                </svg>
                              </span>
                              <span>20</span>
                            </li>
                            <li>
                              <span>
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="20"
                                  height="20"
                                  viewBox="0 0 20 20"
                                  fill="none"
                                >
                                  <path
                                    fill-rule="evenodd"
                                    clip-rule="evenodd"
                                    d="M5.625 5L6.25 4.375H13.75L14.375 5V16.0968L10 13.5042L5.625 16.0968V5ZM6.875 5.625V13.9032L10 12.0512L13.125 13.9032V5.625H6.875Z"
                                    fill="#080341"
                                  />
                                </svg>
                              </span>
                              <span>1</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Modal show={this.state.updateModel} onHide={this.handleCloseUpdate}>
          <Modal.Header closeButton>
            <Modal.Title style={{ color: "black" }}>
              Are you sure want to change status?
            </Modal.Title>
          </Modal.Header>

          <Modal.Footer>
            <button variant="primary" onClick={this.updateStatus}>
              Yes
            </button>
            <button variant="primary" onClick={this.handleCloseUpdate}>
              No
            </button>
          </Modal.Footer>
        </Modal>

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
      </div>
    );
  }
}
export default AllCommentsView;

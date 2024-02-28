import React, { Component } from "react";
import { Link, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import config from "../../config/config";
import Breadcrumb from "../../components/BreadCrumb/Breadcrumb";
import userPic from "../../assets/images/user.jpeg";
import Tabimg from "../../assets/images/tabimg1.png";
import viewpost from "../../assets/images/viewpost.png";
import "../../assets/Css/Style.css";
import Dropdown from "react-bootstrap/Dropdown";
class AllPostView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      postData: {},
    };
    //this.history = useHistory()
  }

  componentDidMount() {
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
          this.setState({ postData: data.data });
        } else {
          console.error("Error fetching user data");
        }
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }

  updateStatus(status) {
    var post_id = localStorage.getItem("post_id");
    const apiUrl = `${config.Url}post/${post_id}`;
    const token = localStorage.getItem("token");
    const postData = { status };
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
          this.props.history.push("/admin/Users/AllPost");
          //history.push("/dashboard");
          console.log("Data received:", data);
        } else {
          console.error("Error fetching user data");
        }
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }

  render() {
    const path = [
      {
        title: "Users",
        url: "javascript:void(0);",
      },
      {
        title: "All Post",
        url: "/admin/Users/AllPost",
      },

      {
        title: "view",
        url: "/admin/Users/AllPostView",
      },
    ];
    return (
      <div className="main-content-container p-4 container-fluid">
        <div className="AllUsersView_sect">
          <div className="head_top">
            <Breadcrumb title={"Form"} path={path} />
            <Link to="/admin/Users/AllPost" class="btn_back">
              Back
            </Link>
          </div>
          <div className="card_body">
            <div className="allpost_sect">
              <div className="user_avtar">
                <div className="userimg">
                  <img
                    src={
                      this.state.postData &&
                      this.state.postData.user &&
                      this.state.postData.user.profile_pic
                        ? `https://halahomes.ca/uploads/${this.state.postData.user.profile_pic}`
                        : userPic
                    }
                  />
                </div>
                <div className="user_dt">
                  <h3>
                    {this.state.postData &&
                      this.state.postData.user &&
                      this.state.postData.user.full_name}
                  </h3>
                  <p>
                    Post Id-{" "}
                    <span>
                      {this.state.postData && this.state.postData.post_id}
                    </span>
                  </p>
                  <p>{this.state.postData && this.state.postData.created_at}</p>
                  <div className="allpost_inner">
                    <div className="lft_bx">
                      <h3>
                        {this.state.postData && this.state.postData.question}
                      </h3>
                      {/* <h4>Hi everyone!</h4> */}
                      <p>
                        {this.state.postData && this.state.postData.description}
                      </p>
                    </div>
                    <div className="rgt_bx">
                      <img
                        src={
                          this.state.postData && this.state.postData.media_url
                            ? this.state.postData &&
                              `https://halahomes.ca/uploads/${this.state.postData.media_url}`
                            : this.state.postData.media_url 
                          }
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div class="btn_grp">
                {
                  this.state.postData && this.state.postData.status == 1 ? (
                    <>
                      <button class="btn" onClick={() => this.updateStatus(2)}>
                        spam
                      </button>
                    </>
                  ) : (
                    <button class="btn" onClick={() => this.updateStatus(1)}>
                      approve
                    </button>
                  )

                  // this.state.postData && this.state.postData.status == 2 ? (
                  //   <>
                  //     <button class="btn" onClick={() => this.updateStatus(1)}>
                  //       approve
                  //     </button>
                  //     <button class="btn" onClick={() => this.updateStatus(0)}>
                  //       Pending Review
                  //     </button>
                  //   </>
                  // ) : this.state.postData && this.state.postData.status == 1 ? (
                  //   <>
                  //     {" "}
                  //     <button class="btn" onClick={() => this.updateStatus(0)}>
                  //       Pending Review
                  //     </button>
                  //     <button class="btn" onClick={() => this.updateStatus(2)}>
                  //       spam
                  //     </button>
                  //   </>
                  // ) : (
                  //   "UnknownStatus"
                  // )
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default AllPostView;

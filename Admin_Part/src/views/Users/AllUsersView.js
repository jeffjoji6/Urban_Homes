import React, { Component } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import config from "../../config/config";
import Breadcrumb from "../../components/BreadCrumb/Breadcrumb";
import ProfileImg from "../../assets/images/profile_img.png";
import userPic from "../../assets/images/user.jpeg";
import Portfolio1 from "../../assets/images/gallary.png";
import Portfolio2 from "../../assets/images/gallary1.png";
import Portfolio3 from "../../assets/images/gallary2.png";
import PhoneInput from "react-phone-input-2";

import "react-phone-input-2/lib/style.css";
//import "../../assets/Css/Style.css"
class AllUsersView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: {},
    };
  }

  componentDidMount() {
    let user_id = localStorage.getItem("userId");
    console.log("user_id------>", user_id);
    const apiUrl = `${config.Url}user/${user_id}`;
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
          console.log("Data received:", data.details);
          this.setState({ userData: data.details });
        } else {
          console.error("Error fetching user data");
        }
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }

  updateStatus(status) {
    let user_id = localStorage.getItem("userId");
    const apiUrl = `${config.Url}user/${user_id}`;
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
          this.props.history.push("/admin/Users/AllUsers");
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
        title: "All Users",
        url: "/admin/Users/AllUsers",
      },
      {
        title: "view",
        url: "/admin/AllUsersView",
      },
    ];
    return (
      <div className="main-content-container p-4 container-fluid">
        <h1>Hello</h1>
        <div className="AllUsersView_sect">
          <div className="head_top">
            <Breadcrumb title={"Form"} path={path} />
            <Link to="/admin/Users/AllUsers" class="btn_back">
              Back
            </Link>
          </div>
          <div className="card_body pd-0">
            <div className="head">
              <ul>
                <li>Company Information</li>
              </ul>
            </div>
            <div className="comp_info_wrapp">
              <div className="crd_bx">
                <div className="image_bx">
                  <img
                    src={
                      this.state.userData && this.state.userData.profile_pic
                        ? this.state.userData &&
                          `https://halahomes.ca/uploads/${this.state.userData.profile_pic}`
                        : userPic
                    }
                  />
                  {/* <p>Company logo</p> */}
                </div>
                <div className="from">
                  <div className="form-group">
                    <label htmlFor="">Company Name</label>
                    <input
                      type="text"
                      className="form-control"
                      name=""
                      id=""
                      placeholder="Build_breeze"
                      value={
                        this.state.userData && this.state.userData.company_name
                      }
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor=""> Experience </label>
                    <input
                      type="text"
                      className="form-control"
                      name=""
                      id=""
                      placeholder="15 years"
                      value={
                        this.state.userData && this.state.userData.experience
                      }
                    />
                  </div>
                </div>
              </div>
              <div className="crd_bx">
                <p>company Info</p>
                <div className="about_info">
                  <p>{this.state.userData && this.state.userData.about_us}</p>
                </div>
              </div>
              <div className="crd_bx">
                <div className="from">
                  <div className="form-group">
                    <label htmlFor="">name</label>
                    <input
                      type="text"
                      className="form-control"
                      name=""
                      id=""
                      placeholder="John Thomas"
                      value={
                        this.state.userData && this.state.userData.full_name
                      }
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor=""> Email ID </label>
                    <input
                      type="text"
                      className="form-control"
                      name=""
                      id=""
                      placeholder="thomas.john@gmail.com"
                      value={this.state.userData && this.state.userData.email}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor=""> Mobile number </label>
                    <PhoneInput
                      country={"ca"}
                      placeholder="+1  40 2546 5236"
                      value={this.state.userData && this.state.userData.phone}
                      onChange={(phone) => console.log({ phone })}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor=""> country </label>
                    <input
                      type="text"
                      className="form-control"
                      name=""
                      id=""
                      placeholder="Canada"
                      value={
                        this.state.userData && this.state.userData.provience
                      }
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor=""> city </label>
                    <input
                      type="text"
                      className="form-control"
                      name=""
                      id=""
                      placeholder="Ontario"
                      value={this.state.userData && this.state.userData.city}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor=""> Zip Code </label>
                    <input
                      type="text"
                      className="form-control"
                      name=""
                      id=""
                      placeholder="K0A 0A2"
                      value={
                        this.state.userData && this.state.userData.zip_code
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="head">
              <ul>
                <li>Portfolio</li>
              </ul>
            </div>
            <div className="Portfolio_list">
              {this.state.userData &&
                this.state.userData.portfolio &&
                this.state.userData.portfolio.map((item, index) => (
                  <div className="item" key={index}>
                    <div className="images_bx">
                      <img src={item.media_url} />
                    </div>
                    <div className="content">
                      <p>{item.title}</p>
                    </div>
                  </div>
                ))}
            </div>
            <div className="btn_grp">
              <button class="btn" onClick={() => this.updateStatus(0)}>
                In-Active
              </button>
              <button class="btn" onClick={() => this.updateStatus(1)}>
                Active
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default AllUsersView;

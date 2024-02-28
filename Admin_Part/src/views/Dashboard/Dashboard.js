import React, { Component } from "react";
import Breadcrumb from "../../components/BreadCrumb/Breadcrumb";
import config from "../../config/config";
import moment from 'moment';
import "./StyleSheets/Dashboard.css";
import "../../assets/Css/Style.css";
import SubsGrap from "../../assets/images/subgrap.png";
import Usergrap from "../../assets/images/usergrap.png";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      DashboardData: {},
      userLists:[]
    };
  }

  getDashboardData = () => {
    const apiUrl = `${config.Url}getDashboardDetails`;
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
          this.setState({ DashboardData: data.data });
        } else {
          console.error("Error fetching user data");
        }
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  };

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
        } else {
          console.error("Error fetching user data");
        }
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  };

  componentDidMount() {
    this.getDashboardData();
    this.getUserList();
  }

  render() {
    const path = [
      {
        title: "Dashboard",
        url: "/",
      },
    ];
    return (
      <>
        <div className="main-content-container p-4 container-fluid">
          <div className="dashboard_sect">
            <div className="head_top">
              <Breadcrumb title={"Form"} path={path} />
            </div>
            <div className="chat_list">
              <div className="card_bx">
                <h3>Total Users</h3>
                <p>{this.state.DashboardData && this.state.DashboardData.totalCount}</p>
                <span className="line"></span>
              </div>
              <div className="card_bx">
                <h3>Total Designers</h3>
                <p> {this.state.DashboardData && this.state.DashboardData.designers} </p>
                <span className="line"></span>
              </div>
              <div className="card_bx">
                <h3>Total Builders</h3>
                <p> {this.state.DashboardData && this.state.DashboardData.builders} </p>
                <span className="line"></span>
              </div>
              <div className="card_bx">
                <h3>Total Suppliers</h3>
                <p>{this.state.DashboardData && this.state.DashboardData.suppliers}</p>
                <span className="line"></span>
              </div>
              <div className="card_bx">
                <h3>Active users</h3>
                <p>{this.state.DashboardData && this.state.DashboardData.activeUsers}</p>
                <span className="line"></span>
              </div>
              <div className="card_bx">
                <h3>Total portfolios</h3>
                <p> {this.state.DashboardData && this.state.DashboardData.totalPortfolios} </p>
                <span className="line"></span>
              </div>
            </div>
            {/* <div className="grap_list">
              <div className="grap_card">
                <div className="grap_line">
                  <div className="grap_head">
                    <h3>Subscibers Details</h3>
                    <ul>
                      <li>Builders</li>
                      <li>Suppliers</li>
                      <li>Homeowners</li>
                    </ul>
                  </div>
                  <div className="grap_chart">
                    <img src={SubsGrap} />
                  </div>
                </div>
              </div>
              <div className="grap_card">
                <div className="user_grap">
                  <div className="grap_head">
                    <h3>Users by Category</h3>
                    <h4>
                      Total Users <span>{this.state.DashboardData && this.state.DashboardData.homeowners + this.state.DashboardData.buildersCategory + this.state.DashboardData.suppliersCategory}</span>{" "}
                    </h4>
                  </div>
                  <div className="grap_chart">
                    <img src={Usergrap} />
                    <div className="usergrap_point">
                      <ul>
                        <li>Homeowners</li>
                        <li>Builders</li>
                        <li>Suppliers</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div> */}
            <div className="card_body">
              <div className="head">
                <h3>Subscibers Details</h3>
              </div>
              <div className="table_grap">
                <table className="table">
                  <thead>
                    <tr>
                      <th>S.No.</th>
                      <th>Member Since</th>
                      <th>User Name</th>
                      <th>User Type</th>
                      <th>Email ID</th>
                    </tr>
                  </thead>
                  <tbody>
                  {this.state.userLists &&
                    this.state.userLists.map((user, index) => (
                      <tr key={index}>
                      <td>{index+1}</td>
                      <td>{moment( user.created_at).format('ddd, DD MMM YYYY')}</td>
                      <td>{user.full_name}</td>
                      <td>{user.user_type}</td>
                      <td>{user.email}</td>
                    </tr>
                    ))}

                    {/* <tr>
                      <td>1</td>
                      <td>19 Apr, 2023</td>
                      <td>Annie Cooper</td>
                      <td>Home owner</td>
                      <td>Annie_cooper@gmail.com</td>
                    </tr>
                    <tr>
                      <td>2</td>
                      <td>24 Apr, 2023</td>
                      <td>Builder</td>
                      <td>Home owner</td>
                      <td>thomas.john@gmail.com</td>
                    </tr>
                    <tr>
                      <td>3</td>
                      <td>27 Apr, 2023</td>
                      <td>Annie Cooper</td>
                      <td>Home owner</td>
                      <td>Annie_cooper@gmail.com</td>
                    </tr>
                    <tr>
                      <td>4</td>
                      <td>28 Apr, 2023</td>
                      <td>Dylan Meringue</td>
                      <td>Designer</td>
                      <td>dylan_meringue@gmail.com</td>
                    </tr>
                    <tr>
                      <td>5</td>
                      <td>25 Apr, 2023</td>
                      <td>Will Barrow</td>
                      <td>Builder</td>
                      <td>willbarrow@gmail.com</td>
                    </tr>
                    <tr>
                      <td>6</td>
                      <td>24 Apr, 2023</td>
                      <td>Pelican Steve</td>
                      <td>Supplier</td>
                      <td>pelicansteve@gmail.com</td>
                    </tr> */}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Dashboard;

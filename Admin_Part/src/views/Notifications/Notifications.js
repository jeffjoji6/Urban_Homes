import React, { Component } from "react";
import config from "../../config/config";
import moment from "moment";
import Breadcrumb from "../../components/BreadCrumb/Breadcrumb";

class Forms extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notiFLists: [],
    };
  }

  getNotificationList = () => {
    const apiUrl = `${config.Url}getNotificationData?status=1`;
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
          console.log("Data received:", data.data.allNotifications );
          this.setState({ notiFLists: data.data.allNotifications  });
        } else {
          console.error("Error fetching user data");
        }
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  };
  componentDidMount() {
    this.getNotificationList();
  }

  render() {
    const path = [
      {
        title: "Dashboard",
        url: "/dashboard",
      },
      {
        title: "Notification",
        url: "/notification",
      },
    ];
    return (
      <div className="main-content-container p-4 container-fluid">
        <div class="head_top">
          <Breadcrumb title={"Form"} path={path} />
        </div>

        <div className="notif_sect">
          {/* {this.state.notiFLists &&
            this.state.notiFLists.map((notiF, index) => (
              <div className="card_body">
                <div className="list_notif">
                  <div className="crd_bx">
                    <h3>{notiF.notification}</h3>
                    <p> {moment(notiF.created_at).format("ddd, DD MMM YYYY")}</p>
                  </div>
                </div>
              </div>
            ))} */}

{this.state.notiFLists &&
  this.state.notiFLists.map((notiF, index) => {
    console.log(notiF);  // Add this line
    return (
      <div className="card_body" key={index}>
        <div className="list_notif">
          <div className="crd_bx">
            <h3>{notiF.notification}</h3>
            <p>{moment(notiF.created_at).format("ddd, DD MMM YYYY")}</p>
          </div>
        </div>
      </div>
    );
  })}

        </div>
      </div>
    );
  }
}

export default Forms;

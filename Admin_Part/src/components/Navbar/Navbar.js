import React, { Component } from "react";
import "./StyleSheets/Navbar.css";
import moment from 'moment';
import config from "../../config/config";
import Adminprofile from '../../assets/images/user.jpeg';

class Navbar extends Component {

  redirectToAdminNotify = () => {
    window.location.href = '/admin/Notification';
  };

  constructor(props) {
    super(props);
    this.state = {
      currentDate: new Date(),
      notiFicationCount:'',
    };

  }

  getNotificationList = () => {
    const apiUrl = `${config.Url}getNotificationData`;
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
          console.log("Data 1233333333:", data.data.activeNotificationCount );
          this.setState({ notiFicationCount: data.data.activeNotificationCount  });
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
    return (
      <div className="header-section" id="sticky">
        <nav className="navbar navbar-expand-lg navbar-light">
          <div className="container-fluid">
            <div className="d-flex w-100 justify-content-space-between">
            <div onClick={() => this.props.onToggleClick()} className="bars-menu">
              <i className="fa fa-bars" aria-hidden="true"></i>
            </div>
            <div className="header_admin">
            <div className="lft_bx">
              <h3>Welcome, Admin</h3>
              <p>{ moment(this.state.currentDate).format('ddd, DD MMM YYYY')}</p>
            </div>
            <div className="rgt_bx">
              <button className="btn" onClick={this.redirectToAdminNotify}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M12 6.43994V9.76994" stroke="#828282" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" />
                  <path d="M12.0209 2C8.34087 2 5.36087 4.98 5.36087 8.66V10.76C5.36087 11.44 5.08087 12.46 4.73087 13.04L3.46087 15.16C2.68087 16.47 3.22087 17.93 4.66087 18.41C9.44087 20 14.6109 20 19.3909 18.41C20.7409 17.96 21.3209 16.38 20.5909 15.16L19.3209 13.04C18.9709 12.46 18.6909 11.43 18.6909 10.76V8.66C18.6809 5 15.6809 2 12.0209 2Z" stroke="#828282" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" />
                  <path d="M15.3299 18.8198C15.3299 20.6498 13.8299 22.1498 11.9999 22.1498C11.0899 22.1498 10.2499 21.7698 9.64992 21.1698C9.04992 20.5698 8.66992 19.7298 8.66992 18.8198" stroke="#828282" stroke-width="1.5" stroke-miterlimit="10" />
                </svg>
                <span className="notif_dot">{this.state.notiFicationCount?this.state.notiFicationCount:'0'}</span>
              </button>
              <div className="user_img">  
              <img src={Adminprofile} />
              </div>

            </div>

          </div>
            </div>
          
          
          </div>
        </nav>
      </div>
    );
  }
}

export default Navbar;

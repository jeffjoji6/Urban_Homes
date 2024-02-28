import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { Link, useHistory } from "react-router-dom";
import config from "../../config/config";
import Logo from "../../assets/images/logo.png";

import "./StyleSheets/Sidebar.css";
function Sidebar(props) {
  const [active, setActive] = useState("");
  const [dropdownToggle, setDropDownToggle] = useState(false);
  const history = useHistory();
  useEffect(() => {
    setActive(props.location.pathname);
  }, [props.location.pathname, active]);

  const logOutFunction = () => {
    localStorage.removeItem("token");
    const apiUrl = `${config.Url}auth/logout`;
    const token = localStorage.getItem("token");
    fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 200) {
          localStorage.removeItem("token");
          history.push("/");
          console.log("Data received:", data.details);
        } else {
          console.error("Error fetching user data");
        }
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  };

  return (
    <div
      className="sidebar-container border-right main-sidebar"
      id="sticky-sidebar"
    >
      <nav id="sidebar" className={props.toggleClass}>
        <Link to="/dashboard" className="logo_navbar">
          <img src={Logo} />
        </Link>
        <ul className="list-unstyled components">
          <li className={active === "/dashboard" ? "active" : null}>
            <a href="/dashboard">
              <div className="menu-icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM5 19V5H11V19H5ZM19 19H13V12H19V19ZM19 10H13V5H19V10Z"
                    fill="#7A3C01"
                  />
                </svg>
              </div>
              <span className="menu-title">Dashboard</span>
            </a>
          </li>
          <li
            className="menu-item-has-children dropdown"
            onClick={() => setDropDownToggle(!dropdownToggle)}
          >
            <a
              href="#"
              className="dropdown-toggle"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <div className="menu-icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="25"
                  height="24"
                  viewBox="0 0 25 24"
                  fill="none"
                >
                  <path
                    d="M12.5 4C13.5609 4 14.5783 4.42143 15.3284 5.17157C16.0786 5.92172 16.5 6.93913 16.5 8C16.5 9.06087 16.0786 10.0783 15.3284 10.8284C14.5783 11.5786 13.5609 12 12.5 12C11.4391 12 10.4217 11.5786 9.67157 10.8284C8.92143 10.0783 8.5 9.06087 8.5 8C8.5 6.93913 8.92143 5.92172 9.67157 5.17157C10.4217 4.42143 11.4391 4 12.5 4ZM12.5 6C11.9696 6 11.4609 6.21071 11.0858 6.58579C10.7107 6.96086 10.5 7.46957 10.5 8C10.5 8.53043 10.7107 9.03914 11.0858 9.41421C11.4609 9.78929 11.9696 10 12.5 10C13.0304 10 13.5391 9.78929 13.9142 9.41421C14.2893 9.03914 14.5 8.53043 14.5 8C14.5 7.46957 14.2893 6.96086 13.9142 6.58579C13.5391 6.21071 13.0304 6 12.5 6ZM12.5 13C15.17 13 20.5 14.33 20.5 17V20H4.5V17C4.5 14.33 9.83 13 12.5 13ZM12.5 14.9C9.53 14.9 6.4 16.36 6.4 17V18.1H18.6V17C18.6 16.36 15.47 14.9 12.5 14.9Z"
                    fill="white"
                  />
                </svg>
              </div>
              Users
            </a>
            <ul
              className={
                dropdownToggle
                  ? "sub-menu children dropdown-menu show"
                  : "sub-menu children dropdown-menu"
              }
            >
              <li
                className={active === "/admin/Users/AllUsers" ? "active" : null}
              >
                <a href="/admin/Users/AllUsers">
                  <span className="menu-title">All Users</span>
                </a>
              </li>
              <li
                className={active === "/admin/Users/Allpost" ? "active" : null}
              >
                <a href="/admin/Users/AllPost">
                  <span className="menu-title">All post</span>
                </a>
              </li>
              <li
                className={
                  active === "/admin/Users/AllComments" ? "active" : null
                }
              >
                <a href="/admin/Users/AllComments">
                  <span className="menu-title">All Comments</span>
                </a>
              </li>
            </ul>
          </li>

          <li className={active === "/admin/Spam-Block " ? "active" : null}>
            <a href="/admin/Spam-Block ">
              <div className="menu-icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M11.9992 21.4877C17.239 21.4877 21.4867 17.24 21.4867 12.0002C21.4867 6.76039 17.239 2.5127 11.9992 2.5127C6.75942 2.5127 2.51172 6.76039 2.51172 12.0002C2.51172 17.24 6.75942 21.4877 11.9992 21.4877Z"
                    stroke="white"
                    stroke-width="1.5"
                  />
                  <path
                    d="M18.7085 18.7085L5.29102 5.29102"
                    stroke="white"
                    stroke-width="1.5"
                  />
                </svg>
              </div>
              <span className="menu-title">Spam Block </span>
            </a>
          </li>
          <li className={active === "/admin/Notification" ? "active" : null}>
            <a href="/admin/Notification">
              <div className="menu-icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M5 19C4.71667 19 4.479 18.904 4.287 18.712C4.095 18.52 3.99934 18.2827 4 18C4 17.7167 4.096 17.479 4.288 17.287C4.48 17.095 4.71734 16.9993 5 17H6V10C6 8.61667 6.41667 7.38734 7.25 6.312C8.08334 5.23667 9.16667 4.53267 10.5 4.2V3.5C10.5 3.08334 10.646 2.729 10.938 2.437C11.23 2.145 11.584 1.99934 12 2C12.4167 2 12.771 2.146 13.063 2.438C13.355 2.73 13.5007 3.084 13.5 3.5V4.2C14.8333 4.53334 15.9167 5.23767 16.75 6.313C17.5833 7.38834 18 8.61734 18 10V17H19C19.2833 17 19.521 17.096 19.713 17.288C19.905 17.48 20.0007 17.7173 20 18C20 18.2833 19.904 18.521 19.712 18.713C19.52 18.905 19.2827 19.0007 19 19H5ZM12 22C11.45 22 10.979 21.804 10.587 21.412C10.195 21.02 9.99934 20.5493 10 20H14C14 20.55 13.804 21.021 13.412 21.413C13.02 21.805 12.5493 22.0007 12 22ZM8 17H16V10C16 8.9 15.6083 7.95834 14.825 7.175C14.0417 6.39167 13.1 6 12 6C10.9 6 9.95834 6.39167 9.175 7.175C8.39167 7.95834 8 8.9 8 10V17Z"
                    fill="white"
                  />
                </svg>
              </div>
              <span className="menu-title">Notifications</span>
            </a>
          </li>

          <li className={active === "/admin/logout" ? "active" : null}>
            <a href="/">
              <div className="menu-icon">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M13 4.00894C13.0002 3.45665 12.5527 3.00876 12.0004 3.00854C11.4481 3.00833 11.0002 3.45587 11 4.00815L10.9968 12.0116C10.9966 12.5639 11.4442 13.0118 11.9965 13.012C12.5487 13.0122 12.9966 12.5647 12.9968 12.0124L13 4.00894Z"
                    fill="#000000"
                  />
                  <path
                    d="M4 12.9917C4 10.7826 4.89541 8.7826 6.34308 7.33488L7.7573 8.7491C6.67155 9.83488 6 11.3349 6 12.9917C6 16.3054 8.68629 18.9917 12 18.9917C15.3137 18.9917 18 16.3054 18 12.9917C18 11.3348 17.3284 9.83482 16.2426 8.74903L17.6568 7.33481C19.1046 8.78253 20 10.7825 20 12.9917C20 17.41 16.4183 20.9917 12 20.9917C7.58172 20.9917 4 17.41 4 12.9917Z"
                    fill="#1E90FF"
                  />
                </svg>
              </div>
              <span className="menu-title" onClick={logOutFunction}>
                Logout
              </span>
            </a>
          </li>
        </ul>

        {/* <ul className="list-unstyled CTAs">
           <li>
             <a
               href="https://bootstrapious.com/tutorial/files/sidebar.zip"
               className="download"
             >
               Download source
             </a>
           </li>
           <li>
             <a
               href="https://bootstrapious.com/p/bootstrap-sidebar"
               className="article"
             >
               Back to article
             </a>
           </li>
   </ul> */}
      </nav>
    </div>
  );
}

export default withRouter(Sidebar);

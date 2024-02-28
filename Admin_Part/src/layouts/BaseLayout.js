
import React, { Component } from "react";
import "./StyleSheets/BaseLayout.css";
import Sidebar from "../components/Sidebar/Sidebar";
import Navbar from "../components/Navbar/Navbar";
class BaseLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggleClass: ""
    };
  }
  onToggle = () => {
    if (this.state.toggleClass === "active") {
      this.setState({ toggleClass: "" });
    } else {
      this.setState({ toggleClass: "active" });
    }
  };
  render() {
    return (
      <div>
       
        <div className="wrapper">
          <div className="sidebar-container">
            <Sidebar toggleClass={this.state.toggleClass} />
          </div>

          <div id="content" className={this.state.toggleClass}>
          <Navbar onToggleClick={() => this.onToggle()} />
            <div className="layout-Container">{this.props.children}</div>

            <div className="container-fluid footer-container">
            
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default BaseLayout;

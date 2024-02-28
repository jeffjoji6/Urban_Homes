import React, { Component } from "react";
import Breadcrumb from "../../components/BreadCrumb/Breadcrumb";
class Tables extends Component {
  render() {
    const path = [
      {
        title: "Dashboard",
        url: "/dashboard"
      },
      {
        title: "Table",
        url: "/table"
      }
    ];
    return (
      <div className="main-content-container p-4 container-fluid">
        <Breadcrumb title={"Table"} path={path} />
        <div className="right-panel">
        55555
        </div>
      </div>
    );
  }
}

export default Tables;

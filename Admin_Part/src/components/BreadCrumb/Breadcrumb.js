
import React from "react";
import "./StyleSheets/Breadcrumb.css";

const Breadcrumb = props => {
  return (
    <div className="breadcrumbs">
      <div className="breadcrumbs-inner">
       
            <div className="page-header ">
              <div className="page-title">
                <ol className="breadcrumb">
                  {props.path.map((item, index) => (
                    <li key={index}>
                      <a href={item.url}>{item.title}</a>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
      </div>
    </div>
  );
};

export default Breadcrumb;

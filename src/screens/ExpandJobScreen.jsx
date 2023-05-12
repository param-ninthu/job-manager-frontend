import React from "react";
import { useParams } from "react-router-dom";
import "./../assets/css/expandJobScreen.css";

const ExpandJobScreen = () => {
  return (
    <div className="container">
      <div className="primary_container error">
        <div className="primary_container_header">
          <div className="primary_container_header_left">
            <h1>Job ID: 1</h1>
            <div className="primary_container_header_left_status">
              <div className="status-icon error"></div>
              <div className="status-error error">Failed</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpandJobScreen;

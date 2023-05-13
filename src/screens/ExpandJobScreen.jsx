import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./../assets/css/expandJobScreen.css";
import api from "./../api/axiosConfig";

import ErrorIcon from "@mui/icons-material/Error";
import CancelIcon from "@mui/icons-material/Cancel";
import ReadMoreIcon from "@mui/icons-material/ReadMore";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import user_1 from "./../assets/icons/user_1.png";
import user_2 from "./../assets/icons/user_2.png";
import user_3 from "./../assets/icons/user_3.png";
import user_4 from "./../assets/icons/user_4.png";
import def from "./../assets/icons/def.png";

const ExpandJobScreen = () => {
  const [job, setJob] = useState({});
  let { id } = useParams();
  const [jobStatus, setJobStatus] = useState("");

  useEffect(() => {
    const getJob = async () => {
      try {
        const response = await api.get(`/jobs/${id}`);
        setJob(response.data);
        setJobStatus(response.data.jobStatus);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getJob();
  }, []);

  const jobStatusLowercase = jobStatus.toLowerCase();

  const renderJobStatusIcon = (jobStatus) => {
    switch (jobStatus) {
      case "Completed":
        return <CheckCircleIcon className="status-icon completed" />;
      case "Failed":
        return <ErrorIcon className="status-icon failed" />;
      case "Cancelled":
        return <CancelIcon className="status-icon cancelled" />;
      default:
        return null;
    }
  };

  const renderUserIcon = (user) => {
    switch (user) {
      case "Dilhara Wijetunga":
        return (
          <>
            <img src={user_1} alt="user_1" className="usericon" />
          </>
        );
      case "Kevin Bird":
        return (
          <>
            <img src={user_2} alt="user_2" className="usericon" />
          </>
        );
      case "Buddhi Nimali Siripala":
        return (
          <>
            {" "}
            <img src={user_3} alt="user_3" className="usericon" />
          </>
        );
      case "Piyum Monarawila":
        return (
          <>
            <img src={user_4} alt="user_4" className="usericon" />
          </>
        );
      default:
        return (
          <>
            {" "}
            <img src={def} alt="default" className="usericon" />
          </>
        );
    }
  };

  const jobStatusCSS =
    "status-" + jobStatusLowercase + " " + jobStatusLowercase;
  return (
    <div className="container">
      <div className="primary_container ">
        <div className="primary_container_header">
          <div className="primary_container_header_left">
            <div className="jobtitle">
              <h1>Job ID: {id} </h1>
            </div>

            <div className="primary_container_header_left_status">
              <div className="status-icon">
                {renderJobStatusIcon(job.jobStatus)}
              </div>
              <div className={jobStatusCSS}> {job.jobStatus} </div>
            </div>
          </div>
        </div>
        <div className="primary_container_body">
          <div className="primary_container_body_left">
            <div className="primary_container_body_left_header">
              <div className="userdetails">
                <div>{renderUserIcon(job.owner)}</div>
                <div className="username">{job.owner}</div>
              </div>
            </div>
          </div>
          <div className="primary_container_body_bottom">
            <div className="primary_container_body_bottom_content">
              <div className="primary_container_body_bottom_content_header">
                Queued
              </div>
              <div className="primary_container_body_bottom_content_body">
                {job.queuedTime}
              </div>
            </div>
            <div className="primary_container_body_bottom_content">
              <div className="primary_container_body_bottom_content_header">
                Started
              </div>
              <div className="primary_container_body_bottom_content_body">
                {job.startTime}
              </div>
            </div>
            <div className="primary_container_body_bottom_content">
              <div className="primary_container_body_bottom_content_header">
                Ended
              </div>
              <div className="primary_container_body_bottom_content_body">
                {job.endTime}
              </div>
            </div>
            <div className="primary_container_body_bottom_content">
              <div className="primary_container_body_bottom_content_header">
                Duration
              </div>
              <div className="primary_container_body_bottom_content_body">
                {job.duration}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpandJobScreen;

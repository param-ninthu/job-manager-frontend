import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./../assets/css/expandJobScreen.css";
import api from "./../api/axiosConfig";

import ErrorIcon from "@mui/icons-material/Error";
import CancelIcon from "@mui/icons-material/Cancel";
import ReadMoreIcon from "@mui/icons-material/ReadMore";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

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
        return <ErrorIcon className="status-icon error" />;
      case "Cancelled":
        return <CancelIcon className="status-icon cancelled" />;
      default:
        return null;
    }
  };

  const jobStatusCSS = "status " + jobStatusLowercase + "label";
  return (
    <div className="container">
      <div className="primary_container ">
        <div className="primary_container_header">
          <div className="primary_container_header_left">
            <div className="jobtitle">
              <h1>Job ID: {id} </h1>
            </div>

            <div className="primary_container_header_left_status">
              <div className="status-icon ">
                {renderJobStatusIcon(job.jobStatus)}
              </div>
              <div className={jobStatusCSS}> {job.jobStatus} </div>
            </div>
          </div>
        </div>
        <div className="primary_container_body">
          <div className="primary_container_body_left">
            <div className="primary_container_body_left_header">
              <div className="jobtitle">
                <h1>Job Details</h1>
              </div>
              <div className="userdetails">
                <div>user icon</div>
                <div>{job.owner}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpandJobScreen;

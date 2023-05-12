import React, { useState, useEffect } from "react";
import api from "./../api/axiosConfig";
import "./../assets/css/jobsScreen.css";

import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import CancelIcon from "@mui/icons-material/Cancel";

const JobsScreen = () => {
  const [jobs, setJobs] = useState([]);
  const [size, setSize] = useState(10); // default size
  const [page, setPage] = useState(0); // default page
  const [totalPages, setTotalPages] = useState(0); // default totalPages
  const [currentPage, setCurrentPage] = useState(0); // default currentPage

  useEffect(() => {
    const getJobs = async () => {
      try {
        const response = await api.get(
          `/jobs?size=${size}&page=${currentPage}`
        );
        setTotalPages(response.data.totalPages);
        setJobs(response.data.content);
        // console.log(response.data.content);
      } catch (error) {
        console.log(error);
      }
    };

    getJobs();
  }, [currentPage, size]);

  const handlePrevPage = () => {
    if (currentPage < 0) {
      setCurrentPage(0);
    }
    setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
    setCurrentPage(currentPage + 1);
  };

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

  const renderJobStatusColor = (jobStatus) => {
    switch (jobStatus) {
      case "Completed":
        return (
          <>
            <div className="status-completed completed"> {jobStatus} </div>
          </>
        );
      case "Failed":
        return (
          <>
            <div className="status-error error"> {jobStatus} </div>
          </>
        );
      case "Cancelled":
        return (
          <>
            <div className="status-cancelled cancelled"> {jobStatus} </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="container">
      <h1 className="title">Jobs</h1>
      <div className="table_container">
        <table className="table">
          <thead className="table_head">
            <tr className="table_row">
              <th className="icon"></th>

              <th>Job Owner</th>
              <th>Job Name</th>
              <th>Job Status</th>
            </tr>
          </thead>
          <tbody className="table_body">
            {jobs.map((job) => (
              <tr className="table_row" key={job.id}>
                <td className="icon"> {renderJobStatusIcon(job.jobStatus)}</td>

                <td>{job.owner}</td>
                <td>{job.name}</td>
                <td>{renderJobStatusColor(job.jobStatus)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="footer">
        <div className="buttons">
          <div onClick={handlePrevPage} className="arrow">
            {" "}
            <KeyboardDoubleArrowLeftIcon />{" "}
          </div>

          <div className="subtitle">
            {currentPage + 1} of {totalPages}
          </div>
          <div onClick={handleNextPage} className="arrow">
            {" "}
            <KeyboardDoubleArrowRightIcon />{" "}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobsScreen;

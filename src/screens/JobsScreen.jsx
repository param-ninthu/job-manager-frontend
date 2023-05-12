import React, { useState, useEffect } from "react";
import api from "./../api/axiosConfig";
import "./../assets/css/jobsScreen.css";

import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";

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
        console.log(response.data.content);
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

  return (
    <div className="container">
      <h1 className="title">Jobs</h1>
      <div className="table_container">
        <table className="table">
          <thead className="table_head">
            <tr className="table_row">
              <th>Job Status</th>
              <th>Job Name</th>
              <th>Job Owner</th>
              <th>Job Status</th>
            </tr>
          </thead>
          <tbody className="table_body">
            {jobs.map((job) => (
              <tr className="table_row" key={job.id}>
                <td>{job.jobStatus}</td>
                <td>{job.name}</td>
                <td>{job.owner}</td>
                <td>{job.jobStatus}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="footer">
        <div onClick={handleNextPage}>
          {" "}
          <KeyboardDoubleArrowRightIcon />{" "}
        </div>
        <div className="subtitle">
          {currentPage + 1} of {totalPages}
        </div>
        <div onClick={handlePrevPage}>
          {" "}
          <KeyboardDoubleArrowLeftIcon />{" "}
        </div>
      </div>
    </div>
  );
};

export default JobsScreen;

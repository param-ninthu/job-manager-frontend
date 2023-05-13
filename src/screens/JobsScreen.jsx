import React, { useState, useEffect } from "react";
import api from "./../api/axiosConfig";
import "./../assets/css/jobsScreen.css";
import { Link } from "react-router-dom";

import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import CancelIcon from "@mui/icons-material/Cancel";
import ReadMoreIcon from "@mui/icons-material/ReadMore";
import SearchIcon from "@mui/icons-material/Search";

import user_1 from "./../assets/icons/user_1.png";
import user_2 from "./../assets/icons/user_2.png";
import user_3 from "./../assets/icons/user_3.png";
import user_4 from "./../assets/icons/user_4.png";
import def from "./../assets/icons/def.png";
import search from "./../assets/icons/search.png";

const JobsScreen = () => {
  const [jobs, setJobs] = useState([]);
  const [size, setSize] = useState(10); // default size
  const [page, setPage] = useState(0); // default page
  const [totalPages, setTotalPages] = useState(0); // default totalPages
  const [currentPage, setCurrentPage] = useState(0); // default currentPage
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const getJobs = async () => {
      try {
        const response = await api.get(
          `/jobs?size=${size}&page=${currentPage}&search=${searchTerm}`
        );
        setTotalPages(response.data.totalPages);
        setJobs(response.data.content);
        // console.log(response.data.content);
      } catch (error) {
        console.log(error);
      }
    };

    getJobs();
  }, [currentPage, size, searchTerm]);

  const handlePrevPage = () => {
    if (currentPage < 1) {
      setCurrentPage(0);
    } else {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
    setCurrentPage(currentPage + 1);
  };

  const handleFirstPage = () => {
    setCurrentPage(0);
  };

  const handleLastPage = () => {
    setCurrentPage(totalPages - 1);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(0);
  };

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
            <div className="status-failed failed"> {jobStatus} </div>
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

  return (
    <div className="container">
      <div className="table_container">
        <div className="searchbar">
          <div className="input-icon">
            <SearchIcon />
          </div>
          <div className="input-field">
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearch}
              placeholder="Search by job name"
              className="input-field"
            />
          </div>
        </div>
        <table className="table">
          <thead className="table_head">
            <tr className="table_row">
              <th className="icon"></th>
              <th className="owner-details">Job Owner</th>
              <th>Job Name</th>
              <th>Job Status</th>
              <th className="icon"> </th>
            </tr>
          </thead>
          <tbody className="table_body">
            {jobs.map((job) => (
              <tr className="table_row" key={job.id}>
                <td className="icon"> {renderJobStatusIcon(job.jobStatus)}</td>
                <td className="owner-details">
                  {" "}
                  {renderUserIcon(job.owner)} {job.owner}
                </td>
                <td>{job.name}</td>
                <td>{renderJobStatusColor(job.jobStatus)}</td>
                <td className="icon">
                  <Link to={`/${job.id}`} className="link">
                    <ReadMoreIcon />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="footer">
        <div className="size">
          <select
            className="select"
            onChange={(e) => {
              setSize(e.target.value);
              setCurrentPage(0);
            }}
          >
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>

            <option value="100">100</option>
          </select>
        </div>
        <div className="buttons">
          <div onClick={handleFirstPage} className="arrow">
            {" "}
            <KeyboardDoubleArrowLeftIcon />{" "}
          </div>
          <div onClick={handlePrevPage} className="arrow">
            {" "}
            <KeyboardArrowLeftIcon />{" "}
          </div>

          <div className="subtitle">
            {currentPage + 1} of {totalPages}
          </div>
          <div onClick={handleNextPage} className="arrow">
            {" "}
            <KeyboardArrowRightIcon />{" "}
          </div>
          <div onClick={handleLastPage} className="arrow">
            {" "}
            <KeyboardDoubleArrowRightIcon />{" "}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobsScreen;

import React, { useState, useEffect } from "react";
import api from "./../api/axiosConfig";

const JobsScreen = () => {
  const [jobs, setJobs] = useState([]);
  const [size, setSize] = useState(20); // default size
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
    <div>
      <h1>Jobs</h1>
      <div>
        <table>
          <thead>
            <tr>
              <th>Job Status</th>
              <th>Job Name</th>
              <th>Job Owner</th>
              <th>Job Status</th>
            </tr>
          </thead>
          <tbody>
            {jobs.map((job) => (
              <tr key={job.id}>
                <td>{job.jobStatus}</td>
                <td>{job.name}</td>
                <td>{job.owner}</td>
                <td>{job.jobStatus}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div>
        <div onClick={handlePrevPage}> - </div>
        <div onClick={handleNextPage}> + </div>
      </div>
    </div>
  );
};

export default JobsScreen;

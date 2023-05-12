import React from "react";
import api from "./../api/axiosConfig";
import { useState, useEffect } from "react";

const JobsScreen = () => {
  const [jobs, setJobs] = useState([]);
  const [size, setSize] = useState(20); // default size
  const [page, setPage] = useState(1); // default page
  const [totalPages, setTotalPages] = useState(0); // default totalPages
  const getJobs = async () => {
    try {
      const response = await api.get(`/jobs?size=${size}&page=${page}`);
      setTotalPages(response.data.totalPages);
      setJobs(response.data.content);
      //   console.log(response.data.content);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getJobs();
  }, []);

  return <div>JobsScreen</div>;
};

export default JobsScreen;

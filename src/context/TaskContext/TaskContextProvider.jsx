import React, { useEffect, useState } from "react";
import { taskContext } from "./TaskContext";
import { useAuthContext } from "../../Hooks/useAuthContext";
import axios from "axios";
const TaskContextProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const { userAuth } = useAuthContext();
  const token = userAuth?.userAuth;

  const fetchAllTasks = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/v1/task/all_tasks",
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      const res_data = await res.data;
      setTasks(res_data);
    } catch (err) {
      console.error("Error: ", err.response.data.message);
    }
  };

  useEffect(() => {
    if (userAuth?.role === "admin") {
      fetchAllTasks();
    }
  }, [userAuth]);


  return (
    <>
      <taskContext.Provider value={{ tasks, setTasks, fetchAllTasks }}>
        {children}
      </taskContext.Provider>
    </>
  );
};

export default TaskContextProvider;

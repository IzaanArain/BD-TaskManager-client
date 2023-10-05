import axios from "axios";
import { useEffect, useState } from "react";
import { useAuthContext } from "../Hooks/useAuthContext";

const UserApprovedTasks = () => {
    const [approvedTasks, setApprovedTasks] = useState([]);
    const { userAuth } = useAuthContext();
    const token = userAuth?.userAuth;

    const fetchApprovedTasks = async () => {
        try {
          const res = await axios.get(
            `http://localhost:5000/api/v1/task/freelancer_task_approved`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              }
            }
          );
          const res_data = await res.data;
          const task = res_data?.task;
          setApprovedTasks(task);
        } catch (err) {
          console.error("Error:", err.message);
        }
      };

      useEffect(() => {
        fetchApprovedTasks();
      }, []);
  return (
    <>
     <div className="tasks-page">
        <div className="task-table-con">
          <h1>Approved Tasks</h1>
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Description</th>
                <th>Amount</th>
                <th>Completion date</th>
                <th>Task Accepted</th>
                <th>Accepted date</th>
                <th>Freelancer completion date</th>
                <th>Task Approved</th>
              </tr>
            </thead>
            <tbody>
              {approvedTasks.map((task ,i) => {
                const taskId=task._id
                return (
                  <tr key={i}>
                    <td>{task.title}</td>
                    <td>{task.description}</td>
                    <td>{task.amount}</td>
                    <td>{task.completion_date}</td>
                    <td>{task?.task_accepted ? "Yes" : "No"}</td>
                    <td>{task.accepted_date}</td>
                    <td>{task?.freeLancer_completion}</td>
                    <td>{task?.isCompleted ? "Yes" : "No"}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

export default UserApprovedTasks
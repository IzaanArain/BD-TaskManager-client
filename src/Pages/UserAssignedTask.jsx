import axios from "axios";
import { useEffect, useState } from "react";
import { useAuthContext } from "../Hooks/useAuthContext";
const UserAssignedTask = () => {
  const [assignedTasks, setAssignedTasks] = useState([]);
  const { userAuth } = useAuthContext();
  const token = userAuth?.userAuth;

  const fetchAssignedTasks = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/v1/task/freelancer_task_assigned/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const res_data = await res.data;
      const task = res_data?.task;
      setAssignedTasks(task);
    } catch (err) {
      console.error("Error:", err.message);
    }
  };

  useEffect(() => {
    fetchAssignedTasks();
  }, []);

  const AcceptTaskApi = async (taskId) => {
    try {
      const res = await axios.put(
        `http://localhost:5000/api/v1/task/accept_task/`,
        null,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            task_id: taskId,
          },
        }
      );
      const res_data = await res.data;
      const task = res_data.task;
      return task;
    } catch (err) {
      throw err.response.data.message;
    }
  };

  const onSubmitAccept = (e, taskId) => {
    e.preventDefault();
    AcceptTaskApi(taskId)
      .then((task) => {
        fetchAssignedTasks()
      })
      .catch(() => {
        console.log("Error:", err);
      });
  };
  return (
    <>
      <div className="tasks-page">
        <div className="task-table-con">
          <h1>Assigned Tasks</h1>
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Description</th>
                <th>Amount</th>
                <th>Completion date</th>
                <th>Assigned date</th>
                <th>Task Accepted</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {assignedTasks.map((task,i) => {
                const taskId=task._id
                return (
                  <tr  key={i}>
                    <td>{task.title}</td>
                    <td>{task.description}</td>
                    <td>{task.amount}</td>
                    <td>{task.completion_date}</td>
                    <td>{task.assign_date}</td>
                    <td>{task?.task_accepted ? "Yes" : "No"}</td>
                    <td>
                      <div className="task-actions">
                        {task?.task_accepted ? null : (
                          <button id="task-action-btn" onClick={(e)=>onSubmitAccept(e,taskId)}>Accept</button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default UserAssignedTask;

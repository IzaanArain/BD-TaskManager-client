import axios from "axios";
import { useEffect, useState } from "react";
import { useAuthContext } from "../Hooks/useAuthContext";

const UserAcceptedTask = () => {
    const [acceptedTasks, setAcceptedTasks] = useState([]);
    const { userAuth } = useAuthContext();
    const token = userAuth?.userAuth;

    const fetchAcceptedTasks = async () => {
        try {
          const res = await axios.get(
            `http://localhost:5000/api/v1/task/freelancer_task_accepted`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              }
            }
          );
          const res_data = await res.data;
          const task = res_data?.task;
          setAcceptedTasks(task);
        } catch (err) {
          console.error("Error:", err.message);
        }
      };

      useEffect(() => {
        fetchAcceptedTasks();
      }, []);

      const TaskCompletedApi = async (taskId) => {
        try {
          const res = await axios.put(
            `http://localhost:5000/api/v1/task/task_completed`,
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
          const task = res_data?.task;
          return task;
        } catch (err) {
          throw err.response.data.message;
        }
      };

      const onSubmitComplete = (e, taskId) => {
        e.preventDefault();
        TaskCompletedApi(taskId)
          .then((task) => {
            fetchAcceptedTasks()
          })
          .catch((err) => {
            console.log("Error:", err);
          });
      };
  return (
    <>
     <div className="tasks-page">
        <div className="task-table-con">
          <h1>Accepted Tasks</h1>
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Description</th>
                <th>Amount</th>
                <th>Completion date</th>
                <th>Task Accepted</th>
                <th>Accepted date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {acceptedTasks.map((task ,i) => {
                const taskId=task._id
                return (
                  <tr key={i}>
                    <td>{task.title}</td>
                    <td>{task.description}</td>
                    <td>{task.amount}</td>
                    <td>{task.completion_date}</td>
                    <td>{task?.task_accepted ? "Yes" : "No"}</td>
                    <td>{task.accepted_date}</td>
                    <td>
                      <div className="task-actions">
                        {task?.isCompleted ? null : (
                          <button id="task-action-btn" onClick={(e)=>onSubmitComplete(e,taskId)}>Complete Task</button>
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
  )
}

export default UserAcceptedTask
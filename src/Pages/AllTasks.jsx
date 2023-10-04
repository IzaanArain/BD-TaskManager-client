import React from "react";
import { useTaskContext } from "../Hooks/useTaskContext";
const AllTasks = () => {
  const tasks = useTaskContext();
  return (
    <>
      <div className="tasks-page">
        <div className="task-table-con">
          <table>
            <thead>
              <tr>
                <th>title</th>
                <th>description</th>
                <th>amount</th>
                <th>Creation task</th>
                <th>Task completion date</th>
                <th>Status</th>
                <th>Assigned to</th>
                <th>Assigned date</th>
                <th>Task accepted</th>
                <th>Accepted date</th>
                <th>Task completed</th>
                <th>Freelancer completion date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task) => {
                return (
                  <tr key={task._id}>
                    <td>{task.title}</td>
                    <td>{task.description}</td>
                    <td>{task.amount}</td>
                    <td>{task.create_date}</td>
                    <td>{task.completion_date}</td>
                    <td>{task.status}</td>
                    <td>
                      {task?.result?.name ? task?.result?.name : "not assigned"}
                    </td>
                    <td>{task.assign_date}</td>
                    <td>{task.task_accepted ? "Yes" : "No"}</td>
                    <td>{task.accepted_date}</td>
                    <td>{task.isCompleted ? "Yes" : "No"}</td>
                    <td>{task.freeLancer_completion}</td>
                    <td>
                      <div className="task-actions">
                        {task.status === "todo" ? (
                          <button>assign</button>
                        ) : null}
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

export default AllTasks;

import React from "react";
import { useTaskContext } from "../Hooks/useTaskContext";
const AllTasks = () => {
  const tasks = useTaskContext();
  return (
    <>
      <table>
        <thead>
          <tr>
            <th>title</th>
            <th>description</th>
            <th>amount</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => {
            return (
              <tr>
                <td>{task.title}</td>
                <td>{task.description}</td>
                <td>{task.amount}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default AllTasks;

import Modal from "react-modal";
import { useEffect, useState } from "react";
import { AiFillCloseCircle as CloseIcon } from "react-icons/ai";
import { useUserContext } from "../Hooks/useUserContext";
import { useAuthContext } from "../Hooks/useAuthContext";
import axios from "axios";
import { useTaskContext } from "../Hooks/useTaskContext";
import { useNavigate } from "react-router-dom";

function UserAssignModal({ taskId,updateTasks }) {
  const [isModalOpen, setModalOpen] = useState(false);
  const users = useUserContext();
  const { userAuth} = useAuthContext();
  const {tasks,setTasks,fetchAllTasks}=useTaskContext()
  const token = userAuth?.userAuth;
  const [isError, setIsError] = useState("");

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };
  const assignTaskApi = async (userId, taskId) => {
    try {
      const res = await axios.put(
        `http://localhost:5000/api/v1/task/assign_task`,
        null,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
          params: {
            user_id: userId,
            task_id: taskId,
          },
        }
      );
      const res_data = await res.data;
      const {task}=res_data;
      return task
    } catch (err) {
      throw err.response.data.message;
    }
  };

  const assignTask = (e, userId, taskId) => {
    e.preventDefault();
    assignTaskApi(userId, taskId)
      .then((task) => {
        setTasks((prev)=>([...prev,task]))
        fetchAllTasks()
        closeModal();
      })
      .catch((err) => {
        console.error("Error:",err);
        setIsError(err);
      });
  };
  return (
    <div>
      <button onClick={openModal} id="task-action-btn">
        Assign to user
      </button>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="My Modal"
        appElement={document.getElementById("root")} // Set the app element here
      >
        <button onClick={closeModal} id="close-modal-btn">
          <CloseIcon />
        </button>
        <div className="task-table-con">
          {isError && <h1 id="error_block">{isError}</h1>}
          <table className="users-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>email</th>
                <th>phone</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {users?.map((user, index) => {
                const userId = user._id;
                return (
                  <tr key={index}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.phone}</td>
                    <td>
                      <div className="task-actions">
                        <button
                          id="task-action-btn"
                          onClick={(e) => assignTask(e, userId, taskId)}
                        >
                          Assign task
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Modal>
    </div>
  );
}

export default UserAssignModal;

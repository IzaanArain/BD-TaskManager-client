import axios from "axios";
import { useState } from "react";
import {
  BiTask as TaskLogo,
  BiSolidTimeFive as TimeLogo,
} from "react-icons/bi";
import { BsFillCalendarDateFill as CalenderLogo } from "react-icons/bs";
import { useAuthContext } from "../Hooks/useAuthContext";
import { useNavigate } from "react-router-dom";

const CreateTasks = () => {
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    completion_date: "",
  });
  const [amount, setAmount] = useState(0);
  const [isError, setIsError] = useState("");
  const { userAuth } = useAuthContext();
  const token = userAuth?.userAuth;
  const navigate = useNavigate();

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setNewTask((prev) => ({ ...prev, [name]: value }));
  };
  const formData = new FormData();
  formData.append("title", newTask.title);
  formData.append("description", newTask.description);
  formData.append("amount", amount);
  formData.append("completion_date", newTask.completion_date);

  const createTask = async (data) => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/v1/task/create_task",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            authorization: `Bearer ${token}`,
          },
        }
      );
      const res_data = await res.data;
    } catch (err) {
      //console.error("Error", err.response.data.message);
      //setIsError(err.response.data.message);
      throw err.response.data.message;
    }
  };

  const onSubmitTask = (e) => {
    e.preventDefault();
    createTask(formData)
      .then(() => {
        navigate("/all_tasks");
        setNewTask({
          title: "",
          description: "",
          completion_date: "",
        });
        setAmount(0);
      })
      .catch((err) => {
        console.error("Error", err);
        setIsError(err);
      });
  };
  return (
    <>
      <div className="submit_page">
        <div className="submit_form">
          <form onSubmit={onSubmitTask} encType="multipart/form-data">
            <div id="user_logo">
              <TaskLogo />
            </div>
            <div className="form_heading">
              <hr />
              <p>Create Task</p>
              <hr />
            </div>
            {isError && (
              <div id="error_block">
                <p>{isError}</p>
              </div>
            )}
            <div className="form-group">
              <label htmlFor="title">Title:</label>
              <input
                type="text"
                name="title"
                id="title"
                placeholder="task tile"
                value={newTask.title}
                onChange={onChangeHandler}
                required
              />
            </div>
            <div className="form-group-description">
              <label htmlFor="description">Description:</label>
              <textarea
                name="description"
                id="description"
                rows="5"
                value={newTask.description}
                onChange={onChangeHandler}
                required
              ></textarea>
            </div>
            <div className="form-group">
              <label htmlFor="amount">Amount:</label>
              <input
                type="number"
                name="amount"
                id="amount"
                placeholder="Enter amount $$"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
              />
            </div>
            <div className="form_heading">
              <hr />
              <p>Completion date</p>
              <hr />
            </div>
            <div className="form-group">
              <label htmlFor="completion_date">
                <CalenderLogo />|<TimeLogo />
              </label>
              <input
                type="datetime-local"
                name="completion_date"
                id="completion_date"
                value={newTask.completion_date}
                onChange={onChangeHandler}
                required
              />
            </div>
            <input type="submit" id="submit_btn" value="SUBMIT" />
          </form>
        </div>
      </div>
    </>
  );
};

export default CreateTasks;

import React, { useEffect } from "react";
import { useTaskContext } from "../Hooks/useTaskContext";
import UserAssignModal from "../components/UserAssignModal";
import axios from "axios";
import { useAuthContext } from "../Hooks/useAuthContext";

const AllTasks = () => {
  const {tasks,setTasks,fetchAllTasks} = useTaskContext();
  const {userAuth}=useAuthContext();
  const token=userAuth?.userAuth;
  // useEffect(()=>{
  //   fetchAllTasks()
  // },[])

  const TaskApproveApi=async(taskId,userId)=>{
    try{
      const res=await axios.put( `http://localhost:5000/api/v1/task/completion_approval`,
      null,
      {
       headers:{
        Authorization:`Bearer ${token}`
       },
       params:{
        user_id:userId,
        task_id:taskId
       }
      });
      const res_data=await res.data;
      const task=res_data?.task;
      return task;
    }catch(err){
      throw err.response.data.message;
    }
  }

  const onSubmitApprove=(e,taskId,userId)=>{
    e.preventDefault();
    TaskApproveApi(taskId,userId).then(()=>{
      fetchAllTasks()
    }).catch((err)=>{
      console.log("Error:", err);
    })
  }
  return (
    <>
      <div className="tasks-page">
        <div className="task-table-con">
          <table>
            <thead>
              <tr>
                <th>title</th>
                <th>description</th>
                <th>Task amount</th>
                <th>Creation task</th>
                <th>Task completion date</th>
                <th>Status</th>
                <th>Assigned to</th>
                <th>Assigned date</th>
                <th>Task accepted</th>
                <th>Accepted date</th>
                <th>Freelancer completion date</th>
                <th>Task Approved</th>
                <th>Late submission</th>
                <th>Paid Amount</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {tasks?.map((task,index) => {
                const taskId=task?._id
                const userId=task?.result?._id
                return (
                  <tr key={index} id={task.lateSubmission ? "late" : null}>
                    <td>{task.title}</td>
                    <td>{task.description}</td>
                    <td>{task.amount}</td>
                    <td>{task.create_date}</td>
                    <td>{task.completion_date}</td>
                    <td>{task.status}</td>
                    <td>
                      {task?.result ? task?.result?.email : "not assigned"}
                    </td>
                    <td>{task.assign_date}</td>
                    <td>{task.task_accepted ? "Yes" : "No"}</td>
                    <td>{task.accepted_date}</td>
                    <td>{task.freeLancer_completion}</td>
                    <td>{task.isCompleted ? "Yes" : "No"}</td>
                    <td>{task.lateSubmission ? "late" : "No"}</td>
                    <td>{task.paid_amount}</td>
                    <td>
                      <div className="task-actions">
                        {task.status === "todo" ? (
                          <UserAssignModal taskId={task._id}  updateTasks={setTasks}/>
                        ) : null}
                        {task.status === "completedByFreelancer" ? (
                          <button onClick={(e)=>onSubmitApprove(e,taskId,userId)} id="task-action-btn">Approve</button>
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

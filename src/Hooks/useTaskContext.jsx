import { useContext } from "react";
import { taskContext } from "../context/TaskContext/TaskContext";
export const useTaskContext=()=>{
    try{
        const {tasks,setTasks,fetchAllTasks}=useContext(taskContext)
        return {tasks,setTasks,fetchAllTasks};
    }catch(err){
        console.error("Error",err.message)
    }
}
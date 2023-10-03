import { useContext } from "react";
import { taskContext } from "../context/TaskContext/TaskContext";
export const useTaskContext=()=>{
    try{
        const  tasks=useContext(taskContext)
        return tasks;
    }catch(err){
        console.error("Error",err.message)
    }
}
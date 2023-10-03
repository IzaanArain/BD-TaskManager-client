import React, { useEffect, useState } from 'react'
import { taskContext } from './TaskContext'
import { useAuthContext } from '../../Hooks/useAuthContext'
import axios from 'axios';
const TaskContextProvider = ({children}) => {
    const [task,setTasks]=useState(null);
    const {userAuth}=useAuthContext();
    const token=userAuth?.userAuth;

    useEffect(()=>{
        const fetchAllTasks=async()=>{
            try{
                const res=await axios.get("http://localhost:5000/api/v1/task/all_tasks",{
                    headers:{
                        "authorization" : `Bearer ${token}`,
                    }
                });
                const res_data=await res.data;
                setTasks(res_data);
            }
            catch(err){
                console.error("Error: ",err.response.data.message);
            }
        }
        if(userAuth?.role==="admin"){
        fetchAllTasks()
        }
    },[])
  return (
    <>
    <taskContext.Provider value={task}>
        {children}
    </taskContext.Provider>
    </>
  )
}

export default TaskContextProvider
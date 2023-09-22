import { useContext } from "react";
import { userContext } from "../context/UsersContext/Context";

export const useUserContext=()=>{
    try{
        const user=useContext(userContext)
        // console.log(user)
        return user;
    }catch(err){
        console.error("Error",err.message)
    }
}
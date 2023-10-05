import { useContext } from "react";
import { authContext } from "../context/AuthContext/AuthContext";

export const useAuthContext=()=>{
    try{
        const {userAuth,setUserAuth}=useContext(authContext)
        return {userAuth,setUserAuth}
    }catch(err){
        console.error("Error",err.message)
    }
}
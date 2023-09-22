import { useContext } from "react";
import { authContext } from "../context/AuthContext/AuthContext";

export const useAuthContext=()=>{
    try{
        const {userAuth,setUserAuth}=useContext(authContext)
        // console.log(setUserAuth)
        return {userAuth,setUserAuth}
    }catch(err){
        console.error("Error",err.message)
    }
}
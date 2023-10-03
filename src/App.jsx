import Home from "./Pages/Home";
import Register from "./Pages/Register";
import LoginPage from "./Pages/LoginPage";
import EditUser from "./Pages/EditUser";
import NotFound from "./Pages/NotFound";
import OtpVerify from "./Pages/OtpVerify";
import CompleteProfile from "./Pages/CompleteProfile";
import RoleRegister from "./Pages/RoleRegister";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import NavBar from "./components/NavBar";
import { useAuthContext } from "./Hooks/useAuthContext";

import Layout from "./components/Layout";

function App() {
  const { userAuth } = useAuthContext();
  const token = userAuth?.userAuth;
  return (
    <>
    <Layout/>
    </>
  );
}

export default App;

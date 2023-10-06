import Home from "../Pages/Home";
import Register from "../Pages/Register";
import LoginPage from "../Pages/LoginPage";
import EditUser from "../Pages/EditUser";
import NotFound from "../Pages/NotFound";
import OtpVerify from "../Pages/OtpVerify";
import CompleteProfile from "../Pages/CompleteProfile";
import RoleRegister from "../Pages/RoleRegister";
import CreateTasks from "../Pages/CreateTasks";
import AllTasks from "../Pages/AllTasks";
import UserAssignedTask from "../Pages/UserAssignedTask";
import UserAcceptedTask from "../Pages/UserAcceptedTask";
import UserApprovedTasks from "../Pages/UserApprovedTasks";
import SimpleOtpVerify from "../Pages/SimpleOtpVerify";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import Footer from "./Footer";
import { useAuthContext } from "../Hooks/useAuthContext";

const Layout = () => {
  const { userAuth } = useAuthContext();
  const token = userAuth?.userAuth;
  return (
    <>
      <BrowserRouter>
        <NavBar />
        {token && userAuth?.isComplete ? (
          <Routes>
            <Route
              path="/complete_profile"
              element={
                userAuth?.isComplete ? (
                  <Navigate to="/edit" />
                ) : (
                  <CompleteProfile />
                )
              }
            />
            <Route
              path="/users"
              element={
                userAuth?.role === "admin" ? <Home /> : <Navigate to="/edit" />
              }
            />
            <Route path="/edit" element={<EditUser />} />
            <Route
              path="/create_task"
              element={
                userAuth.role === "admin" ? (
                  <CreateTasks />
                ) : (
                  <Navigate to="/edit" />
                )
              }
            />
            <Route
              path="/all_tasks"
              element={
                userAuth.role === "admin" ? (
                  <AllTasks />
                ) : (
                  <Navigate to="/edit" />
                )
              }
            />
            <Route
              path="/assigned_task"
              element={
                userAuth.role === "user" ? (
                  <UserAssignedTask />
                ) : (
                  <Navigate to="/users" />
                )
              }
            />
            <Route
              path="/accepted_task"
              element={
                userAuth.role === "user" ? (
                  <UserAcceptedTask />
                ) : (
                  <Navigate to="/users" />
                )
              }
            />
            <Route
              path="/approved_task"
              element={
                userAuth.role === "user" ? (
                  <UserApprovedTasks />
                ) : (
                  <Navigate to="/users" />
                )
              }
            />
            <Route path="*" element={<Navigate to="/edit" />} />
          </Routes>
        ) : token && userAuth?.isComplete===false ? (
          <Routes>
            <Route path="/complete_profile" element={<CompleteProfile />} />
            <Route path="*" element={<Navigate to="/complete_profile" />} />
          </Routes>
        ) : (
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/role_register" element={<RoleRegister />} />
            <Route path="/otp_verify" element={<OtpVerify />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/simple_otp_verify" element={<SimpleOtpVerify/>}/>
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        )}
        {/* <Footer/> */}
      </BrowserRouter>
    </>
  );
};

export default Layout;

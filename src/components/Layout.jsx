import Home from "../Pages/Home";
import Register from "../Pages/Register";
import LoginPage from "../Pages/LoginPage";
import EditUser from "../Pages/EditUser";
import NotFound from "../Pages/NotFound";
import OtpVerify from "../Pages/OtpVerify";
import CompleteProfile from "../Pages/CompleteProfile";
import RoleRegister from "../Pages/RoleRegister";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import { useAuthContext } from "../Hooks/useAuthContext";

const Layout = () => {
  const { userAuth } = useAuthContext();
  const token = userAuth?.userAuth;
  return (
    <>
      <BrowserRouter>
        <NavBar />
        <Routes>
          {token ? (
            <>
              <Route path="/complete_profile" element={<CompleteProfile />} />
              <Route path="/users" element={userAuth.role==="admin" ? <Home /> : <Navigate to="/edit"/>} />
              <Route path="/edit" element={<EditUser />} />
            </>
          ) : (
            <>
              <Route path="/register" element={<Register />} />
              <Route path="/role_register" element={<RoleRegister />} />
              <Route path="/otp_verify" element={<OtpVerify />} />
              <Route path="/login" element={<LoginPage />} />
            </>
          )}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default Layout;

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

function App() {
  const { userAuth } = useAuthContext();
  const token = userAuth?.userAuth;
  return (
    <>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route
            path="/"
            element={
              token && userAuth?.role === "admin" ? (
                <Home />
              ) : (
                <Navigate to="/edit" />
              )
            }
          />
          <Route
            path="/register"
            element={token ? <Navigate to="/edit" /> : <Register />}
          />
          <Route
            path="/login"
            element={
              token && userAuth.role === "user" ? (
                <Navigate to="/edit" />
              ) : token && userAuth.role === "admin" ? (
                <Navigate to="/" />
              ) : (
                <LoginPage />
              )
            }
          />
          <Route
            path="/edit"
            element={
              token && userAuth.isComplete === true ? (
                <EditUser />
              ) : token && userAuth.isComplete === false ? (
                <Navigate to="/complete_profile" />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/otp_verify"
            element={token ? <Navigate to="/edit" /> : <OtpVerify />}
          />
          <Route
            path="/complete_profile"
            element={token ? <CompleteProfile /> : <Navigate to="/login" />}
          />
          <Route
            path="/role_register"
            element={token ? <Navigate to="/edit" /> : <RoleRegister />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

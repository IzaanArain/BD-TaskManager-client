import Register from "./Pages/Register";
import LoginPage from "./Pages/LoginPage";
import EditUser from "./Pages/EditUser";
import NotFound from "./Pages/NotFound";
import OtpVerify from "./Pages/OtpVerify";
import CompleteProfile from "./Pages/CompleteProfile";
import Home from "./Pages/Home";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import NavBar from "./components/NavBar";
import { useAuthContext } from "./Hooks/useAuthContext";

function App() {
  const {userAuth}= useAuthContext();
  const token = userAuth.userAuth;
  // console.log("token: ", token);
  // console.log("user: ", userAuth);
  return (
    <>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={token ? <Home /> : <Navigate to="/login"/>} />
          <Route path="/register" element={token ?  <Navigate to="/"/>:  <Register />} />
          <Route path="/login" element={token ? <Navigate to="/"/>:<LoginPage /> } />
          <Route path="/edit" element={token ? <EditUser /> : <Navigate to="/login"/>} />
          <Route path="/otp_verify" element={<OtpVerify/>}/>
          <Route path="/complete_profile" element={<CompleteProfile/>}/>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

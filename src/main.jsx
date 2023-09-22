import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import ContextProvider from "./context/UsersContext/ContextProvider.jsx";
import AuthContextProvider from "./context/AuthContext/AuthContextProvider.jsx";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthContextProvider>
      <ContextProvider>
        <App />
      </ContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);

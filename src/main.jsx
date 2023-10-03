import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import ContextProvider from "./context/UsersContext/ContextProvider.jsx";
import AuthContextProvider from "./context/AuthContext/AuthContextProvider.jsx";
import TaskContextProvider from "./context/TaskContext/TaskContextProvider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthContextProvider>
      <TaskContextProvider>
        <ContextProvider>
          <App />
        </ContextProvider>
      </TaskContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);

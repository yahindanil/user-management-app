import "./App.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import UserManagementTable from "./components/UserManagementTable";
import { createBrowserHistory } from "history";

function App() {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/userManagementTable" element={<UserManagementTable />} />
      </Routes>
    </Router>
  );
}

export default App;

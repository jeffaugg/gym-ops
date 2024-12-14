import React from "react";
import Sidebar from "../../../components/Admin/Sidebar/Sidebar";
import Topbar from "../../../components/Topbar/Topbar";
import Dashboard from "../../../components/Admin/Home/Dashboard/Dashboard";
import "./AdminHome.css";

function AdminHome() {
  return (
    <div className="admin-home">
      <Sidebar />
      <div className="dashboard-container">
        <Topbar/>
        <Dashboard />
      </div>
    </div>
  );
}

export default AdminHome;

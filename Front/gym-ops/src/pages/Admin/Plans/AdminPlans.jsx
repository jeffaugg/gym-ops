import React from "react";
import Sidebar from "../../../components/Admin/Sidebar/Sidebar";
import Topbar from "../../../components/Topbar/Topbar";
import "./AdminPlans.css";

function AdminPlans() {
  return (
    <div className="plans">
      <Sidebar />
      <div className="main-content">
        <Topbar />
        <div className="content-container">
          <header className="header">
            <h1></h1>
          </header>
        </div>
      </div>
    </div>
  );
}

export default AdminPlans;

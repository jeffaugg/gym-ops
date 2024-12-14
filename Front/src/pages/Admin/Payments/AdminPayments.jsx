import React from "react";
import Sidebar from "../../../components/Admin/Sidebar/Sidebar";
import Topbar from "../../../components/Topbar/Topbar";
import "./AdminPayments.css";

function AdminPayments() {
  return (
    <div className="payments">
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

export default AdminPayments;

import React from "react";
import Sidebar from "../../components/Admin/Sidebar/Sidebar";
import Topbar from "../../components/Topbar/Topbar";
import "./Settings.css";

function Settings() {
  return (
    <div className="settings">
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

export default Settings;

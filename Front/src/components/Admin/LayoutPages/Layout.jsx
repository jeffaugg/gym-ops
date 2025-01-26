import React from "react";
import Sidebar from "../Sidebar/Sidebar";
import Topbar from "../../Topbar/Topbar";
import "./Layout.css";

function Layout({ children }) {
  return (
    <div className="layout">
      <Topbar />
      <div className="main-layout">
        <Sidebar />
        <div className="content">{children}</div>
      </div>
    </div>
);
}

export default Layout;

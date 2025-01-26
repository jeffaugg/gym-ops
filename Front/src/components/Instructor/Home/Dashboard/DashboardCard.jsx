import React from "react";
import "./Dashboard.css";
import { FaEye } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";

function DashboardCard({ title, items }) {
  return (
    <div className="dashboard-card">
      <h4>{title}</h4>
      <ul>
        {items.map((item, index) => (
          <li key={index}>
            <span className="user-icon"><FaUserCircle  color="#1a1a7d"/></span>
            {item}
            <FaEye color="#1a1a7d" onClick={""}/>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DashboardCard;

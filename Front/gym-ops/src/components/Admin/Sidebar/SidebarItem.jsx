import React from "react";
import { NavLink } from "react-router-dom";
import "./Sidebar.css";

function SidebarItem({ name, icon: Icon, path, className = "" }) {
  return (
    <NavLink
      to={path}
      className={({ isActive }) =>
        `${className} sidebar-item ${isActive ? "active" : ""}`
      }
    >
      <div className="icon-wrapper">
        <Icon size={20} />
      </div>
      {name && <span>{name}</span>}
    </NavLink>
  );
}

export default SidebarItem;

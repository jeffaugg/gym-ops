import React from "react";
import { NavLink } from "react-router-dom";
import "./Sidebar.css";

function SidebarItem({ name, icon: Icon, path }) {
  return (
    <NavLink
      to={path}
      className={({ isActive }) =>
        isActive ? "sidebar-item active" : "sidebar-item"
      }
    >
      <div className="icon-wrapper">
        <Icon size={20} />
      </div>
      <span>{name}</span>
    </NavLink>
  );
}

export default SidebarItem;

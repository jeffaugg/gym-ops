import React from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import "./Sidebar.css";
import { toast } from 'react-toastify'; 


function SidebarItem({ name, icon: Icon, path, className = "" }) {
  const navigate = useNavigate();
  const location = useLocation();

  
  const handleLogout = () => {
    if (name === "Sair") {
      const rememberMe = localStorage.getItem("rememberMe") === "true";

      localStorage.removeItem("token");
      localStorage.removeItem("user");

      if (!rememberMe) {
        localStorage.removeItem("email");
        localStorage.removeItem("rememberMe");
      }

      sessionStorage.clear();

      toast.info('Você foi desconectado!', {
        position: 'top-right',
      });
      navigate("/");
    };
  }

  return (
    <NavLink
      to={path}
      onClick={handleLogout} 
      className={({ isActive }) =>
        `${className} sidebar-item ${isActive && location.pathname === path ? "active" : ""}`
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

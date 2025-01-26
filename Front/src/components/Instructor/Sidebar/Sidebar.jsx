import React from "react";
import { FiLogOut } from "react-icons/fi";
import { TbRulerMeasure2 } from "react-icons/tb";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { BsPeople } from "react-icons/bs";
import { FaRegCalendarCheck } from "react-icons/fa";
import { IoCogSharp } from "react-icons/io5";
import SidebarItem from "./SidebarItem";
import UserProfile from "../../UserProfile/UserProfile";
import "./Sidebar.css";

function Sidebar() {
  const user =
    JSON.parse(localStorage.getItem("user")) ||
    JSON.parse(sessionStorage.getItem("user")) || {
      name: "Instrutor",
      email: "instrutor@exemplo.com",
      avatar: "https://via.placeholder.com/50", 
    };

  const menuItems = [
    { name: "Painel", icon: MdOutlineSpaceDashboard, path: "/instructor" },
    { name: "Alunos", icon: BsPeople, path: "/instructor/students" },
    { name: "Avaliação Fisica", icon: TbRulerMeasure2, path: "/instructor/PhysicalAssessment" },
    { name: "Registrar Frequência", icon: FaRegCalendarCheck, path: "/instructor/presence" },
  ];

  return (
    <div className="sidebar">
      <UserProfile 
        name={user.name} 
        email={user.email} 
        avatar={user.avatar} 
      />
      <div className="menu-items">
        {menuItems.map((item) => (
          <SidebarItem key={item.name} {...item} />
        ))}
      </div>
      <div className="footer">
        <SidebarItem name="Sair" icon={FiLogOut} path="/" />
        <SidebarItem name="" icon={IoCogSharp} path="/settings" />
      </div>
    </div>
  );
}

export default Sidebar;

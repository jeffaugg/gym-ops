import React from "react";
import { FiLogOut } from "react-icons/fi";
import { IoBarbellOutline } from "react-icons/io5";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { BsPeople, BsEnvelopePaper, BsCreditCard } from "react-icons/bs";
import { IoCogSharp } from "react-icons/io5";
import { LuNotebookPen } from "react-icons/lu";
import SidebarItem from "./SidebarItem";
import UserProfile from "../../UserProfile/UserProfile";
import "./Sidebar.css";

function Sidebar() {
  const user =
    JSON.parse(localStorage.getItem("user")) ||
    JSON.parse(sessionStorage.getItem("user")) || {
      name: "Administrador",
      email: "admin@exemplo.com",
      avatar: "https://via.placeholder.com/50", 
    };

  const menuItems = [
    { name: "Painel", icon: MdOutlineSpaceDashboard, path: "/admin" },
    { name: "Alunos", icon: BsPeople, path: "/admin/students" },
    { name: "Avisos", icon: BsEnvelopePaper, path: "/admin/warnings" },
    { name: "Planos", icon: LuNotebookPen, path: "/admin/plans" },
    { name: "Pagamentos", icon: BsCreditCard, path: "/admin/payments" },
    { name: "Instrutores", icon: IoBarbellOutline, path: "/admin/instructors" },
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

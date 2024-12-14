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
  const menuItems = [
    { name: "Painel", icon: MdOutlineSpaceDashboard, path: "/adminhome" },
    { name: "Alunos", icon: BsPeople, path: "/students" },
    { name: "Avisos", icon: BsEnvelopePaper, path: "/adminwarnings" },
    { name: "Planos", icon: LuNotebookPen, path: "/adminplans" },
    { name: "Pagamentos", icon: BsCreditCard, path: "/adminpayments" },
    { name: "Instrutores", icon: IoBarbellOutline, path: "/admininstructors" },
  ];

  return (
    <div className="sidebar">
      <UserProfile
        name="Administrator Name"
        email="john.doe@example.com"
        avatar="https://via.placeholder.com/50"
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

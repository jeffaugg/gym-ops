// import React from "react";
// import { NavLink } from "react-router-dom";
// import "./Sidebar.css";

// function SidebarItem({ name, icon: Icon, path, className = "" }) {
//   return (
//     <NavLink
//       to={path}
//       className={({ isActive }) =>
//         `${className} sidebar-item ${isActive ? "active" : ""}`
//       }
//     >
//       <div className="icon-wrapper">
//         <Icon size={20} />
//       </div>
//       {name && <span>{name}</span>}
//     </NavLink>
//   );
// }

// export default SidebarItem;

import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./Sidebar.css";
import { toast } from 'react-toastify'; // Importa o Toastify


function SidebarItem({ name, icon: Icon, path, className = "" }) {
  const navigate = useNavigate();

  // Lógica de Logout
  const handleLogout = () => {
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

  return (
    <NavLink
      to={path}
      onClick={handleLogout} // Adiciona a lógica de logout ao clique
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

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

function SidebarItem({ name, icon: Icon, path, className = "" }) {
  const navigate = useNavigate();

  // Lógica de Logout
  const handleLogout = (e) => {
    if (name === "Sair") {
      e.preventDefault(); // Evita o redirecionamento padrão do NavLink
      localStorage.clear(); // Limpa os dados armazenados no localStorage
      navigate("/"); // Redireciona para a página de login
    }
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

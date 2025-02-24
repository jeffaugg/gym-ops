import React from "react";
import { useLocation } from "react-router-dom";
import "./Settings.css";
import LayoutAdmin from "../../components/Admin/LayoutPages/Layout";
import SettingsFormAdmin from "../../components/Admin/SettingsForm/SettingsForm";
import LayoutInstructor from "../../components/Instructor/LayoutPages/Layout";
import SettingsFormInstructor from "../../components/Instructor/SettingsForm/SettingsForm";

function Settings() {
  const location = useLocation();

  const isAdmin = location.pathname === "/admin/settings";
  const isInstructor = location.pathname === "/instructor/settings";

  if (isAdmin) {
    return (
      <LayoutAdmin>
        <div className="settings-content">
          <header className="settings-header">
            <h1>Editar Perfil (Admin)</h1>
          </header>
          <SettingsFormAdmin />
        </div>
      </LayoutAdmin>
    );
  }

  if (isInstructor) {
    return (
      <LayoutInstructor>
        <div className="settings-content">
          <header className="settings-header">
            <h1>Editar Perfil (Instrutor)</h1>
          </header>
          <SettingsFormInstructor />
        </div>
      </LayoutInstructor>
    );
  }

  return <h1>Página não encontrada</h1>;
}

export default Settings;

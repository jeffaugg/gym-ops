import React, { useState, useEffect } from "react";
import "./Settings.css";
import Layout from "../../components/LayoutPages/Layout";
import SettingsForm from "../../components/Admin/SettingsForm/SettingsForm";

function Settings() {
  return (
    <Layout>
      <div className="settings-content">
        <header className="settings-header">
          <h1>Editar Perfil</h1>
        </header>
        <SettingsForm/>
      </div>
    </Layout>
  );
}

export default Settings;

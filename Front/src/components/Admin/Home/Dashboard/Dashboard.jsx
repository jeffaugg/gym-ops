import React from "react";
import DashboardCard from "./DashboardCard";
import TopFrequentUsers from "../TopFrequentUsers/TopFrequentUsers";
import "./Dashboard.css";

function Dashboard() {
  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <DashboardCard title="Últimos registros" items={["Juan Dela Cruz", "Juan Dela Cruz", "Juan Dela Cruz"]} />
        <DashboardCard title="Últimos alunos" items={["Juan Dela Cruz", "Juan Dela Cruz", "Juan Dela Cruz"]} />
        <DashboardCard title="Instrutores ativos" items={["Juan Dela Cruz", "Juan Dela Cruz", "Juan Dela Cruz"]} />
      </div>

      <div className="dashboard-stats">
        <div className="chart">
          <h3>278 pessoas</h3>
          <p>Na semana (07/11 - 14/11)</p>
          {/* Aqui você pode integrar um gráfico real usando Chart.js ou Recharts */}
          <div className="fake-chart">[Gráfico de Barras]</div>
        </div>
        <div className="chart">
          <h3>Balanço Mensal</h3>
          {/* Aqui você pode integrar um gráfico real */}
          <div className="fake-chart">[Gráfico de Linha]</div>
        </div>
      </div>

      <TopFrequentUsers />
    </div>
  );
}

export default Dashboard;
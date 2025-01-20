import React from "react";
import DashboardCard from "./DashboardCard";
import TopFrequentUsers from "../TopFrequentUsers/TopFrequentUsers";
import Balance from "../Balance/Balance";
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
          <h3>Acessos</h3>
          <div className="fake-chart">
            [Gráfico de Barras]
          </div>
        </div>
        <div className="chart">
          <div className="fake-chart">
            <Balance />
          </div>
        </div>
      </div>

      <TopFrequentUsers />
    </div>
  );
}

export default Dashboard;

import React, { useEffect, useState } from "react";
import DashboardCard from "./DashboardCard";
import TopFrequentUsers from "../TopFrequentUsers/TopFrequentUsers";
import ChartComponent from "../ChartComponent/ChartComponent";
import api from "../../../../api";
import "./Dashboard.css";

function Dashboard() {
  const [recentFrequencyData, setRecentFrequencyData] = useState([]);
  const [recentRecordsData, setRecentRecordsData] = useState([]);
  const [instructorsNow, setInstructorsNowData] = useState([]);
  const [ranked, setRanked] = useState([]);
  // Função para fazer a requisição para /report/recent-frequency
  const fetchRecentFrequency = async () => {
    try {
      const response = await api.get("/report/recent-frequency", {
        params: {
          limit: 3,  // Limite de itens por página
        }
      });
      setRecentFrequencyData(response.data); // Supondo que a resposta seja um array de registros
    } catch (error) {
      console.error("Erro ao buscar dados de frequência", error);
    }
  };
  const fetchRecentRecords = async () => {
    try {
      const response = await api.get("/report/recent", {
        params: {
          limit: 3,  // Limite de itens por página
        }
      });
      setRecentRecordsData(response.data); // Supondo que a resposta seja um array de registros
    } catch (error) {
      console.error("Erro ao buscar dados de frequência", error);
    }
  };
  const fetchInstructorsNow = async () => {
    try {
      const response = await api.get("/report/now", {
        params: {
          limit: 3,  // Limite de itens por página
        }
      });
      setInstructorsNowData(response.data); // Supondo que a resposta seja um array de registros
    } catch (error) {
      console.error("Erro ao buscar dados de frequência", error);
    }
  };
  const fetchRanked = async () => {
    try {
      const response = await api.get("/report/rank", {
        params: {
          limit: 5,  // Limite de itens por página
        }
      });
      setRanked(response.data); // Supondo que a resposta seja um array de registros
    } catch (error) {
      console.error("Erro ao buscar dados de frequência", error);
    }
  };

  useEffect(() => {
    fetchRecentFrequency();
    fetchRecentRecords();
    fetchInstructorsNow();
    fetchRanked();
  }, []); // O useEffect é chamado uma vez quando o componente for montado

  return (
    <div className="dashboard">
      <div className="dashboard-header">

        
        <DashboardCard title="Últimos registros" items={recentFrequencyData.map((item) => item.name)} />
        <DashboardCard title="Últimos alunos" items={recentRecordsData.map((item) => item.name)} />
        <DashboardCard title="Instrutores ativos" items={instructorsNow.map((item) => item.name)} />
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
            <ChartComponent 
              title="Balanço de Pagamentos"
              endpoint="/report/balance"  
              label="Pagamentos"
            />
          </div>
        </div>
      </div>

      <TopFrequentUsers users={ranked}/>
    </div>
  );
}

export default Dashboard;

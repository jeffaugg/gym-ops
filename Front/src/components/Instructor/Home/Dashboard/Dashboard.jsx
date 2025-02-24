import React, { useEffect, useState } from "react";
import DashboardCard from "./DashboardCard";
import TopFrequentUsers from "../../../Admin/Home/TopFrequentUsers/TopFrequentUsers";
import api from "../../../../api";
import "./Dashboard.css";

function Dashboard() {
  const [recentFrequencyData, setRecentFrequencyData] = useState([]);
  const [recentRecordsData, setRecentRecordsData] = useState([]);
  const [instructorsNow, setInstructorsNowData] = useState([]);
  const [ranked, setRanked] = useState([]); 

  const fetchRecentFrequency = async () => {
    try {
      const response = await api.get("/report/recent-frequency", {
        params: {
          limit: 3, 
        }
      });
      setRecentFrequencyData(response.data); 
    } catch (error) {
      console.error("Erro ao buscar dados de frequência", error);
    }
  };
  const fetchRecentRecords = async () => {
    try {
      const response = await api.get("/report/recent", {
        params: {
          limit: 3,  
        }
      });
      setRecentRecordsData(response.data); 
    } catch (error) {
      console.error("Erro ao buscar dados de frequência", error);
    }
  };
  const fetchInstructorsNow = async () => {
    try {
      const response = await api.get("/report/now", {
        params: {
          limit: 3,  
        }
      });
      setInstructorsNowData(response.data); 
    } catch (error) {
      console.error("Erro ao buscar dados de frequência", error);
    }
  };
  const fetchRanked = async () => {
    try {
      const response = await api.get("/report/rank", {
        params: {
          limit: 5,  
        }
      });
      setRanked(response.data);
    } catch (error) {
      console.error("Erro ao buscar dados de frequência", error);
    }
  };

  useEffect(() => {
    fetchRecentFrequency();
    fetchRecentRecords();
    fetchInstructorsNow();
    fetchRanked();
  }, []); 

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <DashboardCard title="Últimos registros" items={recentFrequencyData.map((item) => item.name)} />
        <DashboardCard title="Últimos alunos" items={recentRecordsData.map((item) => item.name)} />
      </div>

      <TopFrequentUsers users={ranked}/>
    </div>
  );
}


export default Dashboard;
import React, {useState, useEffect} from "react";
import "./AdminWarnings.css";
import WarningForm from "../../../components/Admin/WarningForm/WarningForm";
import WarningTable from "../../../components/Admin/WarningTable/WarningTable";
import Layout from "../../../components/LayoutPages/Layout";
import api from "../../../api";
import { toast } from "react-toastify";

function AdminWarnings() {
  const [warnings, setWarnings] = useState([]); // Estado para armazenar os planos

  // Função para buscar os planos
  const fetchWarnings = async () => {
    try {
      const response = await api.get("/message");
      const sortedwarnings = response.data.sort((a, b) => b.id - a.id);
      setWarnings(sortedwarnings);
    } catch (error) {
      console.error("Erro ao buscar as mensagens:", error);
      toast.error("Erro ao buscar as mensagens.");
    }
  };

  // Carrega os alunos ao montar o componente
  useEffect(() => {
    console.log("fetching warnings");
    fetchWarnings();
    console.log("warnings fetched");
  }, []);


  return (
    <Layout>
      <div className="warnings-content">
        <header className="warnings-header">
          <h1>Escreva uma mensagem</h1>
        </header>

        <WarningForm onWarningCreated={fetchWarnings}/>
        <WarningTable warnings={warnings} />
      </div>
    </Layout>
  );
}

export default AdminWarnings;
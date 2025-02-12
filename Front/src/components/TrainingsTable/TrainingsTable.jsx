import React, { useEffect, useState } from "react";
import "./TrainingsTable.css";
import { toast } from "react-toastify";
import api from "../../api";

export default function TrainingsTable({ fetchAssociations }) {
  const [associations, setAssociations] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchAssociationsData = async () => {
    setLoading(true);
    try {
      const response = await api.get("/workouts-clients");

      const associationsWithDetails = await Promise.all(
        response.data.map(async (assoc) => {
          let alunoName = "N/A";
          let treinoName = "N/A";

          try {
            const alunoResponse = await api.get(`/clients/${assoc.aluno_id}`);
            alunoName = alunoResponse.data.name;
          } catch (error) {
            console.error(`Erro ao buscar aluno ID: ${assoc.aluno_id}`, error);
          }

          try {
            const treinoResponse = await api.get(`/workouts/${assoc.treino_id}`);
            treinoName = treinoResponse.data.name;
          } catch (error) {
            console.error(`Erro ao buscar treino ID: ${assoc.treino_id}`, error);
          }

          return {
            id: assoc.id,
            aluno_name: alunoName,
            treino_name: treinoName,
          };
        })
      );

      setAssociations(associationsWithDetails);
    } catch (error) {
      console.error("Erro ao buscar as associações:", error);
      toast.error("Erro ao carregar as associações.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAssociationsData();
  }, [fetchAssociations]);

  useEffect(() => {
    fetchAssociationsData();
  }, []);

  const handleDelete = async (id) => {
    try {
      await api.delete(`/workouts-clients/${id}`);
      toast.success("Associação removida com sucesso!");
      fetchAssociationsData(); // Atualiza a tabela após a remoção
    } catch (error) {
      console.error("Erro ao deletar associação:", error);
      toast.error("Erro ao deletar associação.");
    }
  };

  return (
    <div className="trainings-list">
      {loading && <p>Carregando associações...</p>}
      <table>
        <thead>
          <tr>
            <th>Nome do Aluno</th>
            <th>Nome do Treino</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {associations.length > 0 ? (
            associations.map((assoc) => (
              <tr key={assoc.id}>
                <td>{assoc.aluno_name || "N/A"}</td>
                <td>{assoc.treino_name || "N/A"}</td>
                <td>
                  <button className="btn delete" onClick={() => handleDelete(assoc.id)}>
                    ❌
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3">Nenhuma associação encontrada.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
